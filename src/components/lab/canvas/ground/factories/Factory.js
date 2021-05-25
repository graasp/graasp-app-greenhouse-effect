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
  factoryBeginsX,
  factoryBeginsY,
}) => {
  const mainBuildingX = factoryBeginsX + sideBuildingWidth;

  return (
    <Group>
      <Buildings
        buildingsBeginX={factoryBeginsX}
        buildingsBeginY={factoryBeginsY}
        sideBuildingWidth={sideBuildingWidth}
        sideBuildingHeight={sideBuildingHeight}
        mainBuildingWidth={mainBuildingWidth}
        mainBuildingHeight={mainBuildingHeight}
      />
      <Windows
        windowsBeginX={mainBuildingX}
        windowsBeginY={factoryBeginsY}
        buildingWidth={mainBuildingWidth}
        buildingHeight={mainBuildingHeight}
      />
      <Chimney
        chimneyBeginsX={mainBuildingX}
        chimneyBeginsY={factoryBeginsY}
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
  factoryBeginsX: PropTypes.number.isRequired,
  factoryBeginsY: PropTypes.number.isRequired,
};

export default Factory;
