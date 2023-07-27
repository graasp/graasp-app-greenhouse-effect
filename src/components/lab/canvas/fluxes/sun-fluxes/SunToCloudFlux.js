import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { DOWN_STRING } from '../../../../../constants';
import { FluxesWavesContext } from '../../../../contexts/fluxes-waves/FluxesWavesProvider';
import Flux from '../flux/Flux';

const SunToCloudFlux = ({ energy, fill }) => {
  const { sunToCloud } = useContext(FluxesWavesContext);
  const { beginsX, beginsY, height, startsAfterInterval } = sunToCloud;

  return (
    <Flux
      x={beginsX}
      y={beginsY}
      totalHeight={height}
      fill={fill}
      direction={DOWN_STRING}
      energy={energy}
      startAfterInterval={startsAfterInterval.flux}
    />
  );
};

SunToCloudFlux.propTypes = {
  energy: PropTypes.number.isRequired,
  fill: PropTypes.string.isRequired,
};

export default SunToCloudFlux;
