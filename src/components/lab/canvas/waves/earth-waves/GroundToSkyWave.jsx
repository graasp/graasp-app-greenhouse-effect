import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  EARTH_FLUXES_DEFAULT_COLOR,
  INFRARED,
  SIMULATION_MODES,
} from '../../../../../constants';
import Wave from '../wave/Wave';
import { FluxesWavesContext } from '../../../../contexts/fluxes-waves/FluxesWavesProvider';
import { setPropagationComplete } from '../../../../../actions';

const GroundToSkyWave = ({ energy, initial }) => {
  const { groundToSky } = useContext(FluxesWavesContext);
  const dispatch = useDispatch();
  const { propagationComplete, intervalCount, simulationMode } = useSelector(
    ({ lab }) => lab,
  );
  const {
    beginsX,
    beginsY,
    endsY,
    startsAfterInterval,
    endsAfterInterval,
  } = groundToSky;

  useEffect(() => {
    if (
      !propagationComplete &&
      intervalCount >= endsAfterInterval.wave &&
      simulationMode === SIMULATION_MODES.MARS.name
    ) {
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
      startsAfterInterval={startsAfterInterval.wave}
      type={INFRARED}
    />
  );
};

GroundToSkyWave.propTypes = {
  energy: PropTypes.number.isRequired,
  initial: PropTypes.number.isRequired,
};

export default GroundToSkyWave;
