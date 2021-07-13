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

const CarbonDioxide = ({ moleculeCenter, stageHeight }) => {
  const carbonAtomRadius = ATOM_DIMENSIONS[CARBON.size] * stageHeight;
  const oxygenAtomRadius = ATOM_DIMENSIONS[OXYGEN.size] * stageHeight;

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
    <Group
      onMouseEnter={(event) => {
        const container = event.target.getStage().container();
        container.style.cursor = 'default';
      }}
      onMouseLeave={(event) => {
        const container = event.target.getStage().container();
        container.style.cursor = 'zoom-out';
      }}
    >
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
  stageHeight: PropTypes.number.isRequired,
};

export default CarbonDioxide;
