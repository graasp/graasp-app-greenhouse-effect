/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Line, Group } from 'react-konva';
import {
  generateFullMountainPoints,
  generateHalfMountainPoints,
} from '../../../utils/canvas';
import {
  FULL_MOUNTAIN_HEIGHT,
  FULL_MOUNTAIN_WIDTH,
  FULL_MOUNTAIN_X_INDENT,
  HALF_MOUNTAIN_HEIGHT,
  HALF_MOUNTAIN_WIDTH,
  MOUNTAINS_INDENT_Y,
  MOUNTAIN_FILL,
  MOUNTAIN_LINES_TENSION,
} from '../../../config/constants';

const Mountains = ({
  stageWidth,
  groundHeight,
  groundWidth,
  groundBeginsX,
  groundBeginsY,
}) => {
  const fullMountainWidth = FULL_MOUNTAIN_WIDTH * groundWidth;
  const fullMountainHeight = FULL_MOUNTAIN_HEIGHT * groundHeight;
  const halfMountainWidth = HALF_MOUNTAIN_WIDTH * groundWidth;
  const halfMountainHeight = HALF_MOUNTAIN_HEIGHT * groundHeight;

  const fullMountainBeginsX =
    stageWidth - halfMountainWidth - FULL_MOUNTAIN_X_INDENT * fullMountainWidth;
  const halfMountainBeginsX =
    fullMountainBeginsX + FULL_MOUNTAIN_X_INDENT * fullMountainWidth;
  const mountainsBeginY = groundBeginsY + MOUNTAINS_INDENT_Y * groundHeight;

  const fullMountainPoints = generateFullMountainPoints(
    fullMountainWidth,
    fullMountainHeight,
  );
  const halfMountainPoints = generateHalfMountainPoints(
    halfMountainWidth,
    halfMountainHeight,
  );

  return (
    <Group>
      <Line
        x={fullMountainBeginsX}
        y={mountainsBeginY}
        points={fullMountainPoints}
        fill={MOUNTAIN_FILL}
        tension={MOUNTAIN_LINES_TENSION}
        closed
      />
      <Line
        x={halfMountainBeginsX}
        y={mountainsBeginY}
        points={halfMountainPoints}
        fill={MOUNTAIN_FILL}
        tension={MOUNTAIN_LINES_TENSION}
        closed
      />
    </Group>
  );
};

Mountains.propTypes = {
  stageWidth: PropTypes.number.isRequired,
  groundHeight: PropTypes.number.isRequired,
  groundWidth: PropTypes.number.isRequired,
  groundBeginsX: PropTypes.number.isRequired,
  groundBeginsY: PropTypes.number.isRequired,
};

export default Mountains;
