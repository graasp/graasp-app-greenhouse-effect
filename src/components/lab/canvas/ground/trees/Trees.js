import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { SIMULATION_MODES } from '../../../../../constants';
import { GroundDimensionsContext } from '../../../../contexts/canvas-dimensions/GroundDimensionsProvider';
import TreeRow from './TreeRow';

const Trees = () => {
  const {
    fullMountainBeginsX,
    groundBeginsY,
    fullMountainWidth,
    halfMountainWidth,
    factoryRowBeginsX,
    factoryRowBeginsY,
    factoryRowWidth,
    sideBuildingHeight,
    sideBuildingWidth,
    mainBuildingWidth,
  } = useContext(GroundDimensionsContext);
  const { simulationMode } = useSelector(({ lab }) => lab);

  const trees = {};
  trees[SIMULATION_MODES.TODAY.name] = [
    {
      rowBeginsX: fullMountainBeginsX,
      rowBeginsY: groundBeginsY,
      rowWidth: fullMountainWidth + halfMountainWidth,
    },
  ];
  trees[SIMULATION_MODES.TWENTIETH_CENTURY.name] = [
    {
      rowBeginsX: fullMountainBeginsX,
      rowBeginsY: groundBeginsY,
      rowWidth: fullMountainWidth + halfMountainWidth,
    },
    {
      rowBeginsX: factoryRowBeginsX,
      rowBeginsY: factoryRowBeginsY - sideBuildingHeight,
      rowWidth: factoryRowWidth,
    },
    {
      rowBeginsX: factoryRowBeginsX + sideBuildingWidth,
      rowBeginsY: factoryRowBeginsY,
      rowWidth: factoryRowWidth,
    },
    {
      rowBeginsX: factoryRowBeginsX + mainBuildingWidth,
      rowBeginsY: factoryRowBeginsY + sideBuildingHeight,
      rowWidth: factoryRowWidth,
    },
  ];
  trees[SIMULATION_MODES.ICE_AGE.name] = [
    {
      rowBeginsX: fullMountainBeginsX - halfMountainWidth,
      rowBeginsY: groundBeginsY,
      rowWidth: 2 * fullMountainWidth + halfMountainWidth,
    },
    {
      rowBeginsX: fullMountainBeginsX - halfMountainWidth + sideBuildingWidth,
      rowBeginsY: groundBeginsY + sideBuildingHeight,
      rowWidth: 2 * fullMountainWidth + halfMountainWidth,
    },
    {
      rowBeginsX:
        fullMountainBeginsX - halfMountainWidth + 2 * sideBuildingWidth,
      rowBeginsY: groundBeginsY + 2 * sideBuildingHeight,
      rowWidth: 2 * fullMountainWidth + halfMountainWidth,
    },
  ];
  trees[SIMULATION_MODES.MARS.name] = [];
  trees[SIMULATION_MODES.VENUS.name] = [];

  return trees[simulationMode].map(
    ({ rowBeginsX, rowBeginsY, rowWidth }, index) => (
      <TreeRow
        rowBeginsX={rowBeginsX}
        rowBeginsY={rowBeginsY}
        rowWidth={rowWidth}
        // eslint-disable-next-line react/jsx-props-no-multi-spaces, react/no-array-index-key
        key={index}
      />
    ),
  );
};

export default Trees;
