import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CarbonDioxide from './molecules/CarbonDioxide';
import Water from './molecules/Water';
import Methane from './molecules/Methane';
import {
  ATOM_DIMENSIONS,
  MOLECULE_ROW_BEGINS_X,
  MOLECULE_ROW_BEGINS_Y,
  MOLECULE_DISTRIBUTION,
  X_DISTANCE_BETWEEN_MOLECULES_IN_ROW,
} from '../../../../../config/constants';
import {
  determineMoleculeCenterXs,
  distributeMoleculesRandomly,
} from '../../../../../utils/canvas';

const MoleculesRow = ({ skyHeight, skyWidth, skyBeginsX, skyBeginsY }) => {
  const moleculeRowBeginsX = skyBeginsX + MOLECULE_ROW_BEGINS_X * skyWidth;
  const moleculeRowBeginsY = skyBeginsY + MOLECULE_ROW_BEGINS_Y * skyHeight;
  const centralAtomRadius = ATOM_DIMENSIONS.medium * skyWidth;
  const spaceBetweenMolecules = X_DISTANCE_BETWEEN_MOLECULES_IN_ROW * skyWidth;
  const [randomMoleculeDistribution, setRandomMoleculeDistribution] = useState(
    [],
  );

  useEffect(() => {
    // determine a random molecule distribution so that the molecules are not all shown grouped together by type
    // only compute this distribution once on component mount, so that it isn't re-computed when e.g. screen size changes
    // TBD: If/how to modify this when we allow for MOLECULE_DISTRIBUTION to change via redux (e.g. 'add more methane')
    setRandomMoleculeDistribution(
      distributeMoleculesRandomly(MOLECULE_DISTRIBUTION),
    );
  }, []);

  // given molecule distribution, determine the x coordinates of the center points of molecules
  // (y coordinate is the same for all since they're on one row)
  const moleculeCenterXs = determineMoleculeCenterXs(
    moleculeRowBeginsX,
    centralAtomRadius,
    spaceBetweenMolecules,
    MOLECULE_DISTRIBUTION,
  );

  // map each molecule id to the corresponding React component
  const moleculeMap = {
    CARBON_DIOXIDE: CarbonDioxide,
    WATER: Water,
    METHANE: Methane,
  };

  const molecules = randomMoleculeDistribution.map((moleculeName, index) => {
    const MoleculeToDisplay = moleculeMap[moleculeName];
    return (
      <MoleculeToDisplay
        moleculeCenter={{
          x: moleculeCenterXs[index],
          y: moleculeRowBeginsY,
        }}
        skyWidth={skyWidth}
        // eslint-disable-next-line react/no-array-index-key
        key={index}
      />
    );
  });

  return molecules;
};

MoleculesRow.propTypes = {
  skyHeight: PropTypes.number.isRequired,
  skyWidth: PropTypes.number.isRequired,
  skyBeginsX: PropTypes.number.isRequired,
  skyBeginsY: PropTypes.number.isRequired,
};

export default MoleculesRow;
