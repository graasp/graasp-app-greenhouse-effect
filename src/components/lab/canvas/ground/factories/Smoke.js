import React from 'react';
import PropTypes from 'prop-types';
import { Group, Circle } from 'react-konva';
import { generateSmokeCirclePoints } from '../../../../../utils/canvas';
import {
  SMOKE_CIRCLE_RADIUS,
  SMOKE_FILL,
} from '../../../../../config/constants';

const Smoke = ({ chimneyWidth, chimneyHeight, chimneyX, chimneyY }) => {
  // SMOKE_CIRCLE_RADIUS can be increased if we want factories to emit more pollution
  const smokeCircleRadius = SMOKE_CIRCLE_RADIUS * chimneyWidth;

  return (
    <Group>
      {generateSmokeCirclePoints(
        chimneyX,
        chimneyY,
        chimneyWidth,
        chimneyHeight,
        smokeCircleRadius,
      ).map(({ x, y }, index) => (
        <Circle
          x={x}
          y={y}
          radius={smokeCircleRadius}
          fill={SMOKE_FILL}
          // eslint-disable-next-line react/no-array-index-key
          key={index}
        />
      ))}
    </Group>
  );
};

Smoke.propTypes = {
  chimneyHeight: PropTypes.number.isRequired,
  chimneyWidth: PropTypes.number.isRequired,
  chimneyX: PropTypes.number.isRequired,
  chimneyY: PropTypes.number.isRequired,
};

export default Smoke;
