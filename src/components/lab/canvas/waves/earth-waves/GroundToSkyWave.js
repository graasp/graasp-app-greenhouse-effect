import React, { useContext } from 'react';
import {
  EARTH_FLUXES_DEFAULT_COLOR,
  GROUND_TO_SKY_WAVE_AMPLITUDE,
  INFRARED,
} from '../../../../../config/constants';
import Wave from '../wave/Wave';
import { FluxesWavesContext } from '../../../../contexts/fluxes-waves/FluxesWavesProvider';

const GroundToSkyWave = () => {
  const {
    groundToSkyWaveBeginsX,
    groundToSkyWaveBeginsY,
    groundToSkyWaveEndsY,
    groundToSkyWaveStartsAfterInterval,
  } = useContext(FluxesWavesContext);

  return (
    <Wave
      waveBeginsX={groundToSkyWaveBeginsX}
      waveBeginsY={groundToSkyWaveBeginsY}
      waveEndsY={groundToSkyWaveEndsY}
      waveColor={EARTH_FLUXES_DEFAULT_COLOR}
      amplitude={GROUND_TO_SKY_WAVE_AMPLITUDE}
      startAfterInterval={groundToSkyWaveStartsAfterInterval}
      type={INFRARED}
    />
  );
};

export default GroundToSkyWave;
