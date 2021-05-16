import React from 'react';
import { useSelector } from 'react-redux';
import { Rect } from 'react-konva';
import { ATMOSPHERE } from '../../../config/constants';

const Atmosphere = () => {
  const { height: stageHeight, width: stageWidth } = useSelector(
    ({ layout }) => layout.lab.stageDimensions,
  );
  const {
    height: atmosphereHeight,
    width: atmosphereWidth,
    colorRange: atmosphereColorRange,
  } = ATMOSPHERE;

  return (
    <Rect
      x={0}
      y={0}
      height={stageHeight * atmosphereHeight}
      width={stageWidth * atmosphereWidth}
      fillLinearGradientStartPoint={{ x: 0, y: 0 }}
      fillLinearGradientEndPoint={{
        x: 0,
        y: stageHeight * atmosphereHeight,
      }}
      fillLinearGradientColorStops={atmosphereColorRange}
    />
  );
};

export default Atmosphere;
