import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { DOWN_STRING } from '../../../../../constants';
import { FluxesWavesContext } from '../../../../contexts/fluxes-waves/FluxesWavesProvider';
import Flux from '../flux/Flux';

const CloudToGroundFlux = ({ energy, fill }) => {
  const { cloudToGroundFlux } = useContext(FluxesWavesContext);
  const { beginsX, beginsY, height, startsAfterInterval } = cloudToGroundFlux;

  return (
    <Flux
      x={beginsX}
      y={beginsY}
      totalHeight={height}
      fill={fill}
      direction={DOWN_STRING}
      energy={energy}
      startAfterInterval={startsAfterInterval}
    />
  );
};

CloudToGroundFlux.propTypes = {
  energy: PropTypes.number.isRequired,
  fill: PropTypes.string.isRequired,
};

export default CloudToGroundFlux;
