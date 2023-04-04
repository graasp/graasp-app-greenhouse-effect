import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  SKY_TO_ATMOSPHERE_FLUX_ROTATION,
  UP_STRING,
} from '../../../../../constants';
import { FluxesWavesContext } from '../../../../contexts/fluxes-waves/FluxesWavesProvider';
import Flux from '../flux/Flux';

const SkyToAtmosphereFlux = ({ energy, fill }) => {
  const { skyToAtmosphereFlux } = useContext(FluxesWavesContext);
  const { beginsX, beginsY, height, startsAfterInterval } = skyToAtmosphereFlux;

  return (
    <Flux
      x={beginsX}
      y={beginsY}
      totalHeight={height}
      rotation={SKY_TO_ATMOSPHERE_FLUX_ROTATION}
      fill={fill}
      direction={UP_STRING}
      energy={energy}
      startAfterInterval={startsAfterInterval}
    />
  );
};

SkyToAtmosphereFlux.propTypes = {
  energy: PropTypes.number.isRequired,
  fill: PropTypes.string.isRequired,
};

export default SkyToAtmosphereFlux;
