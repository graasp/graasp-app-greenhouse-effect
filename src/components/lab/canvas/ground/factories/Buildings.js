import React from 'react';
import PropTypes from 'prop-types';
import { Group, Rect } from 'react-konva';
import {
  FACTORY_MAIN_BUILDING_COLOR,
  FACTORY_SIDE_BUILDING_COLOR,
} from '../../../../../config/constants';

const Buildings = ({
  mainBuildingWidth,
  mainBuildingHeight,
  sideBuildingWidth,
  sideBuildingHeight,
  buildingsBeginX,
  buildingsBeginY,
}) => {
  const mainBuildingX = buildingsBeginX + sideBuildingWidth;

  return (
    <Group>
      <Rect
        x={buildingsBeginX}
        y={buildingsBeginY}
        width={sideBuildingWidth}
        height={-sideBuildingHeight}
        fill={FACTORY_SIDE_BUILDING_COLOR}
      />
      <Rect
        x={mainBuildingX}
        y={buildingsBeginY}
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
  buildingsBeginX: PropTypes.number.isRequired,
  buildingsBeginY: PropTypes.number.isRequired,
};

export default Buildings;
