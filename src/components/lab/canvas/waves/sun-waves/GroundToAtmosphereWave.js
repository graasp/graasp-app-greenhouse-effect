import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  GROUND_TO_ATMOSPHERE_FLUX_ROTATION,
  SUN_FLUXES_DEFAULT_COLOR,
  VISIBLE_LIGHT,
} from '../../../../../constants';
import { FluxesWavesContext } from '../../../../contexts/fluxes-waves/FluxesWavesProvider';
import Wave from '../wave/Wave';

const GroundToAtmosphereWave = ({ energy }) => {
  const { groundToAtmosphereWave, isVenus } = useContext(FluxesWavesContext);
  const {
    beginsX,
    beginsY,
    endsY,
    startsAfterInterval,
  } = groundToAtmosphereWave;

  return (
    !isVenus && (
      <Wave
        waveBeginsX={beginsX}
        waveBeginsY={beginsY}
        waveEndsY={endsY}
        waveColor={SUN_FLUXES_DEFAULT_COLOR}
        energy={energy}
        waveRotation={GROUND_TO_ATMOSPHERE_FLUX_ROTATION}
        startAfterInterval={startsAfterInterval}
        type={VISIBLE_LIGHT}
      />
    )
  );
};

GroundToAtmosphereWave.propTypes = {
  energy: PropTypes.number.isRequired,
};

export default GroundToAtmosphereWave;
