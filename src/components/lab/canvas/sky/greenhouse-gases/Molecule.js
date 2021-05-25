import React from 'react';
import PropTypes from 'prop-types';
import CarbonDioxide from './molecules/CarbonDioxide';
import Water from './molecules/Water';
import Methane from './molecules/Methane';
import {
  CARBON_DIOXIDE,
  METHANE,
  WATER,
} from '../../../../../config/constants';

const Molecule = ({ moleculeName, moleculeCenter, skyWidth }) => {
  let moleculeToDisplay = null;
  switch (moleculeName) {
    case CARBON_DIOXIDE:
      moleculeToDisplay = (
        <CarbonDioxide moleculeCenter={moleculeCenter} skyWidth={skyWidth} />
      );
      break;
    case WATER:
      moleculeToDisplay = (
        <Water moleculeCenter={moleculeCenter} skyWidth={skyWidth} />
      );
      break;
    case METHANE:
      moleculeToDisplay = (
        <Methane moleculeCenter={moleculeCenter} skyWidth={skyWidth} />
      );
      break;
    default:
      moleculeToDisplay = null;
  }

  return moleculeToDisplay;
};

Molecule.propTypes = {
  moleculeName: PropTypes.string.isRequired,
  moleculeCenter: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number })
    .isRequired,
  skyWidth: PropTypes.number.isRequired,
};

export default Molecule;
