import React, { useContext } from 'react';
import Factory from './Factory';
import {
  FACTORY_MAIN_BUILDING_WIDTH,
  FACTORY_MAIN_BUILDING_HEIGHT,
  FACTORY_SIDE_BUILDING_WIDTH,
  FACTORY_SIDE_BUILDING_HEIGHT,
  FACTORY_ROW_BEGINS_Y,
  FACTORY_ROW_BEGINS_X,
  X_DISTANCE_BETWEEN_FACTORIES,
  DEFAULT_NUMBER_OF_FACTORIES_IN_ROW,
} from '../../../../../config/constants';
import { GroundDimensionsContext } from '../../../../contexts/canvas-dimensions/GroundDimensionsProvider';

const FactoryRow = () => {
  const {
    groundHeight,
    groundWidth,
    groundBeginsX,
    groundBeginsY,
  } = useContext(GroundDimensionsContext);

  // factory dimensions
  const mainBuildingWidth = FACTORY_MAIN_BUILDING_WIDTH * groundWidth;
  const mainBuildingHeight = FACTORY_MAIN_BUILDING_HEIGHT * groundHeight;
  const sideBuildingWidth = FACTORY_SIDE_BUILDING_WIDTH * groundWidth;
  const sideBuildingHeight = FACTORY_SIDE_BUILDING_HEIGHT * groundHeight;
  const totalBuildingsWidth = sideBuildingWidth + mainBuildingWidth;

  //   factory positioning
  const factoryRowBeginsY = groundBeginsY + FACTORY_ROW_BEGINS_Y * groundHeight;
  const factoryRowBeginsX = groundBeginsX + FACTORY_ROW_BEGINS_X * groundWidth;
  const xDistanceBetweenFactories = X_DISTANCE_BETWEEN_FACTORIES * groundWidth;

  const factories = new Array(DEFAULT_NUMBER_OF_FACTORIES_IN_ROW)
    .fill()
    .map((emptyElement, index) => (
      <Factory
        mainBuildingWidth={mainBuildingWidth}
        mainBuildingHeight={mainBuildingHeight}
        sideBuildingWidth={sideBuildingWidth}
        sideBuildingHeight={sideBuildingHeight}
        factoryBeginsX={
          factoryRowBeginsX +
          index * (xDistanceBetweenFactories + totalBuildingsWidth)
        }
        factoryBeginsY={factoryRowBeginsY}
        // eslint-disable-next-line react/no-array-index-key
        key={index}
      />
    ));

  return factories;
};

export default FactoryRow;
