import React from 'react';
import PropTypes from 'prop-types';
import { Group, Rect } from 'react-konva';
import {
  HOUSE_DOOR_BEGINS_X,
  HOUSE_DOOR_FILL,
  HOUSE_DOOR_HEIGHT,
  HOUSE_DOOR_WIDTH,
  HOUSE_FRONT_COLOR,
  HOUSE_SIDE_COLOR,
} from '../../../../../constants';

const FrontAndSide = ({
  houseFrontWidth,
  houseSideWidth,
  houseHeight,
  x,
  y,
}) => {
  const doorWidth = HOUSE_DOOR_WIDTH * houseSideWidth;
  const doorHeight = HOUSE_DOOR_HEIGHT * houseHeight;
  const doorIndentX = HOUSE_DOOR_BEGINS_X * houseSideWidth;

  return (
    <Group>
      <Rect
        x={x}
        y={y}
        width={houseFrontWidth}
        height={houseHeight}
        fill={HOUSE_FRONT_COLOR}
      />
      <Rect
        x={x + houseFrontWidth}
        y={y}
        width={houseSideWidth}
        height={houseHeight}
        fill={HOUSE_SIDE_COLOR}
      />
      {/* Door */}
      <Rect
        x={x + houseFrontWidth + doorIndentX}
        y={y + houseHeight}
        width={doorWidth}
        height={-doorHeight}
        fill={HOUSE_DOOR_FILL}
      />
    </Group>
  );
};

FrontAndSide.propTypes = {
  houseFrontWidth: PropTypes.number.isRequired,
  houseSideWidth: PropTypes.number.isRequired,
  houseHeight: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};

export default FrontAndSide;
