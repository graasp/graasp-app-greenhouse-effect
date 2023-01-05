import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Group } from 'react-konva';
import CloudToAtmosphereFlux from './CloudToAtmosphereFlux';
import SunToCloudFlux from './SunToCloudFlux';
import CloudToGroundFlux from './CloudToGroundFlux';
import GroundToAtmosphereFlux from './GroundToAtmosphereFlux';
import { SOLAR_FLUXES } from '../../../../../constants';
import { FluxesWavesContext } from '../../../../contexts/fluxes-waves/FluxesWavesProvider';

const SunFluxes = () => {
  const { isMars } = useContext(FluxesWavesContext);
  const { simulationMode, impliedAlbedo, fluxesFills } = useSelector(
    ({ lab }) => lab,
  );
  const {
    sunToCloud,
    cloudToAtmosphere,
    cloudToGround,
    groundToAtmosphere,
  } = fluxesFills;

  const { totalAlbedo, cloudAlbedo } = impliedAlbedo;

  const sunToCloudFlux = SOLAR_FLUXES[simulationMode];
  const cloudToAtmosphereFlux = cloudAlbedo * sunToCloudFlux;
  const cloudToGroundFlux = sunToCloudFlux - cloudToAtmosphereFlux;
  const groundToAtmosphereFlux = sunToCloudFlux * (totalAlbedo - cloudAlbedo);

  return (
    <Group>
      <SunToCloudFlux flux={sunToCloudFlux} fill={sunToCloud} />
      {!isMars && (
        <CloudToAtmosphereFlux
          flux={cloudToAtmosphereFlux}
          fill={cloudToAtmosphere}
        />
      )}
      {!isMars && (
        <CloudToGroundFlux flux={cloudToGroundFlux} fill={cloudToGround} />
      )}
      <GroundToAtmosphereFlux
        flux={groundToAtmosphereFlux}
        fill={groundToAtmosphere}
      />
    </Group>
  );
};

export default SunFluxes;
