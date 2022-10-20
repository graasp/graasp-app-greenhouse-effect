import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  DOWN_STRING,
  SKY_TO_GROUND_FLUX_ROTATION,
} from '../../../../../config/constants';
import { FluxesWavesContext } from '../../../../contexts/fluxes-waves/FluxesWavesProvider';
import Flux from '../flux/Flux';

const SkyToGroundFlux = ({ flux, fill }) => {
  const {
    skyToGroundFluxBeginsX,
    skyToGroundFluxBeginsY,
    skyToGroundFluxHeight,
    skyToGroundFluxStartsAfterInterval,
  } = useContext(FluxesWavesContext);

  return (
    <Flux
      x={skyToGroundFluxBeginsX}
      y={skyToGroundFluxBeginsY}
      totalHeight={skyToGroundFluxHeight}
      rotation={SKY_TO_GROUND_FLUX_ROTATION}
      fill={fill}
      direction={DOWN_STRING}
      flux={flux}
      startAfterInterval={skyToGroundFluxStartsAfterInterval}
    />
  );
};

SkyToGroundFlux.propTypes = {
  flux: PropTypes.number.isRequired,
  fill: PropTypes.string.isRequired,
};

export default SkyToGroundFlux;
