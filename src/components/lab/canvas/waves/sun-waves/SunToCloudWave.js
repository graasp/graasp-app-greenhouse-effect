import React, { useContext } from 'react';
import {
  SUN_FLUXES_DEFAULT_COLOR,
  SUN_TO_CLOUD_WAVE_AMPLITUDE,
  VISIBLE_LIGHT,
} from '../../../../../config/constants';
import Wave from '../wave/Wave';
import { FluxesWavesContext } from '../../../../contexts/fluxes-waves/FluxesWavesProvider';

const SunToCloudWave = () => {
  const {
    sunToCloudWaveBeginsX,
    sunToCloudWaveBeginsY,
    sunToCloudWaveEndsY,
    sunToCloudWaveStartsAfterInterval,
  } = useContext(FluxesWavesContext);

  return (
    <Wave
      waveBeginsX={sunToCloudWaveBeginsX}
      waveBeginsY={sunToCloudWaveBeginsY}
      waveEndsY={sunToCloudWaveEndsY}
      waveColor={SUN_FLUXES_DEFAULT_COLOR}
      amplitude={SUN_TO_CLOUD_WAVE_AMPLITUDE}
      startAfterInterval={sunToCloudWaveStartsAfterInterval}
      type={VISIBLE_LIGHT}
    />
  );
};

export default SunToCloudWave;
