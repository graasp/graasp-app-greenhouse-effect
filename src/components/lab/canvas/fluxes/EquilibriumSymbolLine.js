import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-konva';
import {
  EQUILIBRIUM_SYMBOL_STROKE_WIDTH,
  NET_FLUX_LABEL_COLOR,
} from '../../../../constants';

const EquilibriumSymbolLine = ({ points, x, y }) => {
  return (
    <Line
      stroke={NET_FLUX_LABEL_COLOR}
      strokeWidth={EQUILIBRIUM_SYMBOL_STROKE_WIDTH}
      points={points}
      x={x}
      y={y}
    />
  );
};

EquilibriumSymbolLine.propTypes = {
  points: PropTypes.arrayOf(PropTypes.number).isRequired,
  x: PropTypes.number,
  y: PropTypes.number.isRequired,
};

EquilibriumSymbolLine.defaultProps = {
  x: 0,
};

export default EquilibriumSymbolLine;
