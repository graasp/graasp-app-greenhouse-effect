import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  EARTH_FLUXES,
  SIMULATION_MODES,
  SKY_TO_ATMOSPHERE_FLUX_ROTATION,
  UP_STRING,
} from '../../../../../constants';
import { FluxesWavesContext } from '../../../../contexts/fluxes-waves/FluxesWavesProvider';
import Flux from '../flux/Flux';
import { setIsPaused, setPropagationComplete } from '../../../../../actions';
import { blinkFluxes } from '../../../../../utils';

const SkyToAtmosphereFlux = ({ energy, fill }) => {
  const dispatch = useDispatch();
  const { intervalCount, propagationComplete, simulationMode } = useSelector(
    ({ lab }) => lab,
  );
  const { skyToAtmosphere } = useContext(FluxesWavesContext);
  const {
    beginsX,
    beginsY,
    height,
    startsAfterInterval,
    endsAfterInterval,
  } = skyToAtmosphere;

  useEffect(() => {
    if (!propagationComplete && intervalCount >= endsAfterInterval.flux) {
      dispatch(setPropagationComplete(true));
      dispatch(setIsPaused(true));
      if (simulationMode === SIMULATION_MODES.TODAY.name) {
        blinkFluxes(EARTH_FLUXES, dispatch);
      }
    }
  }, [intervalCount]);

  return (
    <Flux
      x={beginsX}
      y={beginsY}
      totalHeight={height}
      rotation={SKY_TO_ATMOSPHERE_FLUX_ROTATION}
      fill={fill}
      direction={UP_STRING}
      energy={energy}
      startsAfterInterval={startsAfterInterval.flux}
    />
  );
};

SkyToAtmosphereFlux.propTypes = {
  energy: PropTypes.number.isRequired,
  fill: PropTypes.string.isRequired,
};

export default SkyToAtmosphereFlux;
