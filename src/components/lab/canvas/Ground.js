import React from 'react';
import { useSelector } from 'react-redux';
import { Rect } from 'react-konva';
import { ATMOSPHERE, SKY, SEA, GROUND } from '../../../config/constants';

const Ground = () => {
  const { height: stageHeight, width: stageWidth } = useSelector(
    ({ layout }) => layout.lab.stageDimensions,
  );
  const { height: atmosphereHeight } = ATMOSPHERE;
  const { height: skyHeight } = SKY;
  const { width: seaWidth } = SEA;
  const {
    height: groundHeight,
    width: groundWidth,
    colorRange: groundColorRange,
  } = GROUND;

  return (
    <Rect
      x={stageWidth * seaWidth}
      y={stageHeight * (atmosphereHeight + skyHeight)}
      height={stageHeight * groundHeight}
      width={stageWidth * groundWidth}
      fillLinearGradientStartPoint={{
        x: 0,
        y: 0,
      }}
      fillLinearGradientEndPoint={{ x: 0, y: stageHeight * groundHeight }}
      fillLinearGradientColorStops={groundColorRange}
    />
  );
};

export default Ground;
