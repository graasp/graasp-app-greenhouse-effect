import React from 'react';
import PropTypes from 'prop-types';
import { Group } from 'react-konva';
import Oxygen from '../atoms/OxygenAtom';
import Hydrogen from '../atoms/HydrogenAtom';
import {
  ATOM_DIMENSIONS,
  HYDROGEN,
  OXYGEN,
} from '../../../../../../config/constants';
import { determineWaterAtomsCoordinates } from '../../../../../../utils/canvas';

const Water = ({ moleculeCenter, skyWidth }) => {
  const oxygenAtomRadius = ATOM_DIMENSIONS[OXYGEN.size] * skyWidth;
  const hydrogenAtomRadius = ATOM_DIMENSIONS[HYDROGEN.size] * skyWidth;

  const {
    topHydrogen,
    oxygen,
    bottomHydrogen,
  } = determineWaterAtomsCoordinates(
    moleculeCenter,
    oxygenAtomRadius,
    hydrogenAtomRadius,
  );

  return (
    <Group>
      <Oxygen coordinates={oxygen} atomRadius={oxygenAtomRadius} />
      <Hydrogen coordinates={topHydrogen} atomRadius={hydrogenAtomRadius} />
      <Hydrogen coordinates={bottomHydrogen} atomRadius={hydrogenAtomRadius} />
    </Group>
  );
};

Water.propTypes = {
  moleculeCenter: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
  skyWidth: PropTypes.number.isRequired,
};

export default Water;
