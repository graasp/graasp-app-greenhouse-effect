import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Group } from 'react-konva';
import CloudToAtmosphereFlux from './CloudToAtmosphereFlux';
import SunToCloudFlux from './SunToCloudFlux';
import CloudToGroundFlux from './CloudToGroundFlux';
import GroundToAtmosphereFlux from './GroundToAtmosphereFlux';
import { FluxesWavesContext } from '../../../../contexts/fluxes-waves/FluxesWavesProvider';

const SunFluxes = ({ sunEnergies }) => {
  const { isMars } = useContext(FluxesWavesContext);
  const { fluxesFills } = useSelector(({ lab }) => lab);
  const {
    sunToCloud,
    cloudToAtmosphere,
    cloudToGround,
    groundToAtmosphere,
  } = fluxesFills;

  const {
    sunToCloud: sunToCloudEnergy,
    cloudToAtmosphere: cloudToAtmosphereEnergy,
    cloudToGround: cloudToGroundEnergy,
    groundToAtmosphere: groundToAtmosphereEnergy,
  } = sunEnergies;

  return (
    <Group>
      <SunToCloudFlux energy={sunToCloudEnergy} fill={sunToCloud} />
      {!isMars && (
        <CloudToAtmosphereFlux
          energy={cloudToAtmosphereEnergy}
          fill={cloudToAtmosphere}
        />
      )}
      {!isMars && (
        <CloudToGroundFlux energy={cloudToGroundEnergy} fill={cloudToGround} />
      )}
      <GroundToAtmosphereFlux
        energy={groundToAtmosphereEnergy}
        fill={groundToAtmosphere}
      />
    </Group>
  );
};

SunFluxes.propTypes = {
  sunEnergies: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default SunFluxes;
