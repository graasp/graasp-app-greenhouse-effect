import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { UP_STRING } from '../../../../../config/constants';
import { FluxesWavesContext } from '../../../../contexts/fluxes-waves/FluxesWavesProvider';
import Flux from '../flux/Flux';

const GroundToSkyFlux = ({ flux, fill }) => {
  const { groundToSkyFlux } = useContext(FluxesWavesContext);
  const { beginsX, beginsY, height, startsAfterInterval } = groundToSkyFlux;

  return (
    <Flux
      x={beginsX}
      y={beginsY}
      totalHeight={height}
      fill={fill}
      direction={UP_STRING}
      flux={flux}
      startAfterInterval={startsAfterInterval}
    />
  );
};

GroundToSkyFlux.propTypes = {
  flux: PropTypes.number.isRequired,
  fill: PropTypes.string.isRequired,
};

export default GroundToSkyFlux;
