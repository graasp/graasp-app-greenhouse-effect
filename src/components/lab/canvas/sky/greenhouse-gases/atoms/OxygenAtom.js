import React from 'react';
import PropTypes from 'prop-types';
import Atom from './Atom';
import { OXYGEN } from '../../../../../../constants';

const Oxygen = ({ coordinates, atomRadius }) => {
  const { x, y } = coordinates;
  return (
    <Atom atomColor={OXYGEN.atomColor} atomRadius={atomRadius} x={x} y={y} />
  );
};

Oxygen.propTypes = {
  coordinates: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
  atomRadius: PropTypes.number.isRequired,
};

export default Oxygen;
