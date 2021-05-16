import React from 'react';
import { Group } from 'react-konva';
import Atmosphere from './Atmosphere';
import Ground from './Ground';
import Sea from './Sea';
import Sky from './Sky';

const CanvasLayout = () => {
  return (
    <Group>
      <Atmosphere />
      <Sky />
      <Sea />
      <Ground />
    </Group>
  );
};

export default CanvasLayout;
