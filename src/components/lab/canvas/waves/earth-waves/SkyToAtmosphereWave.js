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
  const { skyToAtmosphereWave } = useContext(FluxesWavesContext);
  const { beginsX, beginsY, endsY, startsAfterInterval } = skyToAtmosphereWave;

  return (
    <Wave
      waveBeginsX={beginsX}
      waveBeginsY={beginsY}
      waveEndsY={endsY}
      waveColor={EARTH_FLUXES_DEFAULT_COLOR}
      amplitude={GROUND_TO_SKY_WAVE_AMPLITUDE * (1 - greenhouseEffect)}
      startAfterInterval={startsAfterInterval}
      waveRotation={SKY_TO_ATMOSPHERE_WAVE_ROTATION}
      type={INFRARED}
    />
  );
};

SkyToAtmosphereWave.propTypes = {
  greenhouseEffect: PropTypes.number.isRequired,
};

export default SkyToAtmosphereWave;
