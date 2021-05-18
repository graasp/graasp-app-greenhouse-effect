import React from 'react';
import PropTypes from 'prop-types';
import { Group, Rect } from 'react-konva';
import {
  HOUSEHOLD_DOOR_BEGINS_X,
  HOUSEHOLD_DOOR_FILL,
  HOUSEHOLD_DOOR_HEIGHT,
  HOUSEHOLD_DOOR_WIDTH,
  HOUSEHOLD_FRONT_COLOR,
  HOUSEHOLD_SIDE_COLOR,
} from '../../../../config/constants';

const FrontAndSide = ({
  householdFrontWidth,
  householdSideWidth,
  householdHeight,
  x,
  y,
}) => {
  const doorWidth = HOUSEHOLD_DOOR_WIDTH * householdSideWidth;
  const doorHeight = HOUSEHOLD_DOOR_HEIGHT * householdHeight;
  const doorIndentX = HOUSEHOLD_DOOR_BEGINS_X * householdSideWidth;

  return (
    <Group>
      <Rect
        x={x}
        y={y}
        width={householdFrontWidth}
        height={householdHeight}
        fill={HOUSEHOLD_FRONT_COLOR}
      />
      <Rect
        x={x + householdFrontWidth}
        y={y}
        width={householdSideWidth}
        height={householdHeight}
        fill={HOUSEHOLD_SIDE_COLOR}
      />
      {/* Door */}
      <Rect
        x={x + householdFrontWidth + doorIndentX}
        y={y + householdHeight}
        width={doorWidth}
        height={-doorHeight}
        fill={HOUSEHOLD_DOOR_FILL}
      />
    </Group>
  );
};

FrontAndSide.propTypes = {
  householdFrontWidth: PropTypes.number.isRequired,
  householdSideWidth: PropTypes.number.isRequired,
  householdHeight: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};

export default FrontAndSide;
