import React from 'react';
import PropTypes from 'prop-types';
import { Group } from 'react-konva';
import Carbon from '../atoms/CarbonAtom';
import Oxygen from '../atoms/OxygenAtom';
import { determineCarbonDioxideAtomsCoordinates } from '../../../../../../utils';
import { ATOM_DIMENSIONS, CARBON, OXYGEN } from '../../../../../../constants';

const CarbonDioxide = ({
  moleculeCenter,
  stageHeight,
  cursorBecomesDefault,
  cursorBecomesZoomOut,
  rotation,
}) => {
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
    rotation,
  );

  return (
    <Group
      onMouseEnter={cursorBecomesDefault}
      onMouseLeave={cursorBecomesZoomOut}
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
  rotation: PropTypes.number.isRequired,
  stageHeight: PropTypes.number.isRequired,
  cursorBecomesDefault: PropTypes.func.isRequired,
  cursorBecomesZoomOut: PropTypes.func.isRequired,
};

export default CarbonDioxide;
