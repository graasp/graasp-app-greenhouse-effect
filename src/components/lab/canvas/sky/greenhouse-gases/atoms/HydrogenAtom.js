import React from 'react';
import PropTypes from 'prop-types';
import Atom from './Atom';
import { HYDROGEN } from '../../../../../../constants';

const Hydrogen = ({ coordinates, atomRadius }) => {
  const { x, y } = coordinates;
  return (
    <Atom atomColor={HYDROGEN.atomColor} atomRadius={atomRadius} x={x} y={y} />
  );
};

Hydrogen.propTypes = {
  coordinates: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
  atomRadius: PropTypes.number.isRequired,
};

export default Hydrogen;
