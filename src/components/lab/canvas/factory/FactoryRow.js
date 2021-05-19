import React from 'react';
import PropTypes from 'prop-types';
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
} from '../../../../config/constants';

const FactoryRow = ({
  groundHeight,
  groundWidth,
  groundBeginsX,
  groundBeginsY,
}) => {
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
        x={
          factoryRowBeginsX +
          index * (xDistanceBetweenFactories + totalBuildingsWidth)
        }
        y={factoryRowBeginsY}
        // eslint-disable-next-line react/no-array-index-key
        key={index}
      />
    ));

  return <>{factories}</>;
};

FactoryRow.propTypes = {
  groundHeight: PropTypes.number.isRequired,
  groundWidth: PropTypes.number.isRequired,
  groundBeginsX: PropTypes.number.isRequired,
  groundBeginsY: PropTypes.number.isRequired,
};

export default FactoryRow;
