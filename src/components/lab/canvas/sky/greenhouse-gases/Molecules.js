import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import CarbonDioxide from './molecules/CarbonDioxide';
import Water from './molecules/Water';
import Methane from './molecules/Methane';
import {
  chunkMolecules,
  determineMoleculesWithinRowCenterXs,
  determineMoleculeRowsCenterYs,
  adjustGreenhouseGasesDistribution,
} from '../../../../../utils/canvas';

const Molecules = ({
  stageHeight,
  stageWidth,
  cursorBecomesDefault,
  cursorBecomesZoomOut,
}) => {
  // determine a random molecule distribution
  // only compute this distribution once on component mount, so that it isn't re-computed when e.g. screen size changes
  // TBD: If/how to modify this when we allow for MOLECULE_DISTRIBUTION to change via redux (e.g. 'add more methane')
  const greenhouseGases = useSelector(({ lab }) => lab.greenhouseGasesValues);
  const adjustedGreenhouseGases = adjustGreenhouseGasesDistribution(
    greenhouseGases,
  );
  const moleculeDistribution = chunkMolecules(adjustedGreenhouseGases);
  const xPoints = determineMoleculesWithinRowCenterXs(moleculeDistribution);
  const yPoints = determineMoleculeRowsCenterYs();

  // map each molecule id to the corresponding React component
  const moleculeMap = {
    carbonDioxide: CarbonDioxide,
    water: Water,
    methane: Methane,
  };

  const molecules = moleculeDistribution.map((moleculeRow, rowIndex) =>
    moleculeRow.map((moleculeName, index) => {
      const MoleculeToDisplay = moleculeMap[moleculeName];
      return (
        <MoleculeToDisplay
          moleculeCenter={{
            x: xPoints[rowIndex][index] * stageWidth,
            y: yPoints[rowIndex] * stageHeight,
          }}
          stageHeight={stageHeight}
          cursorBecomesDefault={cursorBecomesDefault}
          cursorBecomesZoomOut={cursorBecomesZoomOut}
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          rotation={Math.random() * 180}
        />
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
};

export default Molecules;
