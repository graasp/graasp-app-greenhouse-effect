import React from 'react';
import { useSelector } from 'react-redux';
import { Rect, Group } from 'react-konva';
import { ATMOSPHERE, SKY, SEA, GROUND } from '../../../config/constants';
import Road from './Road';
import HouseholdRow from './household/HouseholdRow';

const Ground = () => {
  const { height: stageHeight, width: stageWidth } = useSelector(
    ({ layout }) => layout.lab.stageDimensions,
  );

  // ground dimensions in /constants.js are stated as a percentage of canvas dimensions
  const {
    height: groundHeightPercentage,
    width: groundWidthPercentage,
    colorRange: groundColorRange,
  } = GROUND;

  // pixel dimensions of ground
  const groundHeight = stageHeight * groundHeightPercentage;
  const groundWidth = stageWidth * groundWidthPercentage;

  // dimensions of other canvas elements required to position ground
  const { height: atmosphereHeightPercentage } = ATMOSPHERE;
  const { height: skyHeightPercentage } = SKY;
  const { width: seaWidthPercentage } = SEA;
  const atmosphereHeight = stageHeight * atmosphereHeightPercentage;
  const skyHeight = stageHeight * skyHeightPercentage;
  const atmosphereAndSkyHeight = atmosphereHeight + skyHeight;
  const seaWidth = stageWidth * seaWidthPercentage;

  return (
    <Group>
      <Rect
        x={seaWidth}
        y={atmosphereAndSkyHeight}
        height={groundHeight}
        width={groundWidth}
        fillLinearGradientStartPoint={{
          x: 0,
          y: 0,
        }}
        fillLinearGradientEndPoint={{ x: 0, y: groundHeight }}
        fillLinearGradientColorStops={groundColorRange}
      />
      <Road
        groundHeight={groundHeight}
        groundWidth={groundWidth}
        groundBeginsX={seaWidth}
        groundBeginsY={atmosphereAndSkyHeight}
      />
      <HouseholdRow
        groundHeight={groundHeight}
        groundWidth={groundWidth}
        groundBeginsX={seaWidth}
        groundBeginsY={atmosphereAndSkyHeight}
      />
    </Group>
  );
};

export default Ground;
