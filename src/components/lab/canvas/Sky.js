import React from 'react';
import { useSelector } from 'react-redux';
import { Rect } from 'react-konva';
import { ATMOSPHERE, SKY } from '../../../config/constants';

const Sky = () => {
  const { height: stageHeight, width: stageWidth } = useSelector(
    ({ layout }) => layout.lab.stageDimensions,
  );

  const { height: atmosphereHeight } = ATMOSPHERE;
  const { height: skyHeight, width: skyWidth, colorRange: skyColorRange } = SKY;

  return (
    <Rect
      x={0}
      y={stageHeight * atmosphereHeight}
      width={stageWidth * skyWidth}
      height={stageHeight * skyHeight}
      fillLinearGradientStartPoint={{ x: 0, y: 0 }}
      fillLinearGradientEndPoint={{ x: 0, y: stageHeight * skyHeight }}
      fillLinearGradientColorStops={skyColorRange}
    />
  );
};

export default Sky;
