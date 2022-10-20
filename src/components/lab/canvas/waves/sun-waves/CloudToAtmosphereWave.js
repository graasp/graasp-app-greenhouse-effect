import React, { useContext } from 'react';
import {
  CLOUD_TO_ATMOSPHERE_WAVE_AMPLITUDE,
  CLOUD_TO_ATMOSPHERE_WAVE_ROTATION,
  SUN_FLUXES_DEFAULT_COLOR,
  VISIBLE_LIGHT,
} from '../../../../../config/constants';
import { FluxesWavesContext } from '../../../../contexts/fluxes-waves/FluxesWavesProvider';
import Wave from '../wave/Wave';

const CloudToAtmosphereWave = () => {
  const {
    cloudToAtmosphereWaveBeginsX,
    cloudToAtmosphereWaveBeginsY,
    cloudToAtmosphereWaveEndsY,
    cloudToAtmosphereWaveStartsAfterInterval,
  } = useContext(FluxesWavesContext);

  return (
    <Wave
      waveBeginsX={cloudToAtmosphereWaveBeginsX}
      waveBeginsY={cloudToAtmosphereWaveBeginsY}
      waveEndsY={cloudToAtmosphereWaveEndsY}
      waveColor={SUN_FLUXES_DEFAULT_COLOR}
      amplitude={CLOUD_TO_ATMOSPHERE_WAVE_AMPLITUDE}
      waveRotation={CLOUD_TO_ATMOSPHERE_WAVE_ROTATION}
      startAfterInterval={cloudToAtmosphereWaveStartsAfterInterval}
      type={VISIBLE_LIGHT}
    />
  );
};

export default CloudToAtmosphereWave;
