import React from 'react';
import { useSelector } from 'react-redux';
import { Rect, Group } from 'react-konva';
import { ATMOSPHERE, SKY, SEA } from '../../../config/constants';
import IceCaps from './IceCaps';

const Sea = () => {
  const { height: stageHeight, width: stageWidth } = useSelector(
    ({ layout }) => layout.lab.stageDimensions,
  );

  // sea dimensions in /constants.js are stated as a percentage of canvas dimensions
  const {
    height: seaHeightPercentage,
    width: seaWidthPercentage,
    colorRange: seaColorRange,
  } = SEA;

  // pixel dimensions of sea
  const seaWidth = stageWidth * seaWidthPercentage;
  const seaHeight = stageHeight * seaHeightPercentage;

  // dimensions of atmosphere and sky required to position sea
  const { height: atmosphereHeightPercentage } = ATMOSPHERE;
  const { height: skyHeightPercentage } = SKY;
  const atmosphereHeight = stageHeight * atmosphereHeightPercentage;
  const skyHeight = stageHeight * skyHeightPercentage;
  const atmosphereAndSkyHeight = atmosphereHeight + skyHeight;

  return (
    <Group>
      <Rect
        x={0}
        y={atmosphereAndSkyHeight}
        height={seaHeight}
        width={seaWidth}
        fillLinearGradientStartPoint={{ x: 0, y: 0 }}
        fillLinearGradientEndPoint={{
          x: 0,
          y: seaHeight,
        }}
        fillLinearGradientColorStops={seaColorRange}
      />
      <IceCaps
        seaHeight={seaHeight}
        seaWidth={seaWidth}
        seaBeginsY={atmosphereAndSkyHeight}
      />
    </Group>
  );
};

export default Sea;
