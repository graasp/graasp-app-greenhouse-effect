import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import Factory from './Factory';
import {
  DEFAULT_NUMBER_OF_FACTORIES_IN_ROW,
  SIMULATION_MODES,
} from '../../../../../constants';
import { GroundDimensionsContext } from '../../../../contexts/canvas-dimensions/GroundDimensionsProvider';

const FactoryRow = () => {
  const {
    factoryRowBeginsY,
    factoryRowBeginsX,
    xDistanceBetweenFactories,
    mainBuildingWidth,
    mainBuildingHeight,
    sideBuildingWidth,
    sideBuildingHeight,
    totalBuildingsWidth,
  } = useContext(GroundDimensionsContext);
  const { simulationMode } = useSelector(({ lab }) => lab);

  const numFactoriesInRow =
    simulationMode !== SIMULATION_MODES.PRE_INDUSTRIAL.name
      ? DEFAULT_NUMBER_OF_FACTORIES_IN_ROW
      : DEFAULT_NUMBER_OF_FACTORIES_IN_ROW - 1;

  const factories = new Array(numFactoriesInRow)
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
