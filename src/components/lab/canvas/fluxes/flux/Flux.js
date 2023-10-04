import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Group } from 'react-konva';
import FluxBody from './FluxBody';
import FluxPointer from './FluxPointer';
import { calculateEnergyWidth } from '../../../../../utils';
import {
  FLUX_BODY_WIDTH_AS_PERCENTAGE_OF_TOTAL_WIDTH,
  FLUX_LABEL_DEFAULT_COLOR,
  FLUX_POINTER_HEIGHT_AS_PERCENTAGE_OF_POINTER_WIDTH,
  MINIMUM_FLUX_POINTER_HEIGHT,
  NET_FLUX_LABEL_COLOR,
  TOTAL_INTERVALS_TO_COMPLETE_FLUX,
  UP_STRING,
} from '../../../../../constants';

const Flux = ({
  x,
  y,
  totalHeight,
  fill,
  rotation,
  direction,
  energy,
  startsAfterInterval,
  animateFlux,
  netFlux,
}) => {
  const { width: stageWidth } = useSelector(
    ({ layout }) => layout.lab.stageDimensions,
  );
  const { intervalCount, thermometer, sliders } = useSelector(({ lab }) => lab);
  const { temperature: thermoTemp } = thermometer;
  const { temperature: impliedTemp } = sliders;
  const atEquilibrium = thermoTemp === impliedTemp;

  const totalWidth = calculateEnergyWidth(energy, stageWidth, netFlux);
  const showPointer = (netFlux && !atEquilibrium) || !netFlux;

  const pointerWidth = totalWidth;
  // because some flux values are small, use Math.max() to ensure pointer has a minimal size that can accomodate its label
  const pointerHeight = Math.max(
    pointerWidth * FLUX_POINTER_HEIGHT_AS_PERCENTAGE_OF_POINTER_WIDTH,
    MINIMUM_FLUX_POINTER_HEIGHT,
  );
  // flux body height is computed dynamically based on intervalCount to create animation effect
  const bodyHeight = animateFlux
    ? (totalHeight - pointerHeight) *
      Math.min(
        1,
        (intervalCount - startsAfterInterval) /
          TOTAL_INTERVALS_TO_COMPLETE_FLUX,
      )
    : totalHeight - pointerHeight;
  const bodyWidth = totalWidth * FLUX_BODY_WIDTH_AS_PERCENTAGE_OF_TOTAL_WIDTH;

  let adjustedY = y;
  if (netFlux) {
    // eslint-disable-next-line no-unused-expressions
    direction === UP_STRING
      ? (adjustedY += bodyHeight / 2)
      : (adjustedY -= bodyHeight / 2);
  }

  if (energy <= 0 && !netFlux) {
    return null;
  }

  return (
    intervalCount > startsAfterInterval && (
      <Group x={x} y={adjustedY} rotation={rotation}>
        <FluxBody
          bodyWidth={bodyWidth}
          bodyHeight={bodyHeight}
          fill={fill}
          direction={direction}
          showEquilibriumSign={netFlux && atEquilibrium}
        />
        {showPointer && (
          <FluxPointer
            bodyHeight={bodyHeight}
            pointerWidth={pointerWidth}
            pointerHeight={pointerHeight}
            fill={fill}
            direction={direction}
            energy={energy}
            fontColor={
              netFlux ? NET_FLUX_LABEL_COLOR : FLUX_LABEL_DEFAULT_COLOR
            }
            atEquilibrium={atEquilibrium}
          />
        )}
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
  energy: PropTypes.number.isRequired,
  startsAfterInterval: PropTypes.number.isRequired,
  animateFlux: PropTypes.bool,
  netFlux: PropTypes.bool,
};

Flux.defaultProps = {
  rotation: 0,
  animateFlux: true,
  netFlux: false,
};

export default Flux;
