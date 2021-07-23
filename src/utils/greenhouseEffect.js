import {
  SOLAR_FLUX,
  STEFAN_BOLTZMANN_CONSTANT,
  ZERO_KELVIN_IN_CELISUS,
} from '../config/constants';

// compute greenhouse effect based on formula given by teachers
export const computeGreenhouseEffect = ({ carbonDioxide, methane }) => {
  const A = 0.0525;
  const a = 0.147;
  const B = 0.0234;
  const b = 0.225;
  const C = 0.23;
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
  return { albedo, ice, cloud };
};
