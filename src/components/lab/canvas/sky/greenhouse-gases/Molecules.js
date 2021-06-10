import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CarbonDioxide from './molecules/CarbonDioxide';
import Water from './molecules/Water';
import Methane from './molecules/Methane';
import { MOLECULE_DISTRIBUTION } from '../../../../../config/constants';
import {
  chunkMolecules,
  determineMoleculesWithinRowCenterXs,
  determineMoleculeRowsCenterYs,
} from '../../../../../utils/canvas';

const Molecules = ({ skyHeight, skyWidth, skyBeginsX, skyBeginsY }) => {
  const [yPoints, setYPoints] = useState([]);
  const [xPoints, setXPoints] = useState([]);
  const [moleculeDistribution, setMoleculeDistribution] = useState([]);

  useEffect(() => {
    // determine a random molecule distribution
    // only compute this distribution once on component mount, so that it isn't re-computed when e.g. screen size changes
    // TBD: If/how to modify this when we allow for MOLECULE_DISTRIBUTION to change via redux (e.g. 'add more methane')
    setMoleculeDistribution(chunkMolecules(MOLECULE_DISTRIBUTION));
    setXPoints(determineMoleculesWithinRowCenterXs(MOLECULE_DISTRIBUTION));
    setYPoints(determineMoleculeRowsCenterYs(MOLECULE_DISTRIBUTION));
  }, []);

  // map each molecule id to the corresponding React component
  const moleculeMap = {
    CARBON_DIOXIDE: CarbonDioxide,
    WATER: Water,
    METHANE: Methane,
  };

  const newMolecules = moleculeDistribution.map((moleculeRow, rowIndex) =>
    moleculeRow.map((moleculeName, index) => {
      const MoleculeToDisplay = moleculeMap[moleculeName];
      return (
        <MoleculeToDisplay
          moleculeCenter={{
            x: skyBeginsX + xPoints[rowIndex][index] * skyWidth,
            y: skyBeginsY + yPoints[rowIndex] * skyHeight,
          }}
          skyHeight={skyHeight}
          // eslint-disable-next-line react/no-array-index-key
          key={index}
        />
      );
    }),
  );

  return newMolecules;
};

Molecules.propTypes = {
  skyHeight: PropTypes.number.isRequired,
  skyWidth: PropTypes.number.isRequired,
  skyBeginsX: PropTypes.number.isRequired,
  skyBeginsY: PropTypes.number.isRequired,
};

export default Molecules;
