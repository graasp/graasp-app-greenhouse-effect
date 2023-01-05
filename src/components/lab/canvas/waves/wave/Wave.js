import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Line } from 'react-konva';
import { generateSineCurve } from '../../../../../utils';
import {
  INFRARED_RADIATION_PERIOD,
  MINIMUM_WAVE_AMPLITUDE,
  VISIBLE_LIGHT,
  VISIBLE_LIGHT_PERIOD,
} from '../../../../../constants';

const Wave = ({
  waveBeginsX,
  waveBeginsY,
  waveEndsY,
  waveColor,
  waveRotation,
  amplitude,
  startAfterInterval,
  type,
}) => {
  const { intervalCount } = useSelector(({ lab }) => lab);

  const period =
    type === VISIBLE_LIGHT ? VISIBLE_LIGHT_PERIOD : INFRARED_RADIATION_PERIOD;

  const waveAmplitude = Math.max(amplitude, MINIMUM_WAVE_AMPLITUDE);

  const wavePoints =
    intervalCount > startAfterInterval
      ? generateSineCurve(
          intervalCount - startAfterInterval,
          waveBeginsY,
          waveEndsY,
          waveAmplitude,
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
  amplitude: PropTypes.number.isRequired,
  startAfterInterval: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

Wave.defaultProps = {
  waveRotation: 0,
};

export default Wave;
