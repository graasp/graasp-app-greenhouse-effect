import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Group } from 'react-konva';
import FluxBody from './FluxBody';
import FluxPointer from './FluxPointer';
import { calculateFluxWidth } from '../../../../../utils/canvas';
import {
  FLUX_BODY_WIDTH_AS_PERCENTAGE_OF_TOTAL_WIDTH,
  FLUX_POINTER_HEIGHT_AS_PERCENTAGE_OF_POINTER_WIDTH,
  MINIMUM_FLUX_POINTER_HEIGHT,
  TOTAL_INTERVALS_TO_COMPLETE_FLUX,
} from '../../../../../config/constants';

const Flux = ({
  x,
  y,
  totalHeight,
  fill,
  rotation,
  direction,
  flux,
  startAfterInterval,
}) => {
  const { width: stageWidth } = useSelector(
    ({ layout }) => layout.lab.stageDimensions,
  );
  const { intervalCount } = useSelector(({ lab }) => lab);

  const totalWidth = calculateFluxWidth(flux, stageWidth);
  const pointerWidth = totalWidth;
  // because some flux values are small, use Math.max() to ensure pointer has a minimal size that can accomodate its label
  const pointerHeight = Math.max(
    pointerWidth * FLUX_POINTER_HEIGHT_AS_PERCENTAGE_OF_POINTER_WIDTH,
    MINIMUM_FLUX_POINTER_HEIGHT,
  );
  // flux body height is computed dynamically based on intervalCount to create animation effect
  const bodyHeight =
    (totalHeight - pointerHeight) *
    Math.min(
      1,
      (intervalCount - startAfterInterval) / TOTAL_INTERVALS_TO_COMPLETE_FLUX,
    );
  const bodyWidth = totalWidth * FLUX_BODY_WIDTH_AS_PERCENTAGE_OF_TOTAL_WIDTH;

  if (flux < 0) {
    return null;
  }

  return (
    intervalCount > startAfterInterval && (
      <Group x={x} y={y} rotation={rotation}>
        <FluxBody
          bodyWidth={bodyWidth}
          bodyHeight={bodyHeight}
          fill={fill}
          direction={direction}
        />
        <FluxPointer
          bodyHeight={bodyHeight}
          pointerWidth={pointerWidth}
          pointerHeight={pointerHeight}
          fill={fill}
          direction={direction}
          flux={flux}
        />
      </Group>
    )
  );
};

Flux.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  totalHeight: PropTypes.number.isRequired,
  fill: PropTypes.string.isRequired,
  rotation: PropTypes.number,
  direction: PropTypes.string.isRequired,
  flux: PropTypes.number.isRequired,
  startAfterInterval: PropTypes.number.isRequired,
};

Flux.defaultProps = {
  rotation: 0,
};

export default Flux;
