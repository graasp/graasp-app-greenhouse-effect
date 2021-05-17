import React from 'react';
import { useSelector } from 'react-redux';
import { Rect } from 'react-konva';
import { ATMOSPHERE, SKY } from '../../../config/constants';

const Sky = () => {
  const { height: stageHeight, width: stageWidth } = useSelector(
    ({ layout }) => layout.lab.stageDimensions,
  );

  // sky dimensions in /constants.js are stated as a percentage of canvas dimensions
  const {
    height: skyHeightPercentage,
    width: skyWidthPercentage,
    colorRange: skyColorRange,
  } = SKY;

  // pixel dimensions of sky
  const skyHeight = stageHeight * skyHeightPercentage;
  const skyWidth = stageWidth * skyWidthPercentage;

  // atmosphere height is required to begin the sky where the atmosphere ends
  const { height: atmosphereHeightPercentage } = ATMOSPHERE;
  const atmosphereHeight = stageHeight * atmosphereHeightPercentage;

  return (
    <Rect
      x={0}
      y={atmosphereHeight}
      height={skyHeight}
      width={skyWidth}
      fillLinearGradientStartPoint={{ x: 0, y: 0 }}
      fillLinearGradientEndPoint={{ x: 0, y: skyHeight }}
      fillLinearGradientColorStops={skyColorRange}
    />
  );
};

export default Sky;
