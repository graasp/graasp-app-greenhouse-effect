import React from 'react';
import PropTypes from 'prop-types';
import { Group, Circle } from 'react-konva';

const Atom = ({ atomColor, atomRadius, x, y }) => {
  return (
    <Group>
      <Circle radius={atomRadius} fill={atomColor} x={x} y={y} />
    </Group>
  );
};

Atom.propTypes = {
  atomColor: PropTypes.string.isRequired,
  atomRadius: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};

export default Atom;
