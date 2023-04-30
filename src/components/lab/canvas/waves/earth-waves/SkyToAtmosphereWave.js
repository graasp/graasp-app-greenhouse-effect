import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  EARTH_FLUXES_DEFAULT_COLOR,
  INFRARED,
  SKY_TO_ATMOSPHERE_FLUX_ROTATION,
} from '../../../../../constants';
import { FluxesWavesContext } from '../../../../contexts/fluxes-waves/FluxesWavesProvider';
import Wave from '../wave/Wave';

const SkyToAtmosphereWave = ({ energy, initial, amplify }) => {
  const { skyToAtmosphereWave } = useContext(FluxesWavesContext);
  const { beginsX, beginsY, endsY, startsAfterInterval } = skyToAtmosphereWave;

  return (
    <Wave
      waveBeginsX={beginsX}
      waveBeginsY={beginsY}
      waveEndsY={endsY}
      waveColor={EARTH_FLUXES_DEFAULT_COLOR}
      energy={energy}
      initial={initial}
      amplify={amplify}
      startAfterInterval={startsAfterInterval}
      waveRotation={SKY_TO_ATMOSPHERE_FLUX_ROTATION}
      type={INFRARED}
    />
  );
};

SkyToAtmosphereWave.propTypes = {
  energy: PropTypes.number.isRequired,
  initial: PropTypes.number.isRequired,
  amplify: PropTypes.bool,
};

SkyToAtmosphereWave.defaultProps = {
  amplify: false,
};

export default SkyToAtmosphereWave;
