import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  GROUND_TO_ATMOSPHERE_FLUX_ROTATION,
  SUN_FLUXES_DEFAULT_COLOR,
  VISIBLE_LIGHT,
} from '../../../../../constants';
import { FluxesWavesContext } from '../../../../contexts/fluxes-waves/FluxesWavesProvider';
import Wave from '../wave/Wave';

const GroundToAtmosphereWave = ({ energy, initial }) => {
  const { groundToAtmosphere, isVenus } = useContext(FluxesWavesContext);
  const { beginsX, beginsY, endsY, startsAfterInterval } = groundToAtmosphere;

  return (
    !isVenus && (
      <Wave
        waveBeginsX={beginsX}
        waveBeginsY={beginsY}
        waveEndsY={endsY}
        waveColor={SUN_FLUXES_DEFAULT_COLOR}
        energy={energy}
        initial={initial}
        waveRotation={GROUND_TO_ATMOSPHERE_FLUX_ROTATION}
        startAfterInterval={startsAfterInterval.wave}
        type={VISIBLE_LIGHT}
      />
    )
  );
};

GroundToAtmosphereWave.propTypes = {
  energy: PropTypes.number.isRequired,
  initial: PropTypes.number.isRequired,
};

export default GroundToAtmosphereWave;
