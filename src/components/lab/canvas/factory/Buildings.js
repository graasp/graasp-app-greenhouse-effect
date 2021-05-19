import React from 'react';
import PropTypes from 'prop-types';
import { Group, Rect } from 'react-konva';
import {
  FACTORY_MAIN_BUILDING_COLOR,
  FACTORY_SIDE_BUILDING_COLOR,
} from '../../../../config/constants';

const Buildings = ({
  mainBuildingWidth,
  mainBuildingHeight,
  sideBuildingWidth,
  sideBuildingHeight,
  x,
  y,
}) => {
  const mainBuildingX = x + sideBuildingWidth;

  return (
    <Group>
      <Rect
        x={x}
        y={y}
        width={sideBuildingWidth}
        height={-sideBuildingHeight}
        fill={FACTORY_SIDE_BUILDING_COLOR}
      />
      <Rect
        x={mainBuildingX}
        y={y}
        width={mainBuildingWidth}
        height={-mainBuildingHeight}
        fill={FACTORY_MAIN_BUILDING_COLOR}
      />
    </Group>
  );
};

Buildings.propTypes = {
  mainBuildingWidth: PropTypes.number.isRequired,
  mainBuildingHeight: PropTypes.number.isRequired,
  sideBuildingWidth: PropTypes.number.isRequired,
  sideBuildingHeight: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};

export default Buildings;
