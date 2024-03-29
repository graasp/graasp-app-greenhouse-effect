import React, { useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  EARTH_FLUXES_DEFAULT_COLOR,
  INFRARED,
  SKY_TO_ATMOSPHERE_FLUX_ROTATION,
} from '../../../../../constants';
import { FluxesWavesContext } from '../../../../contexts/fluxes-waves/FluxesWavesProvider';
import Wave from '../wave/Wave';
import { setPropagationComplete } from '../../../../../actions';

const SkyToAtmosphereWave = ({ energy, initial, amplify }) => {
  const dispatch = useDispatch();
  const { propagationComplete, intervalCount } = useSelector(({ lab }) => lab);
  const { skyToAtmosphere } = useContext(FluxesWavesContext);
  const {
    beginsX,
    beginsY,
    endsY,
    startsAfterInterval,
    endsAfterInterval,
  } = skyToAtmosphere;

  useEffect(() => {
    if (!propagationComplete && intervalCount >= endsAfterInterval.wave) {
      dispatch(setPropagationComplete(true));
    }
  }, [intervalCount]);

  return (
    <Wave
      waveBeginsX={beginsX}
      waveBeginsY={beginsY}
      waveEndsY={endsY}
      waveColor={EARTH_FLUXES_DEFAULT_COLOR}
      energy={energy}
      initial={initial}
      amplify={amplify}
      startsAfterInterval={startsAfterInterval.wave}
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
