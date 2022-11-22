import {
  STEFAN_BOLTZMANN_CONSTANT,
  ZERO_KELVIN_IN_CELISUS,
  SIMULATION_MODES,
  TWENTIETH_CENTURY_ALBEDO_OFFSET,
  SOLAR_FLUXES,
  WATER_VAPOR_FEEDBACK_DEFAULT_EPSILON,
  MAX_TEMPERATURE_DISPLAYED_ON_EARTH_CELSIUS,
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

  // formula given by teachers
  return 0.0525 * carbonDioxide ** 0.147 + 0.0234 * methane ** 0.225 + cTerm;
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

export const computeCTerm = (temperature) => {
  return temperature * 0.00454 + 0.163;
};

export const computeWaterVaporFeedbackCTerms = (
  iceCover,
  cloudCover,
  carbonDioxide,
  methane,
  cTerm,
  simulationMode,
  epsilon = WATER_VAPOR_FEEDBACK_DEFAULT_EPSILON,
) => {
  // calculate albedo, greenhouse effect, and temperature based on new icecover/cloudcover/methane/co2
  const { totalAlbedo: albedo } = computeAlbedo(
    iceCover,
    cloudCover,
    simulationMode,
  );
  const greenhouseEffect = computeGreenhouseEffect(
    carbonDioxide,
    methane,
    cTerm,
    simulationMode,
  );
  const initialTemperature = kelvinToCelsius(
    computeTemperature(greenhouseEffect, albedo, simulationMode),
  );

  // under water vapor feedback, cTerms become a function of temperature
  // thus, new temperature --> new c term --> new greenhouse effect --> new temperature
  // we run this loop until delta between new and previous temperatures is small
  const cTerms = [];
  let previousTemperature;
  let newTemperature;
  do {
    previousTemperature = newTemperature || initialTemperature;
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
    cTerms.push(newCTerm);
    if (newTemperature > MAX_TEMPERATURE_DISPLAYED_ON_EARTH_CELSIUS) {
      break;
    }
  } while (Math.abs(newTemperature - previousTemperature) > epsilon);

  return cTerms;
};
