import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import {
  EARTH_FLUXES_DEFAULT_COLOR,
  GROUND_TO_SKY_WAVE_AMPLITUDE,
  INFRARED,
  SKY_TO_GROUND_WAVE_ROTATION,
} from '../../../../../constants';
import { FluxesWavesContext } from '../../../../contexts/fluxes-waves/FluxesWavesProvider';
import Wave from '../wave/Wave';

const SkyToGroundWave = () => {
  const { thermometerGreenhouseEffect } = useSelector(({ lab }) => lab);
  const { skyToGroundWave } = useContext(FluxesWavesContext);
  const { beginsX, beginsY, endsY, startsAfterInterval } = skyToGroundWave;

  return (
    <Wave
      waveBeginsX={beginsX}
      waveBeginsY={beginsY}
      waveEndsY={endsY}
      waveColor={EARTH_FLUXES_DEFAULT_COLOR}
      amplitude={GROUND_TO_SKY_WAVE_AMPLITUDE * thermometerGreenhouseEffect}
      waveRotation={SKY_TO_GROUND_WAVE_ROTATION}
      startAfterInterval={startsAfterInterval}
      type={INFRARED}
    />
  );
};

export default SkyToGroundWave;
