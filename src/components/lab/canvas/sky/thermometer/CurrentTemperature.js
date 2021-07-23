import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Text } from 'react-konva';
import { kelvinToCelsius } from '../../../../../utils/greenhouseEffect';
import {
  SCALE_UNITS,
  SCALE_HEIGHT,
  THERMOMETER_CURRENT_TEMPERATURE_FONT_SIZE,
  THERMOMETER_CURRENT_TEMPERATURE_WIDTH,
  THERMOMETER_CURRENT_TEMPERATURE_MARGIN_BOTTOM,
} from '../../../../../config/constants';

const CurrentTemperature = ({
  thermometerBeginsX,
  thermometerBeginsY,
  thermometerBaseWidth,
  thermometerBodyHeight,
  temperature,
}) => {
  const scaleUnit = useSelector(({ lab }) => lab.scaleUnit);

  let text;
  switch (scaleUnit) {
    case SCALE_UNITS.CELSIUS:
      text = Math.round(kelvinToCelsius(temperature)) + scaleUnit.unit;
      break;
    case SCALE_UNITS.KELVIN:
    default:
      text = Math.round(temperature) + scaleUnit.unit;
      break;
  }

  return (
    <Text
      x={
        thermometerBeginsX -
        thermometerBaseWidth / 2 -
        THERMOMETER_CURRENT_TEMPERATURE_WIDTH / 2
      }
      y={
        thermometerBeginsY -
        thermometerBodyHeight -
        SCALE_HEIGHT -
        THERMOMETER_CURRENT_TEMPERATURE_MARGIN_BOTTOM
      }
      text={text}
      fontSize={THERMOMETER_CURRENT_TEMPERATURE_FONT_SIZE}
    />
  );
};

CurrentTemperature.propTypes = {
  thermometerBeginsX: PropTypes.number.isRequired,
  thermometerBeginsY: PropTypes.number.isRequired,
  thermometerBaseWidth: PropTypes.number.isRequired,
  temperature: PropTypes.number.isRequired,
  thermometerBodyHeight: PropTypes.number.isRequired,
};

export default CurrentTemperature;
