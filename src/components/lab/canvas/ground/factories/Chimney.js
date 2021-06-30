import React from 'react';
import PropTypes from 'prop-types';
import { Group, Rect } from 'react-konva';
import {
  FACTORY_CHIMNEY_HEIGHT,
  FACTORY_CHIMNEY_WIDTH,
  FACTORY_CHIMNEY_FILL,
  FACTORY_CHIMNEY_BEGINS_X,
} from '../../../../../config/constants';

const Chimney = ({
  buildingWidth,
  buildingHeight,
  chimneyBeginsX,
  chimneyBeginsY,
}) => {
  const chimneyX = chimneyBeginsX + FACTORY_CHIMNEY_BEGINS_X * buildingWidth;
  const chimneyY = chimneyBeginsY - buildingHeight;
  const chimneyWidth = FACTORY_CHIMNEY_WIDTH * buildingWidth;
  const chimneyHeight = FACTORY_CHIMNEY_HEIGHT * buildingHeight;

  return (
    <Group>
      <Rect
        width={chimneyWidth}
        height={-chimneyHeight}
        fill={FACTORY_CHIMNEY_FILL}
        x={chimneyX}
        y={chimneyY}
      />
    </Group>
  );
};

Chimney.propTypes = {
  chimneyBeginsX: PropTypes.number.isRequired,
  chimneyBeginsY: PropTypes.number.isRequired,
  buildingWidth: PropTypes.number.isRequired,
  buildingHeight: PropTypes.number.isRequired,
};

export default Chimney;
