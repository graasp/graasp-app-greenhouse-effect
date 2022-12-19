import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  EARTH_FLUXES_DEFAULT_COLOR,
  GROUND_TO_SKY_WAVE_AMPLITUDE,
  INFRARED,
  SKY_TO_GROUND_WAVE_ROTATION,
} from '../../../../../config/constants';
import { FluxesWavesContext } from '../../../../contexts/fluxes-waves/FluxesWavesProvider';
import Wave from '../wave/Wave';

const SkyToGroundWave = ({ greenhouseEffect }) => {
  const { skyToGroundWave } = useContext(FluxesWavesContext);
  const { beginsX, beginsY, endsY, startsAfterInterval } = skyToGroundWave;

  return (
    <Wave
      waveBeginsX={beginsX}
      waveBeginsY={beginsY}
      waveEndsY={endsY}
      waveColor={EARTH_FLUXES_DEFAULT_COLOR}
      amplitude={GROUND_TO_SKY_WAVE_AMPLITUDE * greenhouseEffect}
      waveRotation={SKY_TO_GROUND_WAVE_ROTATION}
      startAfterInterval={startsAfterInterval}
      type={INFRARED}
    />
  );
};

SkyToGroundWave.propTypes = {
  greenhouseEffect: PropTypes.number.isRequired,
};

export default SkyToGroundWave;
