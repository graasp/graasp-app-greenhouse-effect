import React from 'react';
import PropTypes from 'prop-types';
import { Group } from 'react-konva';
import Buildings from './Buildings';
import Windows from './Windows';
import Chimney from './Chimney';

const Factory = ({
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
      <Buildings
        x={x}
        y={y}
        sideBuildingWidth={sideBuildingWidth}
        sideBuildingHeight={sideBuildingHeight}
        mainBuildingWidth={mainBuildingWidth}
        mainBuildingHeight={mainBuildingHeight}
      />
      <Windows
        x={mainBuildingX}
        y={y}
        buildingWidth={mainBuildingWidth}
        buildingHeight={mainBuildingHeight}
      />
      <Chimney
        x={mainBuildingX}
        y={y}
        buildingWidth={mainBuildingWidth}
        buildingHeight={mainBuildingHeight}
      />
    </Group>
  );
};

Factory.propTypes = {
  mainBuildingWidth: PropTypes.number.isRequired,
  mainBuildingHeight: PropTypes.number.isRequired,
  sideBuildingWidth: PropTypes.number.isRequired,
  sideBuildingHeight: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};

export default Factory;
