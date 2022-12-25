import React, { useContext } from 'react';
import { Group } from 'react-konva';
import GroundToSkyWave from './GroundToSkyWave';
import SkyToAtmosphereWave from './SkyToAtmosphereWave';
import SkyToGroundWave from './SkyToGroundWave';
import { FluxesWavesContext } from '../../../../contexts/fluxes-waves/FluxesWavesProvider';

const EarthWaves = () => {
  const { isMars } = useContext(FluxesWavesContext);

  return (
    <Group>
      <GroundToSkyWave />
      {!isMars && <SkyToAtmosphereWave />}
      {!isMars && <SkyToGroundWave />}
    </Group>
  );
};

export default EarthWaves;
