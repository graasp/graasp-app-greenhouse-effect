import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import CarbonDioxide from './molecules/CarbonDioxide';
import Water from './molecules/Water';
import Methane from './molecules/Methane';
import {
  chunkMolecules,
  determineMoleculeRowsCenterYs,
  distributeMolecules,
} from '../../../../../utils';
import {
  CARBON_DIOXIDE,
  MAX_CARBON_DIOXIDE_DEFAULT,
  METHANE,
  MAX_METHANE,
  WATER,
  MAX_WATER,
} from '../../../../../constants';

const Molecules = ({
  stageHeight,
  stageWidth,
  cursorBecomesDefault,
  cursorBecomesZoomOut,
  maxDistribution,
}) => {
  const { sliders } = useSelector(({ lab }) => lab);

  const { carbonDioxide, methane, waterVapor } = sliders;

  const moleculeDistribution = distributeMolecules(maxDistribution, [
    {
      name: CARBON_DIOXIDE,
      count: Math.min(carbonDioxide, MAX_CARBON_DIOXIDE_DEFAULT),
    },
    {
      name: METHANE,
      count: Math.min(methane, MAX_METHANE),
    },
    {
      name: WATER,
      count: Math.min(waterVapor, MAX_WATER),
    },
  ]);
  const chunkedDistribution = chunkMolecules(moleculeDistribution);
  const yPoints = determineMoleculeRowsCenterYs();

  // map each molecule id to the corresponding React component
  const moleculeMap = {};
  moleculeMap[CARBON_DIOXIDE] = CarbonDioxide;
  moleculeMap[WATER] = Water;
  moleculeMap[METHANE] = Methane;

  const molecules = chunkedDistribution.map((moleculeRow, rowIndex) =>
    moleculeRow.map(({ name, switchedOn, centerX, rotation }, index) => {
      const MoleculeToDisplay = moleculeMap[name];
      return (
        switchedOn && (
          <MoleculeToDisplay
            moleculeCenter={{
              x: centerX * stageWidth,
              y: yPoints[rowIndex] * stageHeight,
            }}
            stageHeight={stageHeight}
            cursorBecomesDefault={cursorBecomesDefault}
            cursorBecomesZoomOut={cursorBecomesZoomOut}
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            rotation={rotation}
          />
        )
      );
    }),
  );

  return molecules;
};

Molecules.propTypes = {
  stageHeight: PropTypes.number.isRequired,
  stageWidth: PropTypes.number.isRequired,
  cursorBecomesDefault: PropTypes.func.isRequired,
  cursorBecomesZoomOut: PropTypes.func.isRequired,
  maxDistribution: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Molecules;
