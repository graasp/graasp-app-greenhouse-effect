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

const Methane = ({ moleculeCenter, skyHeight }) => {
  const carbonAtomRadius = ATOM_DIMENSIONS[CARBON.size] * skyHeight;
  const hydrogenAtomRadius = ATOM_DIMENSIONS[HYDROGEN.size] * skyHeight;

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
    <Group>
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
  skyHeight: PropTypes.number.isRequired,
};

export default Methane;
