import React, { useContext } from 'react';
import {
  CLOUD_TO_GROUND_WAVE_AMPLITUDE,
  SUN_FLUXES_DEFAULT_COLOR,
  VISIBLE_LIGHT,
} from '../../../../../config/constants';
import { FluxesWavesContext } from '../../../../contexts/fluxes-waves/FluxesWavesProvider';
import Wave from '../wave/Wave';

const CloudToGroundWave = () => {
  const {
    cloudToGroundWaveBeginsX,
    cloudToGroundWaveBeginsY,
    cloudToGroundWaveEndsY,
    cloudToGroundWaveStartsAfterInterval,
  } = useContext(FluxesWavesContext);

  return (
    <Wave
      waveBeginsX={cloudToGroundWaveBeginsX}
      waveBeginsY={cloudToGroundWaveBeginsY}
      waveEndsY={cloudToGroundWaveEndsY}
      waveColor={SUN_FLUXES_DEFAULT_COLOR}
      amplitude={CLOUD_TO_GROUND_WAVE_AMPLITUDE}
      startAfterInterval={cloudToGroundWaveStartsAfterInterval}
      type={VISIBLE_LIGHT}
    />
  );
};

export default CloudToGroundWave;
