import React from 'react';
import PropTypes from 'prop-types';
import { Group, Circle, Star } from 'react-konva';
import {
  SUN_RAYS_RADIUS,
  SUN_RADIUS,
  SUN_CENTER_X,
  SUN_FILL,
  SUN_RAYS_NUMBER_OF_RAYS,
  SUN_BORDER_COLOR,
  SUN_BORDER,
} from '../../../config/constants';

const Sun = ({ atmosphereHeight, atmosphereWidth, atmosphereCenterY }) => {
  const sunRaysOuterRadius = atmosphereHeight * SUN_RAYS_RADIUS;
  const sunRaysInnerRadius = sunRaysOuterRadius / 2;
  const sunRadius = atmosphereHeight * SUN_RADIUS;

  return (
    <Group x={atmosphereWidth * SUN_CENTER_X} y={atmosphereCenterY}>
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

Sun.propTypes = {
  atmosphereHeight: PropTypes.number.isRequired,
  atmosphereWidth: PropTypes.number.isRequired,
  atmosphereCenterY: PropTypes.number.isRequired,
};

export default Sun;
