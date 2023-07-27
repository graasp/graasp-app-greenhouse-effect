import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  EARTH_FLUXES_DEFAULT_COLOR,
  INFRARED,
  SKY_TO_GROUND_FLUX_ROTATION,
} from '../../../../../constants';
import { FluxesWavesContext } from '../../../../contexts/fluxes-waves/FluxesWavesProvider';
import Wave from '../wave/Wave';

const SkyToGroundWave = ({ energy, initial, amplify }) => {
  const { skyToGround } = useContext(FluxesWavesContext);
  const { beginsX, beginsY, endsY, startsAfterInterval } = skyToGround;

  return (
    <Wave
      waveBeginsX={beginsX}
      waveBeginsY={beginsY}
      waveEndsY={endsY}
      waveColor={EARTH_FLUXES_DEFAULT_COLOR}
      energy={energy}
      initial={initial}
      amplify={amplify}
      waveRotation={SKY_TO_GROUND_FLUX_ROTATION}
      startAfterInterval={startsAfterInterval.wave}
      type={INFRARED}
    />
  );
};

SkyToGroundWave.propTypes = {
  energy: PropTypes.number.isRequired,
  initial: PropTypes.number.isRequired,
  amplify: PropTypes.bool,
};

SkyToGroundWave.defaultProps = {
  amplify: false,
};

export default SkyToGroundWave;
