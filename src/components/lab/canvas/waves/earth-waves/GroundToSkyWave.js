import React, { useContext } from 'react';
import {
  EARTH_FLUXES_DEFAULT_COLOR,
  GROUND_TO_SKY_WAVE_AMPLITUDE,
  INFRARED,
} from '../../../../../constants';
import Wave from '../wave/Wave';
import { FluxesWavesContext } from '../../../../contexts/fluxes-waves/FluxesWavesProvider';

const GroundToSkyWave = () => {
  const { groundToSkyWave } = useContext(FluxesWavesContext);
  const { beginsX, beginsY, endsY, startsAfterInterval } = groundToSkyWave;

  return (
    <Wave
      waveBeginsX={beginsX}
      waveBeginsY={beginsY}
      waveEndsY={endsY}
      waveColor={EARTH_FLUXES_DEFAULT_COLOR}
      amplitude={GROUND_TO_SKY_WAVE_AMPLITUDE}
      startAfterInterval={startsAfterInterval}
      type={INFRARED}
    />
  );
};

export default GroundToSkyWave;
