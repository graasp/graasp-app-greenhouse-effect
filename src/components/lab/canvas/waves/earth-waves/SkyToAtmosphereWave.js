import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  EARTH_FLUXES_DEFAULT_COLOR,
  GROUND_TO_SKY_WAVE_AMPLITUDE,
  INFRARED,
  SKY_TO_ATMOSPHERE_WAVE_ROTATION,
} from '../../../../../config/constants';
import { FluxesWavesContext } from '../../../../contexts/fluxes-waves/FluxesWavesProvider';
import Wave from '../wave/Wave';

const SkyToAtmosphereWave = ({ greenhouseEffect }) => {
  const {
    skyToAtmosphereWaveBeginsX,
    skyToAtmosphereWaveBeginsY,
    skyToAtmosphereWaveEndsY,
    skyToAtmosphereWaveStartsAfterInterval,
  } = useContext(FluxesWavesContext);

  return (
    <Wave
      waveBeginsX={skyToAtmosphereWaveBeginsX}
      waveBeginsY={skyToAtmosphereWaveBeginsY}
      waveEndsY={skyToAtmosphereWaveEndsY}
      waveColor={EARTH_FLUXES_DEFAULT_COLOR}
      amplitude={GROUND_TO_SKY_WAVE_AMPLITUDE * greenhouseEffect}
      startAfterInterval={skyToAtmosphereWaveStartsAfterInterval}
      waveRotation={SKY_TO_ATMOSPHERE_WAVE_ROTATION}
      type={INFRARED}
    />
  );
};

SkyToAtmosphereWave.propTypes = {
  greenhouseEffect: PropTypes.number.isRequired,
};

export default SkyToAtmosphereWave;
