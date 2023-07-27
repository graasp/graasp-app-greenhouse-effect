import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  DOWN_STRING,
  SKY_TO_GROUND_FLUX_ROTATION,
} from '../../../../../constants';
import { FluxesWavesContext } from '../../../../contexts/fluxes-waves/FluxesWavesProvider';
import Flux from '../flux/Flux';

const SkyToGroundFlux = ({ energy, fill }) => {
  const { skyToGround } = useContext(FluxesWavesContext);
  const { beginsX, beginsY, height, startsAfterInterval } = skyToGround;

  return (
    <Flux
      x={beginsX}
      y={beginsY}
      totalHeight={height}
      rotation={SKY_TO_GROUND_FLUX_ROTATION}
      fill={fill}
      direction={DOWN_STRING}
      energy={energy}
      startAfterInterval={startsAfterInterval.flux}
    />
  );
};

SkyToGroundFlux.propTypes = {
  energy: PropTypes.number.isRequired,
  fill: PropTypes.string.isRequired,
};

export default SkyToGroundFlux;
