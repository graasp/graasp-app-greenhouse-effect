import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-konva';
import {
  ICE_CAP_BORDER_COLOR,
  ICE_CAP_BORDER_WIDTH,
  ICE_CAP_FILL,
  ICE_CAP_LINES_TENSION,
} from '../../../../../constants';

const IceCap = ({ x, y, iceCapPoints }) => {
  return (
    <Line
      x={x}
      y={y}
      closed
      points={iceCapPoints}
      fill={ICE_CAP_FILL}
      stroke={ICE_CAP_BORDER_COLOR}
      strokeWidth={ICE_CAP_BORDER_WIDTH}
      tension={ICE_CAP_LINES_TENSION}
    />
  );
};

IceCap.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  iceCapPoints: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default IceCap;
