import React, { useContext } from 'react';
import { Rect } from 'react-konva';
import { ATMOSPHERE } from '../../../../constants';
import { AtmosphereDimensionsContext } from '../../../contexts/canvas-dimensions/AtmosphereDimensionsProvider';

const AtmosphereBackground = () => {
  const {
    atmosphereBeginsX,
    atmosphereBeginsY,
    atmosphereHeight,
    atmosphereWidth,
  } = useContext(AtmosphereDimensionsContext);
  const { colorRange: atmosphereColorRange } = ATMOSPHERE;

  return (
    <Rect
      x={atmosphereBeginsX}
      y={atmosphereBeginsY}
      height={atmosphereHeight}
      width={atmosphereWidth}
      fillLinearGradientStartPoint={{ x: 0, y: 0 }}
      fillLinearGradientEndPoint={{
        x: 0,
        y: atmosphereHeight,
      }}
      fillLinearGradientColorStops={atmosphereColorRange}
    />
  );
};

export default AtmosphereBackground;
