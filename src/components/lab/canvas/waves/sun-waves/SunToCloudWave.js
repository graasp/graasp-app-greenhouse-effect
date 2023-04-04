import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  SUN_FLUXES_DEFAULT_COLOR,
  VISIBLE_LIGHT,
} from '../../../../../constants';
import Wave from '../wave/Wave';
import { FluxesWavesContext } from '../../../../contexts/fluxes-waves/FluxesWavesProvider';

const SunToCloudWave = ({ energy }) => {
  const { sunToCloudWave } = useContext(FluxesWavesContext);
  const { beginsX, beginsY, endsY, startsAfterInterval } = sunToCloudWave;

  return (
    <Wave
      waveBeginsX={beginsX}
      waveBeginsY={beginsY}
      waveEndsY={endsY}
      waveColor={SUN_FLUXES_DEFAULT_COLOR}
      energy={energy}
      startAfterInterval={startsAfterInterval}
      type={VISIBLE_LIGHT}
    />
  );
};

SunToCloudWave.propTypes = { energy: PropTypes.number.isRequired };

export default SunToCloudWave;
