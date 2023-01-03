import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-konva';
import {
  THERMOMETER_BORDER_COLOR,
  THERMOMETER_BORDER_WIDTH,
} from '../../../../../constants';

const ThermometerBody = ({ thermometerRectanglePoints }) => {
  return (
    <Line
      points={thermometerRectanglePoints}
      stroke={THERMOMETER_BORDER_COLOR}
      strokeWidth={THERMOMETER_BORDER_WIDTH}
    />
  );
};

ThermometerBody.propTypes = {
  thermometerRectanglePoints: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default ThermometerBody;
