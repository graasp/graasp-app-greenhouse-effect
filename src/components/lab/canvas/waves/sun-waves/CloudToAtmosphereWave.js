import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  CLOUD_TO_ATMOSPHERE_FLUX_ROTATION,
  SUN_FLUXES_DEFAULT_COLOR,
  VISIBLE_LIGHT,
} from '../../../../../constants';
import { FluxesWavesContext } from '../../../../contexts/fluxes-waves/FluxesWavesProvider';
import Wave from '../wave/Wave';

const CloudToAtmosphereWave = ({ energy, initial }) => {
  const { cloudToAtmosphere } = useContext(FluxesWavesContext);
  const { beginsX, beginsY, endsY, startsAfterInterval } = cloudToAtmosphere;

  return (
    <Wave
      waveBeginsX={beginsX}
      waveBeginsY={beginsY}
      waveEndsY={endsY}
      waveColor={SUN_FLUXES_DEFAULT_COLOR}
      energy={energy}
      initial={initial}
      waveRotation={CLOUD_TO_ATMOSPHERE_FLUX_ROTATION}
      startAfterInterval={startsAfterInterval.wave}
      type={VISIBLE_LIGHT}
    />
  );
};

CloudToAtmosphereWave.propTypes = {
  energy: PropTypes.number.isRequired,
  initial: PropTypes.number.isRequired,
};

export default CloudToAtmosphereWave;
