import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  SKY_TO_ATMOSPHERE_FLUX_ROTATION,
  UP_STRING,
} from '../../../../../config/constants';
import { FluxesWavesContext } from '../../../../contexts/fluxes-waves/FluxesWavesProvider';
import Flux from '../flux/Flux';

const SkyToAtmosphereFlux = ({ flux, fill }) => {
  const {
    skyToAtmosphereFluxBeginsX,
    skyToAtmosphereFluxBeginsY,
    skyToAtmosphereFluxHeight,
    skyToAtmosphereFluxStartsAfterInterval,
  } = useContext(FluxesWavesContext);

  return (
    <Flux
      x={skyToAtmosphereFluxBeginsX}
      y={skyToAtmosphereFluxBeginsY}
      totalHeight={skyToAtmosphereFluxHeight}
      rotation={SKY_TO_ATMOSPHERE_FLUX_ROTATION}
      fill={fill}
      direction={UP_STRING}
      flux={flux}
      startAfterInterval={skyToAtmosphereFluxStartsAfterInterval}
    />
  );
};

SkyToAtmosphereFlux.propTypes = {
  flux: PropTypes.number.isRequired,
  fill: PropTypes.string.isRequired,
};

export default SkyToAtmosphereFlux;
