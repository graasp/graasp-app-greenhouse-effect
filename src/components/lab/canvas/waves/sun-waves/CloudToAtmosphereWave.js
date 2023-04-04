import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  CLOUD_TO_ATMOSPHERE_FLUX_ROTATION,
  SUN_FLUXES_DEFAULT_COLOR,
  VISIBLE_LIGHT,
} from '../../../../../constants';
import { FluxesWavesContext } from '../../../../contexts/fluxes-waves/FluxesWavesProvider';
import Wave from '../wave/Wave';

const CloudToAtmosphereWave = ({ energy }) => {
  const { cloudToAtmosphereWave } = useContext(FluxesWavesContext);
  const {
    beginsX,
    beginsY,
    endsY,
    startsAfterInterval,
  } = cloudToAtmosphereWave;

  return (
    <Wave
      waveBeginsX={beginsX}
      waveBeginsY={beginsY}
      waveEndsY={endsY}
      waveColor={SUN_FLUXES_DEFAULT_COLOR}
      energy={energy}
      waveRotation={CLOUD_TO_ATMOSPHERE_FLUX_ROTATION}
      startAfterInterval={startsAfterInterval}
      type={VISIBLE_LIGHT}
    />
  );
};

CloudToAtmosphereWave.propTypes = {
  energy: PropTypes.number.isRequired,
};

export default CloudToAtmosphereWave;
