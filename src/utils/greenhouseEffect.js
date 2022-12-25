import {
  STEFAN_BOLTZMANN_CONSTANT,
  ZERO_KELVIN_IN_CELISUS,
  SIMULATION_MODES,
  TWENTIETH_CENTURY_ALBEDO_OFFSET,
  SOLAR_FLUXES,
  FEEDBACK_EFFECTS_DEFAULT_EPSILON,
  MAX_TEMPERATURE_DISPLAYED_ON_EARTH_CELSIUS,
  MAX_ICE_COVER_POSSIBLE,
  MIN_ICE_COVER_POSSIBLE,
  MIN_GREENHOUSE_EFFECT_POSSIBLE,
  MAX_GREENHOUSE_EFFECT_POSSIBLE,
} from '../config/constants';

export const computeGreenhouseEffect = (
  carbonDioxide,
  methane,
  cTerm,
  simulationMode,
) => {
  // if either Venus or Mars are selected, greenhouse effect value is hard-coded
  switch (simulationMode) {
    case SIMULATION_MODES.VENUS.name:
      return 0.99106;
    case SIMULATION_MODES.MARS.name:
      return 0;
    default:
      break;
  }

  const greenhouseEffect =
    0.0525 * carbonDioxide ** 0.147 + 0.0234 * methane ** 0.225 + cTerm;
  if (greenhouseEffect <= MIN_GREENHOUSE_EFFECT_POSSIBLE) {
    return MIN_GREENHOUSE_EFFECT_POSSIBLE;
  }
  if (greenhouseEffect >= MAX_GREENHOUSE_EFFECT_POSSIBLE) {
    return MAX_GREENHOUSE_EFFECT_POSSIBLE;
  }

  return greenhouseEffect;
};

export const kelvinToCelsius = (k) => k - ZERO_KELVIN_IN_CELISUS;
export const celsiusToKelvin = (c) => c + ZERO_KELVIN_IN_CELISUS;

export const computeTemperature = (
  greenhouseEffect,
  albedo,
  simulationMode,
) => {
  const SOLAR_FLUX = SOLAR_FLUXES[simulationMode];

  return (
    ((SOLAR_FLUX * (1 - albedo)) /
      (STEFAN_BOLTZMANN_CONSTANT * (1 - greenhouseEffect))) **
    0.25
  );
};

export const computeAlbedo = (iceCover, cloudCover, simulationMode) => {
  // if either Venus or Mars are selected, albedo value is hard-coded
  switch (simulationMode) {
    case SIMULATION_MODES.VENUS.name:
      return { totalAlbedo: 0.77, cloudAlbedo: 1 };
    case SIMULATION_MODES.MARS.name:
      return { totalAlbedo: 0.25, cloudAlbedo: 0 };
    default:
      break;
  }

  const iceAlbedo = (iceCover / 100) * 0.7 + (1 - iceCover / 100) * 0.09;

  const cloudAlbedo = (0.48 * cloudCover) / 100;

  let totalAlbedo =
    cloudAlbedo +
    ((1 - cloudAlbedo) ** 2 * iceAlbedo) / (1 - iceAlbedo * cloudAlbedo);

  if (simulationMode === SIMULATION_MODES.TWENTIETH_CENTURY.name) {
    totalAlbedo += TWENTIETH_CENTURY_ALBEDO_OFFSET;
  }

  return { totalAlbedo, cloudAlbedo };
};

export const computeWaterVapor = (temperatureInCelsius) => {
  return (
    2.78 *
    10 ** 3 *
    Math.exp((17.27 * temperatureInCelsius) / (temperatureInCelsius + 237.3))
  );
};

export const computeIceCover = (temperatureInCelsius) => {
  const iceCover = -1.67 * temperatureInCelsius + 35;
  if (iceCover <= MIN_ICE_COVER_POSSIBLE) {
    return MIN_ICE_COVER_POSSIBLE;
  }
  if (iceCover >= MAX_ICE_COVER_POSSIBLE) {
    return MAX_ICE_COVER_POSSIBLE;
  }
  return iceCover;
};

export const computeCTerm = (temperature) => {
  return temperature * 0.00454 + 0.163;
};

export const computeWaterVaporFeedbackCTerms = (
  carbonDioxide,
  methane,
  albedo,
  temperature,
  simulationMode,
  epsilon = FEEDBACK_EFFECTS_DEFAULT_EPSILON,
) => {
  const cTerms = [];
  let previousTemperature;
  let newTemperature;
  do {
    previousTemperature = newTemperature || kelvinToCelsius(temperature);
    const newCTerm = computeCTerm(previousTemperature);
    const newGreenhouseEffect = computeGreenhouseEffect(
      carbonDioxide,
      methane,
      newCTerm,
      simulationMode,
    );
    newTemperature = kelvinToCelsius(
      computeTemperature(newGreenhouseEffect, albedo, simulationMode),
    );
    if (
      newGreenhouseEffect >= MAX_GREENHOUSE_EFFECT_POSSIBLE ||
      newGreenhouseEffect <= MIN_GREENHOUSE_EFFECT_POSSIBLE
    ) {
      cTerms.push(newCTerm);
      break;
    }
    cTerms.push(newCTerm);
    if (newTemperature > MAX_TEMPERATURE_DISPLAYED_ON_EARTH_CELSIUS) {
      break;
    }
  } while (Math.abs(newTemperature - previousTemperature) > epsilon);

  return cTerms;
};

export const computeIceCoverFeedbackTerms = (
  temperature,
  greenhouseEffect,
  cloudCover,
  simulationMode,
  epsilon = FEEDBACK_EFFECTS_DEFAULT_EPSILON,
) => {
  const iceCoverTerms = [];
  let previousTemperature;
  let newTemperature;
  do {
    previousTemperature = newTemperature || kelvinToCelsius(temperature);
    const newIceCover = computeIceCover(previousTemperature);
    const { totalAlbedo: newAlbedo } = computeAlbedo(
      newIceCover,
      cloudCover,
      simulationMode,
    );
    newTemperature = kelvinToCelsius(
      computeTemperature(greenhouseEffect, newAlbedo, simulationMode),
    );
    if (newIceCover >= MAX_ICE_COVER_POSSIBLE) {
      iceCoverTerms.push(MAX_ICE_COVER_POSSIBLE);
      break;
    }
    if (newIceCover <= MIN_ICE_COVER_POSSIBLE) {
      iceCoverTerms.push(MIN_ICE_COVER_POSSIBLE);
      break;
    }
    iceCoverTerms.push(newIceCover);
    if (newTemperature > MAX_TEMPERATURE_DISPLAYED_ON_EARTH_CELSIUS) {
      break;
    }
  } while (Math.abs(newTemperature - previousTemperature) > epsilon);

  return iceCoverTerms;
};

export const roundToNearestHundred = (num) => {
  return Math.round(num / 100) * 100;
};
