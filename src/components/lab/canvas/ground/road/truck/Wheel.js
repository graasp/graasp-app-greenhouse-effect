import React from 'react';
import PropTypes from 'prop-types';
import { Group, Circle } from 'react-konva';
import { WHEEL_RIM_FILL, WHEEL_TIRE_FILL } from '../../../../../../constants';

const Wheel = ({ wheelCenterX, wheelCenterY, wheelRadius }) => {
  return (
    <Group>
      <Circle
        x={wheelCenterX}
        y={wheelCenterY}
        radius={wheelRadius}
        fill={WHEEL_TIRE_FILL}
      />
      <Circle
        x={wheelCenterX}
        y={wheelCenterY}
        radius={wheelRadius / 2}
        fill={WHEEL_RIM_FILL}
      />
    </Group>
  );
};

Wheel.propTypes = {
  wheelCenterX: PropTypes.number.isRequired,
  wheelCenterY: PropTypes.number.isRequired,
  wheelRadius: PropTypes.number.isRequired,
};

export default Wheel;
