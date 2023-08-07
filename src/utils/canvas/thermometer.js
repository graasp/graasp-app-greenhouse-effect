import {
  THERMOMETER_SCALE_STEP,
  MINIMUM_THERMOMETER_TEMPERATURE_CELSIUS,
  SCALE_UNITS,
  MAX_TEMPERATURE_DISPLAYED_ON_EARTH_CELSIUS,
  SIMULATION_MODES,
} from '../../constants';
import { celsiusToKelvin, kelvinToCelsius } from '../physics';

export const generateThermometerRectanglePoints = (
  baseWidth,
  thermometerHeight,
) => {
  const pointOne = [0, 0];
  const pointTwo = [0, -thermometerHeight];
  const pointThree = [baseWidth, -thermometerHeight];
  const pointFour = [baseWidth, 0];
  return [...pointOne, ...pointTwo, ...pointThree, ...pointFour];
};

export const determineBulbCoordinates = (
  thermometerBaseWidth,
  thermometerBulbRadius,
) => {
  const halfBaseWidth = thermometerBaseWidth / 2;
  const yIndent = Math.sqrt(
    thermometerBulbRadius ** 2 - (thermometerBaseWidth / 2) ** 2,
  );
  return {
    x: halfBaseWidth,
    y: yIndent,
  };
};

export const generateThermometerLabels = (numGrades, scaleName) => {
  let minimumTemperature = MINIMUM_THERMOMETER_TEMPERATURE_CELSIUS;
  if (scaleName === SCALE_UNITS.KELVIN.name) {
    minimumTemperature = celsiusToKelvin(minimumTemperature);
  }

  return new Array(numGrades)
    .fill()
    .map(
      (emptyElement, index) =>
        minimumTemperature + index * THERMOMETER_SCALE_STEP,
    );
};

export const determineThermometerFillHeight = (temperature, scaleValues) => {
  const scaleMinimum = Math.min(...scaleValues);
  const scaleMaximum = Math.max(...scaleValues);
  const scaleRange = scaleMaximum - scaleMinimum;
  if (temperature < scaleMinimum) {
    return 0;
  }
  if (temperature > scaleMaximum) {
    return 1;
  }
  return (temperature - scaleMinimum) / scaleRange;
};

export const createTemperatureLabel = (
  temperatureInKelvin,
  scaleName,
  scaleLabel,
  simulationMode,
) => {
  const maxTemperature =
    scaleName === SCALE_UNITS.CELSIUS.name
      ? MAX_TEMPERATURE_DISPLAYED_ON_EARTH_CELSIUS
      : Math.round(celsiusToKelvin(MAX_TEMPERATURE_DISPLAYED_ON_EARTH_CELSIUS));

  const temperature =
    scaleName === SCALE_UNITS.CELSIUS.name
      ? kelvinToCelsius(temperatureInKelvin)
      : temperatureInKelvin;

  if (simulationMode === SIMULATION_MODES.VENUS.name) {
    return `${Math.round(temperature)}${scaleLabel}`;
  }

  return temperature > maxTemperature
    ? `${maxTemperature}${scaleLabel}+`
    : `${temperature.toFixed(2)}${scaleLabel}`;
};
