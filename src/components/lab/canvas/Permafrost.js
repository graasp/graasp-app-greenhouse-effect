import React from 'react';
import PropTypes from 'prop-types';
import { Rect } from 'react-konva';
import {
  PERMAFROST_FILL,
  PERMAFROST_HEIGHT,
  PERMAFROST_WIDTH,
} from '../../../config/constants';

const Permafrost = ({
  groundHeight,
  groundWidth,
  groundBeginsX,
  groundBeginsY,
}) => {
  const permafrostWidth = PERMAFROST_WIDTH * groundWidth;
  const permafrostHeight = PERMAFROST_HEIGHT * groundHeight;
  const permafrostBeginsX = groundBeginsX;
  const permafrostBeginsY = groundBeginsY + groundHeight;

  return (
    <Rect
      x={permafrostBeginsX}
      y={permafrostBeginsY}
      width={permafrostWidth}
      height={-permafrostHeight}
      fill={PERMAFROST_FILL}
    />
  );
};

Permafrost.propTypes = {
  groundHeight: PropTypes.number.isRequired,
  groundWidth: PropTypes.number.isRequired,
  groundBeginsX: PropTypes.number.isRequired,
  groundBeginsY: PropTypes.number.isRequired,
};

export default Permafrost;
