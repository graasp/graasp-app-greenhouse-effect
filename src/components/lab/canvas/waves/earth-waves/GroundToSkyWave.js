import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { EARTH_FLUXES_DEFAULT_COLOR, INFRARED } from '../../../../../constants';
import Wave from '../wave/Wave';
import { FluxesWavesContext } from '../../../../contexts/fluxes-waves/FluxesWavesProvider';

const GroundToSkyWave = ({ energy, initial, amplify }) => {
  const { groundToSkyWave } = useContext(FluxesWavesContext);
  const { beginsX, beginsY, endsY, startsAfterInterval } = groundToSkyWave;

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
      type={INFRARED}
    />
  );
};

GroundToSkyWave.propTypes = {
  energy: PropTypes.number.isRequired,
  initial: PropTypes.number.isRequired,
  amplify: PropTypes.bool,
};

GroundToSkyWave.defaultProps = {
  amplify: false,
};

export default GroundToSkyWave;
