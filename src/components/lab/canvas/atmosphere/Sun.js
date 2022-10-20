import React, { useContext } from 'react';
import { Group, Circle, Star } from 'react-konva';
import {
  SUN_FILL,
  SUN_RAYS_NUMBER_OF_RAYS,
  SUN_BORDER_COLOR,
  SUN_BORDER,
} from '../../../../config/constants';
import { AtmosphereDimensionsContext } from '../../../contexts/canvas-dimensions/AtmosphereDimensionsProvider';

const Sun = () => {
  const {
    sunRaysOuterRadius,
    sunRaysInnerRadius,
    sunRadius,
    sunCenterX,
    sunCenterY,
  } = useContext(AtmosphereDimensionsContext);

  return (
    <Group x={sunCenterX} y={sunCenterY}>
      <Star
        x={0}
        y={0}
        numPoints={SUN_RAYS_NUMBER_OF_RAYS}
        fill={SUN_FILL}
        innerRadius={sunRaysInnerRadius}
        outerRadius={sunRaysOuterRadius}
      />
      <Circle
        x={0}
        y={0}
        radius={sunRadius}
        fill={SUN_FILL}
        strokeWidth={SUN_BORDER}
        stroke={SUN_BORDER_COLOR}
      />
    </Group>
  );
};

export default Sun;
