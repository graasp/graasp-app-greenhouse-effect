import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  SUN_FLUXES_DEFAULT_COLOR,
  VISIBLE_LIGHT,
} from '../../../../../constants';
import Wave from '../wave/Wave';
import { FluxesWavesContext } from '../../../../contexts/fluxes-waves/FluxesWavesProvider';

const SunToCloudWave = ({ energy, initial }) => {
  const { sunToCloud } = useContext(FluxesWavesContext);
  const { beginsX, beginsY, endsY, startsAfterInterval } = sunToCloud;

  return (
    <Wave
      waveBeginsX={beginsX}
      waveBeginsY={beginsY}
      waveEndsY={endsY}
      waveColor={SUN_FLUXES_DEFAULT_COLOR}
      energy={energy}
      initial={initial}
      startsAfterInterval={startsAfterInterval.wave}
      type={VISIBLE_LIGHT}
    />
  );
};

SunToCloudWave.propTypes = {
  energy: PropTypes.number.isRequired,
  initial: PropTypes.number.isRequired,
};

export default SunToCloudWave;
