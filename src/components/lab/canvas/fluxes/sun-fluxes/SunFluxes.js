import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Group } from 'react-konva';
import CloudToAtmosphereFlux from './CloudToAtmosphereFlux';
import SunToCloudFlux from './SunToCloudFlux';
import CloudToGroundFlux from './CloudToGroundFlux';
import GroundToAtmosphereFlux from './GroundToAtmosphereFlux';
import { FluxesWavesContext } from '../../../../contexts/fluxes-waves/FluxesWavesProvider';
import { computeSunEnergies } from '../../../../../utils';

const SunFluxes = () => {
  const { isMars } = useContext(FluxesWavesContext);
  const { simulationMode, sliders, fluxesFills } = useSelector(
    ({ lab }) => lab,
  );
  const {
    sunToCloud,
    cloudToAtmosphere,
    cloudToGround,
    groundToAtmosphere,
  } = fluxesFills;
  const { albedo: impliedAlbedo } = sliders;
  const { totalAlbedo, cloudAlbedo } = impliedAlbedo;

  const {
    sunToCloud: sunToCloudEnergy,
    cloudToAtmosphere: cloudToAtmosphereEnergy,
    cloudToGround: cloudToGroundEnergy,
    groundToAtmosphere: groundToAtmosphereEnergy,
  } = computeSunEnergies(cloudAlbedo, totalAlbedo, simulationMode);

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

export default SunFluxes;
