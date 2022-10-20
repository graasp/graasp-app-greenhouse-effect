import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  CLOUD_TO_ATMOSPHERE_FLUX_ROTATION,
  UP_STRING,
} from '../../../../../config/constants';
import { FluxesWavesContext } from '../../../../contexts/fluxes-waves/FluxesWavesProvider';

import Flux from '../flux/Flux';

const CloudToAtmosphereFlux = ({ flux, fill }) => {
  const {
    cloudToAtmosphereFluxBeginsX,
    cloudToAtmosphereFluxBeginsY,
    cloudToAtmosphereFluxHeight,
    cloudToAtmosphereFluxStartsAfterInterval,
  } = useContext(FluxesWavesContext);

  return (
    <Flux
      x={cloudToAtmosphereFluxBeginsX}
      y={cloudToAtmosphereFluxBeginsY}
      totalHeight={cloudToAtmosphereFluxHeight}
      rotation={CLOUD_TO_ATMOSPHERE_FLUX_ROTATION}
      fill={fill}
      direction={UP_STRING}
      flux={flux}
      startAfterInterval={cloudToAtmosphereFluxStartsAfterInterval}
    />
  );
};

CloudToAtmosphereFlux.propTypes = {
  flux: PropTypes.number.isRequired,
  fill: PropTypes.string.isRequired,
};

export default CloudToAtmosphereFlux;
