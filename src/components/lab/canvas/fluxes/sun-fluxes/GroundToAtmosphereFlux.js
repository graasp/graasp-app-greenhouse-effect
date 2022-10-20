import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Flux from '../flux/Flux';
import { FluxesWavesContext } from '../../../../contexts/fluxes-waves/FluxesWavesProvider';
import {
  GROUND_TO_ATMOSPHERE_FLUX_ROTATION,
  UP_STRING,
} from '../../../../../config/constants';

const GroundToAtmosphereFlux = ({ flux, fill }) => {
  const {
    groundToAtmosphereFluxBeginsX,
    groundToAtmosphereFluxBeginsY,
    groundToAtmosphereFluxHeight,
    groundToAtmosphereFluxStartsAfterInterval,
  } = useContext(FluxesWavesContext);

  return (
    <Flux
      x={groundToAtmosphereFluxBeginsX}
      y={groundToAtmosphereFluxBeginsY}
      totalHeight={groundToAtmosphereFluxHeight}
      rotation={GROUND_TO_ATMOSPHERE_FLUX_ROTATION}
      fill={fill}
      direction={UP_STRING}
      flux={flux}
      startAfterInterval={groundToAtmosphereFluxStartsAfterInterval}
    />
  );
};

GroundToAtmosphereFlux.propTypes = {
  flux: PropTypes.number.isRequired,
  fill: PropTypes.string.isRequired,
};

export default GroundToAtmosphereFlux;
