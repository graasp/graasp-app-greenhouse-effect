import React, { useContext } from 'react';
import {
  SUN_FLUXES_DEFAULT_COLOR,
  SUN_TO_CLOUD_WAVE_AMPLITUDE,
  VISIBLE_LIGHT,
} from '../../../../../config/constants';
import Wave from '../wave/Wave';
import { FluxesWavesContext } from '../../../../contexts/fluxes-waves/FluxesWavesProvider';

const SunToCloudWave = () => {
  const { sunToCloudWave } = useContext(FluxesWavesContext);
  const { beginsX, beginsY, endsY, startsAfterInterval } = sunToCloudWave;

  return (
    <Wave
      waveBeginsX={beginsX}
      waveBeginsY={beginsY}
      waveEndsY={endsY}
      waveColor={SUN_FLUXES_DEFAULT_COLOR}
      amplitude={SUN_TO_CLOUD_WAVE_AMPLITUDE}
      startAfterInterval={startsAfterInterval}
      type={VISIBLE_LIGHT}
    />
  );
};

export default SunToCloudWave;
