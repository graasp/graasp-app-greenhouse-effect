import React from 'react';
import PropTypes from 'prop-types';
import Atom from './Atom';
import { CARBON } from '../../../../../../config/constants';

const Carbon = ({ coordinates, atomRadius }) => {
  const { x, y } = coordinates;
  return (
    <Atom atomColor={CARBON.atomColor} atomRadius={atomRadius} x={x} y={y} />
  );
};

Carbon.propTypes = {
  coordinates: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
  atomRadius: PropTypes.number.isRequired,
};

export default Carbon;
