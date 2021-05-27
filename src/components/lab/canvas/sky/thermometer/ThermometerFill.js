import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-konva';
import { THERMOMETER_FILL } from '../../../../../config/constants';

const ThermometerFill = ({
  thermometerBeginsX,
  thermometerBeginsY,
  thermometerRectanglePoints,
  thermometerPercentageFull,
}) => {
  return (
    <Line
      x={thermometerBeginsX}
      y={thermometerBeginsY}
      points={thermometerRectanglePoints}
      closed
      fill={THERMOMETER_FILL}
      scaleY={thermometerPercentageFull}
    />
  );
};

ThermometerFill.propTypes = {
  thermometerBeginsX: PropTypes.number.isRequired,
  thermometerBeginsY: PropTypes.number.isRequired,
  thermometerRectanglePoints: PropTypes.arrayOf(PropTypes.number).isRequired,
  thermometerPercentageFull: PropTypes.number.isRequired,
};

export default ThermometerFill;
