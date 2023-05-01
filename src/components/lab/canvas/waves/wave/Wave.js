import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Line } from 'react-konva';
import { calculateEnergyWidth, generateSineCurve } from '../../../../../utils';
import {
  FLUX_BODY_WIDTH_AS_PERCENTAGE_OF_TOTAL_WIDTH,
  INFRARED_RADIATION_PERIOD,
  MINIMUM_WAVE_AMPLITUDE,
  VISIBLE_LIGHT,
  VISIBLE_LIGHT_PERIOD,
  WAVE_AMPLIFICATION_FACTOR,
} from '../../../../../constants';

const Wave = ({
  waveBeginsX,
  waveBeginsY,
  waveEndsY,
  waveColor,
  waveRotation,
  energy,
  initial,
  amplify,
  startAfterInterval,
  type,
}) => {
  const { intervalCount } = useSelector(({ lab }) => lab);
  const { width: stageWidth } = useSelector(
    ({ layout }) => layout.lab.stageDimensions,
  );

  const period =
    type === VISIBLE_LIGHT ? VISIBLE_LIGHT_PERIOD : INFRARED_RADIATION_PERIOD;
  const initialWidth = calculateEnergyWidth(initial, stageWidth);
  const currentWidth = calculateEnergyWidth(energy, stageWidth);
  const adjustedWidth = amplify
    ? initialWidth + WAVE_AMPLIFICATION_FACTOR * (currentWidth - initialWidth)
    : currentWidth;
  const amplitude = Math.max(
    (adjustedWidth / 2) * FLUX_BODY_WIDTH_AS_PERCENTAGE_OF_TOTAL_WIDTH,
    MINIMUM_WAVE_AMPLITUDE,
  );

  const wavePoints =
    intervalCount > startAfterInterval
      ? generateSineCurve(
          intervalCount - startAfterInterval,
          waveBeginsY,
          waveEndsY,
          amplitude,
          period,
        )
      : [];

  return (
    <Line
      x={waveBeginsX}
      y={waveBeginsY}
      points={wavePoints}
      stroke={waveColor}
      rotation={waveRotation}
    />
  );
};

Wave.propTypes = {
  waveBeginsX: PropTypes.number.isRequired,
  waveBeginsY: PropTypes.number.isRequired,
  waveEndsY: PropTypes.number.isRequired,
  waveColor: PropTypes.string.isRequired,
  waveRotation: PropTypes.number,
  energy: PropTypes.number.isRequired,
  initial: PropTypes.number.isRequired,
  amplify: PropTypes.bool,
  startAfterInterval: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

Wave.defaultProps = {
  waveRotation: 0,
  amplify: false,
};

export default Wave;
