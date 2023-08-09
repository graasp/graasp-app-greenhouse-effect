import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Flux from './flux/Flux';
import {
  DOWN_STRING,
  NET_FLUX_FILL,
  NET_FLUX_FIXED_HEIGHT,
  UP_STRING,
} from '../../../../constants';
import { FluxesWavesContext } from '../../../contexts/fluxes-waves/FluxesWavesProvider';

const NetFlux = ({ sunEnergies, earthEnergies }) => {
  const { netFlux } = useContext(FluxesWavesContext);
  const { beginsX, beginsY, startsAfterInterval } = netFlux;
  const { skyToAtmosphere } = earthEnergies;
  const { sunToCloud, cloudToAtmosphere, groundToAtmosphere } = sunEnergies;

  const netEnergy = Math.round(
    sunToCloud - (cloudToAtmosphere + groundToAtmosphere + skyToAtmosphere),
  );

  return (
    <Flux
      x={beginsX}
      y={beginsY}
      totalHeight={NET_FLUX_FIXED_HEIGHT}
      fill={NET_FLUX_FILL}
      direction={netEnergy < 0 ? UP_STRING : DOWN_STRING}
      energy={netEnergy}
      startsAfterInterval={startsAfterInterval.flux}
      animateFlux={false}
      netFlux
    />
  );
};

NetFlux.propTypes = {
  sunEnergies: PropTypes.objectOf(PropTypes.number).isRequired,
  earthEnergies: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default NetFlux;
