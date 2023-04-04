import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { UP_STRING } from '../../../../../constants';
import { FluxesWavesContext } from '../../../../contexts/fluxes-waves/FluxesWavesProvider';
import Flux from '../flux/Flux';

const GroundToSkyFlux = ({ energy, fill }) => {
  const { groundToSkyFlux } = useContext(FluxesWavesContext);
  const { beginsX, beginsY, height, startsAfterInterval } = groundToSkyFlux;

  return (
    <Flux
      x={beginsX}
      y={beginsY}
      totalHeight={height}
      fill={fill}
      direction={UP_STRING}
      energy={energy}
      startAfterInterval={startsAfterInterval}
    />
  );
};

GroundToSkyFlux.propTypes = {
  energy: PropTypes.number.isRequired,
  fill: PropTypes.string.isRequired,
};

export default GroundToSkyFlux;
