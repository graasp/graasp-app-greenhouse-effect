import React from 'react';
import PropTypes from 'prop-types';
import { Group } from 'react-konva';
import EquilibriumSymbolLine from './EquilibriumSymbolLine';
import { EQUILIBRIUM_SYMBOL_WIDTH } from '../../../../constants';

const EquilibriumSymbol = ({ bodyWidth, bodyHeight }) => {
  const symbolWidth = EQUILIBRIUM_SYMBOL_WIDTH * bodyWidth;
  const symbolBegins = (bodyWidth - symbolWidth) / 2;
  const verticalSpace = bodyHeight / 5;
  const upperHalfY = verticalSpace * 2;
  const bottomHalfY = verticalSpace * 3;

  return (
    <Group x={symbolBegins}>
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
};

export default EquilibriumSymbol;
