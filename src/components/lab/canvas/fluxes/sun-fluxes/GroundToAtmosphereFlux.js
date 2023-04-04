import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Flux from '../flux/Flux';
import { FluxesWavesContext } from '../../../../contexts/fluxes-waves/FluxesWavesProvider';
import {
  GROUND_TO_ATMOSPHERE_FLUX_ROTATION,
  UP_STRING,
} from '../../../../../constants';

const GroundToAtmosphereFlux = ({ energy, fill }) => {
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
      energy={energy}
      startAfterInterval={startsAfterInterval}
    />
  );
};

GroundToAtmosphereFlux.propTypes = {
  energy: PropTypes.number.isRequired,
  fill: PropTypes.string.isRequired,
};

export default GroundToAtmosphereFlux;
