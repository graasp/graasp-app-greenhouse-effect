import React from 'react';
import { Group } from 'react-konva';
import CloudToAtmosphereWave from './CloudToAtmosphereWave';
import CloudToGroundWave from './CloudToGroundWave';
import GroundToAtmosphereWave from './GroundToAtmosphereWave';
import SunToCloudWave from './SunToCloudWave';

const SunWaves = () => {
  return (
    <Group>
      <SunToCloudWave />
      <CloudToGroundWave />
      <CloudToAtmosphereWave />
      <GroundToAtmosphereWave />
    </Group>
  );
};

export default SunWaves;
