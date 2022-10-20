import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { DOWN_STRING } from '../../../../../config/constants';
import { FluxesWavesContext } from '../../../../contexts/fluxes-waves/FluxesWavesProvider';
import Flux from '../flux/Flux';

const CloudToGroundFlux = ({ flux, fill }) => {
  const {
    cloudToGroundFluxBeginsX,
    cloudToGroundFluxBeginsY,
    cloudToGroundFluxHeight,
    cloudToGroundFluxStartsAfterInterval,
  } = useContext(FluxesWavesContext);

  return (
    <Flux
      x={cloudToGroundFluxBeginsX}
      y={cloudToGroundFluxBeginsY}
      totalHeight={cloudToGroundFluxHeight}
      fill={fill}
      direction={DOWN_STRING}
      flux={flux}
      startAfterInterval={cloudToGroundFluxStartsAfterInterval}
    />
  );
};

CloudToGroundFlux.propTypes = {
  flux: PropTypes.number.isRequired,
  fill: PropTypes.string.isRequired,
};

export default CloudToGroundFlux;
