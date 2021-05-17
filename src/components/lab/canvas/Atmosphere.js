import React from 'react';
import { useSelector } from 'react-redux';
import { Group, Rect } from 'react-konva';
import { ATMOSPHERE } from '../../../config/constants';
import Sun from './Sun';

const Atmosphere = () => {
  const { height: stageHeight, width: stageWidth } = useSelector(
    ({ layout }) => layout.lab.stageDimensions,
  );

  // atmosphere dimensions in /constants.js are stated as a percentage of canvas dimensions
  const {
    height: atmosphereHeightPercentage,
    width: atmosphereWidthPercentage,
    colorRange: atmosphereColorRange,
  } = ATMOSPHERE;

  // pixel dimensions of atmosphere
  const atmosphereHeight = stageHeight * atmosphereHeightPercentage;
  const atmosphereWidth = stageWidth * atmosphereWidthPercentage;

  // y center of atmosphere is extracted to position the sun
  const atmosphereCenterY = atmosphereHeight / 2;

  return (
    <Group>
      <Rect
        x={0}
        y={0}
        height={atmosphereHeight}
        width={atmosphereWidth}
        fillLinearGradientStartPoint={{ x: 0, y: 0 }}
        fillLinearGradientEndPoint={{
          x: 0,
          y: atmosphereHeight,
        }}
        fillLinearGradientColorStops={atmosphereColorRange}
      />
      <Sun
        atmosphereWidth={atmosphereWidth}
        atmosphereHeight={atmosphereHeight}
        atmosphereCenterY={atmosphereCenterY}
      />
    </Group>
  );
};

export default Atmosphere;
