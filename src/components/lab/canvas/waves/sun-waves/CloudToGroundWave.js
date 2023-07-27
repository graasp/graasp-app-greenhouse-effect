import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  SUN_FLUXES_DEFAULT_COLOR,
  VISIBLE_LIGHT,
} from '../../../../../constants';
import { FluxesWavesContext } from '../../../../contexts/fluxes-waves/FluxesWavesProvider';
import Wave from '../wave/Wave';

const CloudToGroundWave = ({ energy, initial }) => {
  const { cloudToGround } = useContext(FluxesWavesContext);
  const { beginsX, beginsY, endsY, startsAfterInterval } = cloudToGround;

  return (
    <Wave
      waveBeginsX={beginsX}
      waveBeginsY={beginsY}
      waveEndsY={endsY}
      waveColor={SUN_FLUXES_DEFAULT_COLOR}
      energy={energy}
      initial={initial}
      startAfterInterval={startsAfterInterval.wave}
      type={VISIBLE_LIGHT}
    />
  );
};

CloudToGroundWave.propTypes = {
  energy: PropTypes.number.isRequired,
  initial: PropTypes.number.isRequired,
};

export default CloudToGroundWave;
