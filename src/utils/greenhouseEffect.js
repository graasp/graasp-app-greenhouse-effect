import { SOLAR_FLUX, STEFAN_BOLTZMANN_CONSTANT } from '../config/constants';

export const computeGreenhouseEffect = ({ carbonDioxide, methane }) => {
  const A = 0.0525;
  const a = 0.147;
  const B = 0.0234;
  const b = 0.225;
  const C = 0.23;
  return A * carbonDioxide ** a + B * methane ** b + C;
};

export const kelvinToCelsius = (k) => k - 273.15;

export const celsiusToKelvin = (c) => c + 273.15;

export const computeCurrentTemperature = ({ greenhouseEffect, albedo }) =>
  ((SOLAR_FLUX * (1 - Math.min(albedo, 99.9) / 100.0)) /
    (STEFAN_BOLTZMANN_CONSTANT * (1 - greenhouseEffect))) **
  0.25;
