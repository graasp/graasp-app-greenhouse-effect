import React, { useContext } from 'react';
import { Group } from 'react-konva';
import { useSelector } from 'react-redux';
import { computeSunEnergies } from '../../../../../utils';
import { FluxesWavesContext } from '../../../../contexts/fluxes-waves/FluxesWavesProvider';
import CloudToAtmosphereWave from './CloudToAtmosphereWave';
import CloudToGroundWave from './CloudToGroundWave';
import GroundToAtmosphereWave from './GroundToAtmosphereWave';
import SunToCloudWave from './SunToCloudWave';

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

  return (
    <Group>
      <SunToCloudWave energy={sunToCloud} />
      {!isMars && <CloudToGroundWave energy={cloudToGround} />}
      {!isMars && <CloudToAtmosphereWave energy={cloudToAtmosphere} />}
      <GroundToAtmosphereWave energy={groundToAtmosphere} />
    </Group>
  );
};

export default SunWaves;
