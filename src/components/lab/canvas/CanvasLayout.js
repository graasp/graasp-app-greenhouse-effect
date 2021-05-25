import React from 'react';
import { useSelector } from 'react-redux';
import { Group } from 'react-konva';
import Atmosphere from './Atmosphere';
import Ground from './Ground';
import Sea from './Sea';
import Sky from './Sky';

const CanvasLayout = () => {
  const { height: stageHeight, width: stageWidth } = useSelector(
    ({ layout }) => layout.lab.stageDimensions,
  );

  return (
    <Group>
      <Atmosphere stageHeight={stageHeight} stageWidth={stageWidth} />
      <Sky stageHeight={stageHeight} stageWidth={stageWidth} />
      <Sea stageHeight={stageHeight} stageWidth={stageWidth} />
      <Ground stageHeight={stageHeight} stageWidth={stageWidth} />
    </Group>
  );
};

export default CanvasLayout;
