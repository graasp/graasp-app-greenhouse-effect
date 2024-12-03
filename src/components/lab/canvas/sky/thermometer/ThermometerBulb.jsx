import React from 'react';
import PropTypes from 'prop-types';
import { Circle } from 'react-konva';
import {
  THERMOMETER_BORDER_COLOR,
  THERMOMETER_BORDER_WIDTH,
  THERMOMETER_FILL,
} from '../../../../../constants';

const ThermometerBulb = ({
  thermometerBulbBeginsX,
  thermometerBulbBeginsY,
  thermometerBulbRadius,
}) => {
  return (
    <Circle
      x={thermometerBulbBeginsX}
      y={thermometerBulbBeginsY}
      stroke={THERMOMETER_BORDER_COLOR}
      radius={thermometerBulbRadius}
      strokeWidth={THERMOMETER_BORDER_WIDTH}
      fill={THERMOMETER_FILL}
    />
  );
};

ThermometerBulb.propTypes = {
  thermometerBulbBeginsX: PropTypes.number.isRequired,
  thermometerBulbBeginsY: PropTypes.number.isRequired,
  thermometerBulbRadius: PropTypes.number.isRequired,
};

export default ThermometerBulb;
