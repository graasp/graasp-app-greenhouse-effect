import React from 'react';
import { Group } from 'react-konva';
import EarthWaves from './earth-waves/EarthWaves';
import SunWaves from './sun-waves/SunWaves';

const Waves = () => {
  return (
    <Group>
      <SunWaves />
      <EarthWaves />
    </Group>
  );
};

export default Waves;
