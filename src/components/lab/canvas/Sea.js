import React from 'react';
import { useSelector } from 'react-redux';
import { Rect } from 'react-konva';
import { ATMOSPHERE, SKY, SEA } from '../../../config/constants';

const Sea = () => {
  const { height: stageHeight, width: stageWidth } = useSelector(
    ({ layout }) => layout.lab.stageDimensions,
  );
  const { height: atmosphereHeight } = ATMOSPHERE;
  const { height: skyHeight } = SKY;
  const { height: seaHeight, width: seaWidth, colorRange: seaColorRange } = SEA;

  return (
    <Rect
      x={0}
      y={stageHeight * (atmosphereHeight + skyHeight)}
      height={stageHeight * seaHeight}
      width={stageWidth * seaWidth}
      fillLinearGradientStartPoint={{ x: 0, y: 0 }}
      fillLinearGradientEndPoint={{
        x: 0,
        y: stageHeight * seaHeight,
      }}
      fillLinearGradientColorStops={seaColorRange}
    />
  );
};

export default Sea;
