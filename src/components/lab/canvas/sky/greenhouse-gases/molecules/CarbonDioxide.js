import React from 'react';
import PropTypes from 'prop-types';
import { Group } from 'react-konva';
import Carbon from '../atoms/CarbonAtom';
import Oxygen from '../atoms/OxygenAtom';
import { determineCarbonDioxideAtomsCoordinates } from '../../../../../../utils/canvas';
import {
  ATOM_DIMENSIONS,
  CARBON,
  OXYGEN,
} from '../../../../../../config/constants';

const CarbonDioxide = ({ moleculeCenter, skyWidth }) => {
  const carbonAtomRadius = ATOM_DIMENSIONS[CARBON.size] * skyWidth;
  const oxygenAtomRadius = ATOM_DIMENSIONS[OXYGEN.size] * skyWidth;

  const {
    topOxygen,
    carbon,
    bottomOxygen,
  } = determineCarbonDioxideAtomsCoordinates(
    moleculeCenter,
    carbonAtomRadius,
    oxygenAtomRadius,
  );

  return (
    <Group>
      <Oxygen coordinates={topOxygen} atomRadius={oxygenAtomRadius} />
      <Carbon coordinates={carbon} atomRadius={carbonAtomRadius} />
      <Oxygen coordinates={bottomOxygen} atomRadius={oxygenAtomRadius} />
    </Group>
  );
};

CarbonDioxide.propTypes = {
  moleculeCenter: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
  skyWidth: PropTypes.number.isRequired,
};

export default CarbonDioxide;
