import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-konva';
import {
  THERMOMETER_LABEL_PADDING_BOTTOM,
  THERMOMETER_CURRENT_TEMPERATURE_FONT_SIZE,
  THERMOMETER_LABEL_WIDTH,
  THERMOMETER_LABEL_HEIGHT,
} from '../../../../../config/constants';
import { createTemperatureLabel } from '../../../../../utils/canvas';

const CurrentTemperature = ({
  thermometerBaseWidth,
  thermometerBodyHeight,
  temperature,
  scaleName,
  scaleLabel,
}) => {
  const text = createTemperatureLabel(temperature, scaleName, scaleLabel);

  const labelBeginsX = thermometerBaseWidth / 2 - THERMOMETER_LABEL_WIDTH / 2;

  const labelBeginsY =
    -thermometerBodyHeight -
    THERMOMETER_LABEL_HEIGHT -
    THERMOMETER_LABEL_PADDING_BOTTOM;

  return (
    <Text
      x={labelBeginsX}
      y={labelBeginsY}
      width={THERMOMETER_LABEL_WIDTH}
      align="center"
      height={THERMOMETER_LABEL_HEIGHT}
      verticalAlign="bottom"
      text={text}
      fontSize={THERMOMETER_CURRENT_TEMPERATURE_FONT_SIZE}
    />
  );
};

CurrentTemperature.propTypes = {
  thermometerBaseWidth: PropTypes.number.isRequired,
  temperature: PropTypes.number.isRequired,
  thermometerBodyHeight: PropTypes.number.isRequired,
  scaleName: PropTypes.string.isRequired,
  scaleLabel: PropTypes.string.isRequired,
};

export default CurrentTemperature;
