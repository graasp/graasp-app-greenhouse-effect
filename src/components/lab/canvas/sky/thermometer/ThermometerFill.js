import React from 'react';
import PropTypes from 'prop-types';
import { Rect } from 'react-konva';
import {
  SCALE_UNITS,
  THERMOMETER_BORDER_WIDTH,
  THERMOMETER_FILL,
} from '../../../../../config/constants';
import { kelvinToCelsius } from '../../../../../utils/greenhouseEffect';
import { determineThermometerFillHeight } from '../../../../../utils/canvas';

const ThermometerFill = ({
  thermometerBodyHeight,
  thermometerBaseWidth,
  temperature: temperatureInKelvin,
  scaleName,
  labels,
}) => {
  const temperature =
    scaleName === SCALE_UNITS.CELSIUS.name
      ? kelvinToCelsius(temperatureInKelvin)
      : temperatureInKelvin;

  const thermometerFillWidth =
    thermometerBaseWidth - THERMOMETER_BORDER_WIDTH * 2;

  const thermometerFillHeight =
    determineThermometerFillHeight(temperature, labels) * thermometerBodyHeight;

  return (
    <Rect
      x={THERMOMETER_BORDER_WIDTH}
      fill={THERMOMETER_FILL}
      width={thermometerFillWidth}
      height={thermometerFillHeight}
      y={-thermometerFillHeight}
    />
  );
};

ThermometerFill.propTypes = {
  thermometerBaseWidth: PropTypes.number.isRequired,
  thermometerBodyHeight: PropTypes.number.isRequired,
  temperature: PropTypes.number.isRequired,
  scaleName: PropTypes.string.isRequired,
  labels: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default ThermometerFill;
