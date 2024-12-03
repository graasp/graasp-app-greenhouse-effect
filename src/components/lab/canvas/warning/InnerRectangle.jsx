import React from 'react';
import PropTypes from 'prop-types';
import { Rect } from 'react-konva';
import {
  WARNING_BORDER_RADIUS,
  WARNING_FILL,
} from '../../../../constants/canvas/warning';

const InnerRectangle = ({ x, y, width, height }) => {
  return (
    <Rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill={WARNING_FILL}
      cornerRadius={WARNING_BORDER_RADIUS}
    />
  );
};

InnerRectangle.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default InnerRectangle;
