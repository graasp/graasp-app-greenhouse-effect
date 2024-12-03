import React, { useContext } from 'react';
import { Rect } from 'react-konva';
import {
  PERMAFROST_FILL,
  PERMAFROST_HEIGHT,
  PERMAFROST_WIDTH,
} from '../../../../../constants';
import { GroundDimensionsContext } from '../../../../contexts/canvas-dimensions/GroundDimensionsProvider';

const Permafrost = () => {
  const {
    groundHeight,
    groundWidth,
    groundBeginsX,
    groundBeginsY,
  } = useContext(GroundDimensionsContext);

  // permafrost dimensions
  const permafrostWidth = PERMAFROST_WIDTH * groundWidth;
  const permafrostHeight = PERMAFROST_HEIGHT * groundHeight;

  // permafrost positioning
  const permafrostBeginsX = groundBeginsX;
  const permafrostBeginsY = groundBeginsY;

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

export default Permafrost;
