import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  EARTH_FLUXES_DEFAULT_COLOR,
  INFRARED,
  SKY_TO_GROUND_FLUX_ROTATION,
} from '../../../../../constants';
import { FluxesWavesContext } from '../../../../contexts/fluxes-waves/FluxesWavesProvider';
import Wave from '../wave/Wave';

const SkyToGroundWave = ({ energy }) => {
  const { skyToGroundWave } = useContext(FluxesWavesContext);
  const { beginsX, beginsY, endsY, startsAfterInterval } = skyToGroundWave;

  return (
    <Wave
      waveBeginsX={beginsX}
      waveBeginsY={beginsY}
      waveEndsY={endsY}
      waveColor={EARTH_FLUXES_DEFAULT_COLOR}
      energy={energy}
      waveRotation={SKY_TO_GROUND_FLUX_ROTATION}
      startAfterInterval={startsAfterInterval}
      type={INFRARED}
    />
  );
};

SkyToGroundWave.propTypes = {
  energy: PropTypes.number.isRequired,
};

export default SkyToGroundWave;
