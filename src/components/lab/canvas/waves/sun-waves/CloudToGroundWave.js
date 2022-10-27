import React, { useContext } from 'react';
import {
  CLOUD_TO_GROUND_WAVE_AMPLITUDE,
  SUN_FLUXES_DEFAULT_COLOR,
  VISIBLE_LIGHT,
} from '../../../../../config/constants';
import { FluxesWavesContext } from '../../../../contexts/fluxes-waves/FluxesWavesProvider';
import Wave from '../wave/Wave';

const CloudToGroundWave = () => {
  const { cloudToGroundWave } = useContext(FluxesWavesContext);
  const { beginsX, beginsY, endsY, startsAfterInterval } = cloudToGroundWave;

  return (
    <Wave
      waveBeginsX={beginsX}
      waveBeginsY={beginsY}
      waveEndsY={endsY}
      waveColor={SUN_FLUXES_DEFAULT_COLOR}
      amplitude={CLOUD_TO_GROUND_WAVE_AMPLITUDE}
      startAfterInterval={startsAfterInterval}
      type={VISIBLE_LIGHT}
    />
  );
};

export default CloudToGroundWave;