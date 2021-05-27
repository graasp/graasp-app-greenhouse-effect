import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-konva';
import {
  THERMOMETER_BORDER_COLOR,
  THERMOMETER_BORDER_WIDTH,
} from '../../../../../config/constants';

const ThermometerBody = ({
  thermometerBeginsX,
  thermometerBeginsY,
  thermometerRectanglePoints,
}) => {
  return (
    <Line
      x={thermometerBeginsX}
      y={thermometerBeginsY}
      points={thermometerRectanglePoints}
      stroke={THERMOMETER_BORDER_COLOR}
      strokeWidth={THERMOMETER_BORDER_WIDTH}
    />
  );
};

ThermometerBody.propTypes = {
  thermometerBeginsX: PropTypes.number.isRequired,
  thermometerBeginsY: PropTypes.number.isRequired,
  thermometerRectanglePoints: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default ThermometerBody;
