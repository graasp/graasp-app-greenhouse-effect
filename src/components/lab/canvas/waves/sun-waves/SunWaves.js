import React, { useContext } from 'react';
import { Group } from 'react-konva';
import { useSelector } from 'react-redux';
import { computeSunEnergies } from '../../../../../utils';
import { FluxesWavesContext } from '../../../../contexts/fluxes-waves/FluxesWavesProvider';
import CloudToAtmosphereWave from './CloudToAtmosphereWave';
import CloudToGroundWave from './CloudToGroundWave';
import GroundToAtmosphereWave from './GroundToAtmosphereWave';
import SunToCloudWave from './SunToCloudWave';
import { INITIAL_ALBEDO } from '../../../../../constants';

const SunWaves = () => {
  const { isMars } = useContext(FluxesWavesContext);
  const { sliders, simulationMode } = useSelector(({ lab }) => lab);
  const { albedo } = sliders;
  const { totalAlbedo, cloudAlbedo } = albedo;

  const {
    sunToCloud,
    cloudToAtmosphere,
    cloudToGround,
    groundToAtmosphere,
  } = computeSunEnergies(cloudAlbedo, totalAlbedo, simulationMode);

  const {
    sunToCloud: sunToCloudInitial,
    cloudToAtmosphere: cloudToAtmosphereInitial,
    cloudToGround: cloudToGroundInitial,
    groundToAtmosphere: groundToAtmosphereInitial,
  } = computeSunEnergies(
    INITIAL_ALBEDO.cloudAlbedo,
    INITIAL_ALBEDO.totalAlbedo,
    simulationMode,
  );

  return (
    <Group>
      <SunToCloudWave energy={sunToCloud} initial={sunToCloudInitial} />
      {!isMars && (
        <CloudToGroundWave
          energy={cloudToGround}
          initial={cloudToGroundInitial}
        />
      )}
      {!isMars && (
        <CloudToAtmosphereWave
          energy={cloudToAtmosphere}
          initial={cloudToAtmosphereInitial}
        />
      )}
      <GroundToAtmosphereWave
        energy={groundToAtmosphere}
        initial={groundToAtmosphereInitial}
      />
    </Group>
  );
};

export default SunWaves;
