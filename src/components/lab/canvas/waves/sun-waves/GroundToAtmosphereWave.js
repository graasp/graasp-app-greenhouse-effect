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
  const { groundToAtmosphereWave } = useContext(FluxesWavesContext);
  const {
    beginsX,
    beginsY,
    endsY,
    startsAfterInterval,
  } = groundToAtmosphereWave;

  return (
    <Wave
      waveBeginsX={beginsX}
      waveBeginsY={beginsY}
      waveEndsY={endsY}
      waveColor={SUN_FLUXES_DEFAULT_COLOR}
      amplitude={GROUND_TO_ATMOSPHERE_WAVE_AMPLITUDE}
      waveRotation={GROUND_TO_ATMOSPHERE_WAVE_ROTATION}
      startAfterInterval={startsAfterInterval}
      type={VISIBLE_LIGHT}
    />
  );
};

export default GroundToAtmosphereWave;
