import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { SIMULATION_MODES, UP_STRING } from '../../../../../constants';
import { FluxesWavesContext } from '../../../../contexts/fluxes-waves/FluxesWavesProvider';
import Flux from '../flux/Flux';
import { setIsPaused, setPropagationComplete } from '../../../../../actions';

const GroundToSkyFlux = ({ energy, fill }) => {
  const { groundToSky } = useContext(FluxesWavesContext);
  const dispatch = useDispatch();
  const { intervalCount, propagationComplete, simulationMode } = useSelector(
    ({ lab }) => lab,
  );
  const {
    beginsX,
    beginsY,
    height,
    startsAfterInterval,
    endsAfterInterval,
  } = groundToSky;

  useEffect(() => {
    if (
      !propagationComplete &&
      intervalCount >= endsAfterInterval.flux &&
      simulationMode === SIMULATION_MODES.MARS.name
    ) {
      dispatch(setPropagationComplete(true));
      dispatch(setIsPaused(true));
    }
  }, [intervalCount]);

  return (
    <Flux
      x={beginsX}
      y={beginsY}
      totalHeight={height}
      fill={fill}
      direction={UP_STRING}
      energy={energy}
      startsAfterInterval={startsAfterInterval.flux}
    />
  );
};

GroundToSkyFlux.propTypes = {
  energy: PropTypes.number.isRequired,
  fill: PropTypes.string.isRequired,
};

export default GroundToSkyFlux;
