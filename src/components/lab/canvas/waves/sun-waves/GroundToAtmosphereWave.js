import React, { useContext } from 'react';
import {
  GROUND_TO_ATMOSPHERE_WAVE_AMPLITUDE,
  GROUND_TO_ATMOSPHERE_WAVE_ROTATION,
  SUN_FLUXES_DEFAULT_COLOR,
  VISIBLE_LIGHT,
} from '../../../../../config/constants';
import { FluxesWavesContext } from '../../../../contexts/fluxes-waves/FluxesWavesProvider';
import Wave from '../wave/Wave';

const GroundToAtmosphereWave = () => {
  const {
    groundToAtmosphereWaveBeginsX,
    groundToAtmosphereWaveBeginsY,
    groundToAtmosphereWaveEndsY,
    groundToAtmosphereWaveStartsAfterInterval,
  } = useContext(FluxesWavesContext);

  return (
    <Wave
      waveBeginsX={groundToAtmosphereWaveBeginsX}
      waveBeginsY={groundToAtmosphereWaveBeginsY}
      waveEndsY={groundToAtmosphereWaveEndsY}
      waveColor={SUN_FLUXES_DEFAULT_COLOR}
      amplitude={GROUND_TO_ATMOSPHERE_WAVE_AMPLITUDE}
      waveRotation={GROUND_TO_ATMOSPHERE_WAVE_ROTATION}
      startAfterInterval={groundToAtmosphereWaveStartsAfterInterval}
      type={VISIBLE_LIGHT}
    />
  );
};

export default GroundToAtmosphereWave;
