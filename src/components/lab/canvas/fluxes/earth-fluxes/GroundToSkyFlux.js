import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { UP_STRING } from '../../../../../config/constants';
import { FluxesWavesContext } from '../../../../contexts/fluxes-waves/FluxesWavesProvider';
import Flux from '../flux/Flux';

const GroundToSkyFlux = ({ flux, fill }) => {
  const {
    groundToSkyFluxBeginsX,
    groundToSkyFluxBeginsY,
    groundToSkyFluxHeight,
    groundToSkyFluxStartsAfterInterval,
  } = useContext(FluxesWavesContext);

  return (
    <Flux
      x={groundToSkyFluxBeginsX}
      y={groundToSkyFluxBeginsY}
      totalHeight={groundToSkyFluxHeight}
      fill={fill}
      direction={UP_STRING}
      flux={flux}
      startAfterInterval={groundToSkyFluxStartsAfterInterval}
    />
  );
};

GroundToSkyFlux.propTypes = {
  flux: PropTypes.number.isRequired,
  fill: PropTypes.string.isRequired,
};

export default GroundToSkyFlux;
