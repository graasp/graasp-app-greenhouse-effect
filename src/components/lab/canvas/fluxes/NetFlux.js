import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
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
  const { thermometer, sliders } = useSelector(({ lab }) => lab);
  const { temperature: thermoTemp } = thermometer;
  const { temperature: impliedTemp } = sliders;
  const { netFlux } = useContext(FluxesWavesContext);
  const { beginsX, beginsY, startsAfterInterval } = netFlux;
  const { skyToAtmosphere: skyToAtmosphereCurrent } = earthEnergies;
  const { sunToCloud, cloudToAtmosphere, groundToAtmosphere } = sunEnergies;

  // this re-assignment handles edge cases having to do with 'overshooting' due to flux rounding
  // e.g. in 2020 equilibrium, move cloudCover from 0.45 to 0.46 then to 0.47 w/skyToAtmosphereCurrent rather than logic below
  // in the move between 0.46 to 0.47, on its way from -1 to 0 the Net Flux will briefly show +1, which we don't want
  let skyToAtmosphere;
  const skyToAtmosphereFinal =
    sunToCloud - (cloudToAtmosphere + groundToAtmosphere);
  if (impliedTemp < thermoTemp) {
    skyToAtmosphere = Math.max(skyToAtmosphereCurrent, skyToAtmosphereFinal);
  } else if (impliedTemp > thermoTemp) {
    skyToAtmosphere = Math.min(skyToAtmosphereCurrent, skyToAtmosphereFinal);
  }

  const netEnergy =
    sunToCloud - (cloudToAtmosphere + groundToAtmosphere + skyToAtmosphere);

  return (
    <Flux
      x={beginsX}
      y={beginsY}
      totalHeight={NET_FLUX_FIXED_HEIGHT}
      fill={NET_FLUX_FILL}
      direction={thermoTemp > impliedTemp ? UP_STRING : DOWN_STRING}
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
