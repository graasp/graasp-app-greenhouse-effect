import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Flux from '../flux/Flux';
import { FluxesWavesContext } from '../../../../contexts/fluxes-waves/FluxesWavesProvider';
import {
  GROUND_TO_ATMOSPHERE_FLUX_ROTATION,
  UP_STRING,
} from '../../../../../config/constants';

const GroundToAtmosphereFlux = ({ flux, fill }) => {
  const { groundToAtmosphereFlux } = useContext(FluxesWavesContext);
  const {
    beginsX,
    beginsY,
    height,
    startsAfterInterval,
  } = groundToAtmosphereFlux;

  return (
    <Flux
      x={beginsX}
      y={beginsY}
      totalHeight={height}
      rotation={GROUND_TO_ATMOSPHERE_FLUX_ROTATION}
      fill={fill}
      direction={UP_STRING}
      flux={flux}
      startAfterInterval={startsAfterInterval}
    />
  );
};

GroundToAtmosphereFlux.propTypes = {
  flux: PropTypes.number.isRequired,
  fill: PropTypes.string.isRequired,
};

export default GroundToAtmosphereFlux;
