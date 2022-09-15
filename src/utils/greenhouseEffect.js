import {
  SOLAR_FLUX,
  STEFAN_BOLTZMANN_CONSTANT,
  ZERO_KELVIN_IN_CELISUS,
  SIMULATION_MODES,
} from '../config/constants';

// in the 'computeGreenhouseEffect' function below, there is a residual C term that changes depending on time period
// numbers below provided by teachers
const { ICE_AGE, TWENTIETH_CENTURY, TODAY } = SIMULATION_MODES;
const cTerm = {};
cTerm[ICE_AGE.name] = 0.204;
cTerm[TWENTIETH_CENTURY.name] = 0.227;
cTerm[TODAY.name] = 0.231;

// compute greenhouse effect based on formula given by teachers
export const computeGreenhouseEffect = ({
  carbonDioxide,
  methane,
  simulationMode,
}) => {
  const C = cTerm[simulationMode];

  const A = 0.0525;
  const a = 0.147;
  const B = 0.0234;
  const b = 0.225;
  return A * carbonDioxide ** a + B * methane ** b + C;
};

export const kelvinToCelsius = (k) => k - ZERO_KELVIN_IN_CELISUS;

export const celsiusToKelvin = (c) => c + ZERO_KELVIN_IN_CELISUS;

export const computeCurrentTemperature = ({ greenhouseEffect, albedo }) =>
  ((SOLAR_FLUX.value * (1 - Math.min(albedo, 99.9))) /
    (STEFAN_BOLTZMANN_CONSTANT * (1 - greenhouseEffect))) **
  0.25;

export const computeAlbedo = ({ iceCover, cloudCover }) => {
  const ice = (iceCover / 100.0) * 0.7 + (1 - iceCover / 100.0) * 0.09;
  const cloud = (0.48 * cloudCover) / 100.0;
  const albedo = cloud + ((1 - cloud) ** 2 * ice) / (1 - ice * cloud);
  return { albedo, cloud };
};
