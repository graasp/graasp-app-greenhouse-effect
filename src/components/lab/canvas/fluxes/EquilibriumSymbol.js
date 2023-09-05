import React from 'react';
import PropTypes from 'prop-types';
import { Group } from 'react-konva';
import EquilibriumSymbolLine from './EquilibriumSymbolLine';
import { EQUILIBRIUM_SYMBOL_WIDTH, UP_STRING } from '../../../../constants';

const EquilibriumSymbol = ({ bodyWidth, bodyHeight, direction }) => {
  const symbolWidth = EQUILIBRIUM_SYMBOL_WIDTH * bodyWidth;
  const symbolBegins = (bodyWidth - symbolWidth) / 2;
  const verticalSpace = bodyHeight / 5;
  const upperHalfY = verticalSpace * 2;
  const bottomHalfY = verticalSpace * 3;

  return (
    <Group x={symbolBegins} y={direction === UP_STRING ? -bodyHeight : 0}>
      <EquilibriumSymbolLine points={[0, 0, symbolWidth, 0]} y={upperHalfY} />
      <EquilibriumSymbolLine
        points={[0, 0, -verticalSpace, -verticalSpace]}
        x={symbolWidth}
        y={upperHalfY}
      />
      <EquilibriumSymbolLine points={[0, 0, symbolWidth, -0]} y={bottomHalfY} />
      <EquilibriumSymbolLine
        points={[0, 0, verticalSpace, verticalSpace]}
        y={bottomHalfY}
      />
    </Group>
  );
};

EquilibriumSymbol.propTypes = {
  bodyWidth: PropTypes.number.isRequired,
  bodyHeight: PropTypes.number.isRequired,
  direction: PropTypes.string.isRequired,
};

export default EquilibriumSymbol;
