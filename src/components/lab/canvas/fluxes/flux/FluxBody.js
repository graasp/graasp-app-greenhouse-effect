import React from 'react';
import PropTypes from 'prop-types';
import { Group, Rect } from 'react-konva';
import { UP_STRING } from '../../../../../constants';
import EquilibriumSymbol from '../EquilibriumSymbol';

const FluxBody = ({
  bodyWidth,
  bodyHeight,
  fill,
  direction,
  showEquilibriumSign,
}) => {
  const directedHeight = direction === UP_STRING ? -bodyHeight : bodyHeight;

  return (
    <Group x={-bodyWidth / 2}>
      <Rect width={bodyWidth} height={directedHeight} fill={fill} />
      {showEquilibriumSign && (
        <EquilibriumSymbol
          bodyWidth={bodyWidth}
          bodyHeight={bodyHeight}
          direction={direction}
        />
      )}
    </Group>
  );
};

FluxBody.propTypes = {
  bodyWidth: PropTypes.number.isRequired,
  bodyHeight: PropTypes.number.isRequired,
  fill: PropTypes.string.isRequired,
  direction: PropTypes.string.isRequired,
  showEquilibriumSign: PropTypes.bool,
};

FluxBody.defaultProps = {
  showEquilibriumSign: false,
};

export default FluxBody;
