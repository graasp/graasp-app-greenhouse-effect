import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { DOWN_STRING } from '../../../../../config/constants';
import { FluxesWavesContext } from '../../../../contexts/fluxes-waves/FluxesWavesProvider';
import Flux from '../flux/Flux';

const SunToCloudFlux = ({ flux, fill }) => {
  const {
    sunToCloudFluxBeginsX,
    sunToCloudFluxBeginsY,
    sunToCloudFluxHeight,
    sunToCloudFluxStartsAfterInterval,
  } = useContext(FluxesWavesContext);

  return (
    <Flux
      x={sunToCloudFluxBeginsX}
      y={sunToCloudFluxBeginsY}
      totalHeight={sunToCloudFluxHeight}
      fill={fill}
      direction={DOWN_STRING}
      flux={flux}
      startAfterInterval={sunToCloudFluxStartsAfterInterval}
    />
  );
};

SunToCloudFlux.propTypes = {
  flux: PropTypes.number.isRequired,
  fill: PropTypes.string.isRequired,
};

export default SunToCloudFlux;
