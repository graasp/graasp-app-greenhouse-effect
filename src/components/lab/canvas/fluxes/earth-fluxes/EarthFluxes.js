import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Group } from 'react-konva';
import GroundToSkyFlux from './GroundToSkyFlux';
import SkyToAtmosphereFlux from './SkyToAtmosphereFlux';
import SkyToGroundFlux from './SkyToGroundFlux';
import { FluxesWavesContext } from '../../../../contexts/fluxes-waves/FluxesWavesProvider';

const EarthFluxes = ({ earthEnergies }) => {
  const { isMars } = useContext(FluxesWavesContext);
  const { fluxesFills } = useSelector(({ lab }) => lab);
  const { groundToSky, skyToAtmosphere, skyToGround } = fluxesFills;

  const {
    groundToSky: groundToSkyEnergy,
    skyToGround: skyToGroundEnergy,
    skyToAtmosphere: skyToAtmosphereEnergy,
  } = earthEnergies;

  return (
    <Group>
      <GroundToSkyFlux energy={groundToSkyEnergy} fill={groundToSky} />
      {!isMars && (
        <SkyToGroundFlux energy={skyToGroundEnergy} fill={skyToGround} />
      )}
      {!isMars && (
        <SkyToAtmosphereFlux
          energy={skyToAtmosphereEnergy}
          fill={skyToAtmosphere}
        />
      )}
    </Group>
  );
};

EarthFluxes.propTypes = {
  earthEnergies: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default EarthFluxes;
