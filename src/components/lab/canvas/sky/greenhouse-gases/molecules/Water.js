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

const Water = ({
  moleculeCenter,
  stageHeight,
  cursorBecomesDefault,
  cursorBecomesZoomOut,
}) => {
  const oxygenAtomRadius = ATOM_DIMENSIONS[OXYGEN.size] * stageHeight;
  const hydrogenAtomRadius = ATOM_DIMENSIONS[HYDROGEN.size] * stageHeight;

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
    <Group
      onMouseEnter={cursorBecomesDefault}
      onMouseLeave={cursorBecomesZoomOut}
    >
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
  stageHeight: PropTypes.number.isRequired,

  cursorBecomesDefault: PropTypes.func.isRequired,
  cursorBecomesZoomOut: PropTypes.func.isRequired,
};

export default Water;
