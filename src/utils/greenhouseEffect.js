import {
  STEFAN_BOLTZMANN_CONSTANT,
  ZERO_KELVIN_IN_CELISUS,
  SIMULATION_MODES,
  cTerms,
  TWENTIETH_CENTURY_ALBEDO_OFFSET,
  SOLAR_FLUXES,
} from '../config/constants';

// compute greenhouse effect based on formula given by teachers
export const computeGreenhouseEffect = ({
  carbonDioxide,
  methane,
  simulationMode,
}) => {
  // if either Venus or Mars are selected, greenhouse effect value is hard-coded
  if (simulationMode === SIMULATION_MODES.VENUS.name) {
    return 0.99;
  }
  if (simulationMode === SIMULATION_MODES.MARS.name) {
    return 0.12;
  }

  const C = cTerms[simulationMode];

  const A = 0.0525;
  const a = 0.147;
  const B = 0.0234;
  const b = 0.225;
  return A * carbonDioxide ** a + B * methane ** b + C;
};

export const kelvinToCelsius = (k) => k - ZERO_KELVIN_IN_CELISUS;

export const celsiusToKelvin = (c) => c + ZERO_KELVIN_IN_CELISUS;

export const computeCurrentTemperature = ({
  greenhouseEffect,
  albedo,
  simulationMode,
}) => {
  const SOLAR_FLUX = SOLAR_FLUXES[simulationMode];

  return (
    ((SOLAR_FLUX.value * (1 - Math.min(albedo, 99.9))) /
      (STEFAN_BOLTZMANN_CONSTANT * (1 - greenhouseEffect))) **
    0.25
  );
};

export const computeAlbedo = ({ iceCover, cloudCover, simulationMode }) => {
  // if either Venus or Mars are selected, albedo value is hard-coded
  if (simulationMode === SIMULATION_MODES.VENUS.name) {
    return { albedo: 0.76 };
  }
  if (simulationMode === SIMULATION_MODES.MARS.name) {
    return { albedo: 0.25 };
  }

  const ice = (iceCover / 100.0) * 0.7 + (1 - iceCover / 100.0) * 0.09;
  const cloud = (0.48 * cloudCover) / 100.0;
  let albedo = cloud + ((1 - cloud) ** 2 * ice) / (1 - ice * cloud);
  if (simulationMode === SIMULATION_MODES.TWENTIETH_CENTURY.name) {
    albedo += TWENTIETH_CENTURY_ALBEDO_OFFSET;
  }

  return { albedo, cloud };
};
