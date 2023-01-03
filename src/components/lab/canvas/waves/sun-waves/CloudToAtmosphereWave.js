import React, { useContext } from 'react';
import {
  CLOUD_TO_ATMOSPHERE_WAVE_AMPLITUDE,
  CLOUD_TO_ATMOSPHERE_WAVE_ROTATION,
  SUN_FLUXES_DEFAULT_COLOR,
  VISIBLE_LIGHT,
} from '../../../../../constants';
import { FluxesWavesContext } from '../../../../contexts/fluxes-waves/FluxesWavesProvider';
import Wave from '../wave/Wave';

const CloudToAtmosphereWave = () => {
  const { cloudToAtmosphereWave } = useContext(FluxesWavesContext);
  const {
    beginsX,
    beginsY,
    endsY,
    startsAfterInterval,
  } = cloudToAtmosphereWave;

  return (
    <Wave
      waveBeginsX={beginsX}
      waveBeginsY={beginsY}
      waveEndsY={endsY}
      waveColor={SUN_FLUXES_DEFAULT_COLOR}
      amplitude={CLOUD_TO_ATMOSPHERE_WAVE_AMPLITUDE}
      waveRotation={CLOUD_TO_ATMOSPHERE_WAVE_ROTATION}
      startAfterInterval={startsAfterInterval}
      type={VISIBLE_LIGHT}
    />
  );
};

export default CloudToAtmosphereWave;
