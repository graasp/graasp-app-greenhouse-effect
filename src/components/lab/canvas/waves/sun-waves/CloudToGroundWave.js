import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  SUN_FLUXES_DEFAULT_COLOR,
  VISIBLE_LIGHT,
} from '../../../../../constants';
import { FluxesWavesContext } from '../../../../contexts/fluxes-waves/FluxesWavesProvider';
import Wave from '../wave/Wave';

const CloudToGroundWave = ({ energy }) => {
  const { cloudToGroundWave, isVenus } = useContext(FluxesWavesContext);
  const { beginsX, beginsY, endsY, startsAfterInterval } = cloudToGroundWave;

  return (
    !isVenus && (
      <Wave
        waveBeginsX={beginsX}
        waveBeginsY={beginsY}
        waveEndsY={endsY}
        waveColor={SUN_FLUXES_DEFAULT_COLOR}
        energy={energy}
        startAfterInterval={startsAfterInterval}
        type={VISIBLE_LIGHT}
      />
    )
  );
};

CloudToGroundWave.propTypes = {
  energy: PropTypes.number.isRequired,
};

export default CloudToGroundWave;
