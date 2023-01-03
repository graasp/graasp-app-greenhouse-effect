import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { DOWN_STRING } from '../../../../../constants';
import { FluxesWavesContext } from '../../../../contexts/fluxes-waves/FluxesWavesProvider';
import Flux from '../flux/Flux';

const SunToCloudFlux = ({ flux, fill }) => {
  const { sunToCloudFlux } = useContext(FluxesWavesContext);
  const { beginsX, beginsY, height, startsAfterInterval } = sunToCloudFlux;

  return (
    <Flux
      x={beginsX}
      y={beginsY}
      totalHeight={height}
      fill={fill}
      direction={DOWN_STRING}
      flux={flux}
      startAfterInterval={startsAfterInterval}
    />
  );
};

SunToCloudFlux.propTypes = {
  flux: PropTypes.number.isRequired,
  fill: PropTypes.string.isRequired,
};

export default SunToCloudFlux;
