import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  CLOUD_TO_ATMOSPHERE_FLUX_ROTATION,
  UP_STRING,
} from '../../../../../constants';
import { FluxesWavesContext } from '../../../../contexts/fluxes-waves/FluxesWavesProvider';

import Flux from '../flux/Flux';

const CloudToAtmosphereFlux = ({ energy, fill }) => {
  const { cloudToAtmosphereFlux } = useContext(FluxesWavesContext);
  const {
    beginsX,
    beginsY,
    height,
    startsAfterInterval,
  } = cloudToAtmosphereFlux;

  return (
    <Flux
      x={beginsX}
      y={beginsY}
      totalHeight={height}
      rotation={CLOUD_TO_ATMOSPHERE_FLUX_ROTATION}
      fill={fill}
      direction={UP_STRING}
      energy={energy}
      startAfterInterval={startsAfterInterval}
    />
  );
};

CloudToAtmosphereFlux.propTypes = {
  energy: PropTypes.number.isRequired,
  fill: PropTypes.string.isRequired,
};

export default CloudToAtmosphereFlux;
