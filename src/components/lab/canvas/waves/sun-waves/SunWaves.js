import React, { useContext } from 'react';
import { Group } from 'react-konva';
import { FluxesWavesContext } from '../../../../contexts/fluxes-waves/FluxesWavesProvider';
import CloudToAtmosphereWave from './CloudToAtmosphereWave';
import CloudToGroundWave from './CloudToGroundWave';
import GroundToAtmosphereWave from './GroundToAtmosphereWave';
import SunToCloudWave from './SunToCloudWave';

const SunWaves = () => {
  const { isMars } = useContext(FluxesWavesContext);

  return (
    <Group>
      <SunToCloudWave />
      {!isMars && <CloudToGroundWave />}
      {!isMars && <CloudToAtmosphereWave />}
      <GroundToAtmosphereWave />
    </Group>
  );
};

export default SunWaves;
