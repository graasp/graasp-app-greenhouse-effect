import React from 'react';
import PropTypes from 'prop-types';
import { Group } from 'react-konva';
import Carbon from '../atoms/CarbonAtom';
import Hydrogen from '../atoms/HydrogenAtom';
import {
  ATOM_DIMENSIONS,
  CARBON,
  HYDROGEN,
} from '../../../../../../config/constants';
import { determineMethaneAtomsCoordinates } from '../../../../../../utils/canvas';

const Methane = ({
  moleculeCenter,
  stageHeight,
  cursorBecomesDefault,
  cursorBecomesZoomOut,
}) => {
  const carbonAtomRadius = ATOM_DIMENSIONS[CARBON.size] * stageHeight;
  const hydrogenAtomRadius = ATOM_DIMENSIONS[HYDROGEN.size] * stageHeight;

  const {
    carbon,
    topLeftHydrogen,
    topRightHydrogen,
    bottomRightHydrogen,
    bottomLeftHydrogen,
  } = determineMethaneAtomsCoordinates(
    moleculeCenter,
    carbonAtomRadius,
    hydrogenAtomRadius,
  );

  return (
    <Group
      onMouseEnter={cursorBecomesDefault}
      onMouseLeave={cursorBecomesZoomOut}
    >
      <Carbon coordinates={carbon} atomRadius={carbonAtomRadius} />
      <Hydrogen coordinates={topLeftHydrogen} atomRadius={hydrogenAtomRadius} />
      <Hydrogen
        coordinates={topRightHydrogen}
        atomRadius={hydrogenAtomRadius}
      />
      <Hydrogen
        coordinates={bottomRightHydrogen}
        atomRadius={hydrogenAtomRadius}
      />
      <Hydrogen
        coordinates={bottomLeftHydrogen}
        atomRadius={hydrogenAtomRadius}
      />
    </Group>
  );
};

Methane.propTypes = {
  moleculeCenter: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
  stageHeight: PropTypes.number.isRequired,
  cursorBecomesDefault: PropTypes.func.isRequired,
  cursorBecomesZoomOut: PropTypes.func.isRequired,
};

export default Methane;
