import {
  STEFAN_BOLTZMANN_CONSTANT,
  ZERO_KELVIN_IN_CELISUS,
  MAX_ICE_COVER,
  MIN_ICE_COVER,
  MIN_GHE,
  MAX_GHE,
  SOLAR_FLUXES,
  CRYOSPHERE_ALBEDO,
  SOIL_ALBEDO_TODAY,
  SOIL_ALBEDO_PREVIOUS_ERAS,
  CLOUD_ALBEDO,
} from '../constants/physics';
import { VENUS, MARS, TODAY } from '../constants/strings';

export const computeGreenhouseEffect = (
  carbonDioxide,
  methane,
  cTerm,
  simulationMode,
) => {
  // if either Venus or Mars are selected, greenhouse effect value is hard-coded
  switch (simulationMode) {
    case VENUS:
      return 0.99106;
    case MARS:
      return 0;
    default:
      break;
  }

  const greenhouseEffect =
    0.0499 * carbonDioxide ** 0.157 + 0.0242 * methane ** 0.191 + cTerm;
  if (greenhouseEffect <= MIN_GHE) {
    return MIN_GHE;
  }
  if (greenhouseEffect >= MAX_GHE) {
    return MAX_GHE;
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
    case VENUS:
      return { totalAlbedo: 0.769, cloudAlbedo: 1 };
    case MARS:
      return { totalAlbedo: 0.25, cloudAlbedo: 0 };
    default:
      break;
  }

  const soilAlbedo =
    simulationMode === TODAY ? SOIL_ALBEDO_TODAY : SOIL_ALBEDO_PREVIOUS_ERAS;
  const iceAlbedo =
    (iceCover / 100) * CRYOSPHERE_ALBEDO + (1 - iceCover / 100) * soilAlbedo;
  const cloudAlbedo = (CLOUD_ALBEDO * cloudCover) / 100;
  const totalAlbedo =
    cloudAlbedo +
    ((1 - cloudAlbedo) ** 2 * iceAlbedo) / (1 - iceAlbedo * cloudAlbedo);

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
  const iceCover = -1.59 * temperatureInCelsius + 34.3;
  if (iceCover <= MIN_ICE_COVER) {
    return MIN_ICE_COVER;
  }
  if (iceCover >= MAX_ICE_COVER) {
    return MAX_ICE_COVER;
  }
  return iceCover;
};

export const computeCTerm = (temperature) => {
  return temperature * 0.00454 + 0.164;
};

export const roundToNearestHundred = (num) => {
  return Math.round(num / 100) * 100;
};

export const computeAllOutputs = (values, simulationMode) => {
  const { iceCover, cloudCover, carbonDioxide, methane, cTerm } = values;
  const albedo = computeAlbedo(iceCover, cloudCover, simulationMode);
  const greenhouseEffect = computeGreenhouseEffect(
    carbonDioxide,
    methane,
    cTerm,
    simulationMode,
  );
  const temperature = computeTemperature(
    greenhouseEffect,
    albedo.totalAlbedo,
    simulationMode,
  );
  const waterVapor = computeWaterVapor(kelvinToCelsius(temperature));
  return { albedo, greenhouseEffect, temperature, waterVapor };
};
