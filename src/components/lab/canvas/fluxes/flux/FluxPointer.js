import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Group, Line, Text } from 'react-konva';
import { generateFluxPointerPoints } from '../../../../../utils';
import {
  ALMOST_ZERO,
  BOTTOM_STRING,
  FLUX_LABEL_LARGE_FONT_SIZE,
  FLUX_LABEL_MARGIN,
  FLUX_LABEL_SMALL_FONT_SIZE,
  TOP_STRING,
  UP_STRING,
  WIDE_FLUX_MINIMUM_WIDTH,
} from '../../../../../constants';

const FluxPointer = ({
  pointerWidth,
  pointerHeight,
  bodyHeight,
  direction,
  fill,
  energy,
  fontColor,
}) => {
  const { thermometer, sliders } = useSelector(({ lab }) => lab);
  const { temperature: thermometerTemperature } = thermometer;
  const { temperature: impliedTemperature } = sliders;
  const y = direction === UP_STRING ? -bodyHeight - pointerHeight : bodyHeight;
  const verticalAlign = direction === UP_STRING ? BOTTOM_STRING : TOP_STRING;

  const pointerPoints = generateFluxPointerPoints(
    direction,
    pointerWidth,
    pointerHeight,
  );

  const atEquilibrium = thermometerTemperature === impliedTemperature;
  const labelText = energy === 0 && !atEquilibrium ? ALMOST_ZERO : energy;

  return (
    <Group y={y}>
      <Line
        points={pointerPoints}
        closed
        fill={fill}
        // stroke and strokeWidth=1 give a minimal border around pointer
        // w/o these, there can be a faint line between the flux body and pointer
        stroke={fill}
        strokeWidth={1}
      />
      <Text
        x={-(pointerWidth + FLUX_LABEL_MARGIN) / 2}
        text={labelText}
        width={pointerWidth + FLUX_LABEL_MARGIN}
        align="center"
        height={pointerHeight}
        verticalAlign={verticalAlign}
        fontSize={
          pointerWidth > WIDE_FLUX_MINIMUM_WIDTH
            ? FLUX_LABEL_LARGE_FONT_SIZE
            : FLUX_LABEL_SMALL_FONT_SIZE
        }
        fill={fontColor}
      />
    </Group>
  );
};

FluxPointer.propTypes = {
  pointerWidth: PropTypes.number.isRequired,
  pointerHeight: PropTypes.number.isRequired,
  bodyHeight: PropTypes.number.isRequired,
  direction: PropTypes.string.isRequired,
  fill: PropTypes.string.isRequired,
  energy: PropTypes.number.isRequired,
  fontColor: PropTypes.string.isRequired,
};

export default FluxPointer;
