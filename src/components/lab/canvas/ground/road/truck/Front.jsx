import React from 'react';
import PropTypes from 'prop-types';
import { Group, Rect } from 'react-konva';
import {
  TRUCK_BODY_FILL,
  TRUCK_FRONT_CURVES,
  WINDOW_BEGINS_X,
  WINDOW_BEGINS_Y,
  WINDOW_FILL,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from '../../../../../../constants';

const Front = ({
  truckFrontBeginsX,
  truckFrontBeginsY,
  truckFrontWidth,
  truckFrontHeight,
}) => {
  const windowBeginsX = truckFrontBeginsX + WINDOW_BEGINS_X * truckFrontWidth;
  const windowBeginsY = truckFrontBeginsY + WINDOW_BEGINS_Y * truckFrontHeight;
  const windowWidth = WINDOW_WIDTH * truckFrontWidth;
  const windowHeight = WINDOW_HEIGHT * truckFrontWidth;

  return (
    <Group>
      <Rect
        x={truckFrontBeginsX}
        y={truckFrontBeginsY}
        width={truckFrontWidth}
        height={truckFrontHeight}
        fill={TRUCK_BODY_FILL}
        cornerRadius={TRUCK_FRONT_CURVES}
      />
      {/* Window */}
      <Rect
        x={windowBeginsX}
        y={windowBeginsY}
        width={windowWidth}
        height={windowHeight}
        fill={WINDOW_FILL}
      />
    </Group>
  );
};

Front.propTypes = {
  truckFrontBeginsX: PropTypes.number.isRequired,
  truckFrontBeginsY: PropTypes.number.isRequired,
  truckFrontWidth: PropTypes.number.isRequired,
  truckFrontHeight: PropTypes.number.isRequired,
};

export default Front;
