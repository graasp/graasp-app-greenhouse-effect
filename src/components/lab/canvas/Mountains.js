import React from 'react';
import PropTypes from 'prop-types';
import { Line, Group } from 'react-konva';
import {
  generateFullMountainPoints,
  generateHalfMountainPoints,
} from '../../../utils/canvas';
import {
  DEFAULT_ICE_COVER,
  FULL_MOUNTAIN_HEIGHT,
  FULL_MOUNTAIN,
  FULL_MOUNTAIN_WIDTH,
  FULL_MOUNTAIN_X_INDENT,
  HALF_MOUNTAIN_HEIGHT,
  HALF_MOUNTAIN,
  HALF_MOUNTAIN_WIDTH,
  MOUNTAINS_INDENT_Y,
  MOUNTAIN_FILL,
  MOUNTAIN_LINES_TENSION,
} from '../../../config/constants';
import IceCover from './IceCover';

const Mountains = ({
  stageWidth,
  groundHeight,
  groundWidth,
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

  const fullMountainPeakX = fullMountainBeginsX + fullMountainWidth / 2;
  const fullMountainPeakY = mountainsBeginY - fullMountainHeight;

  const halfMountainPeakX = halfMountainBeginsX + halfMountainWidth;
  const halfMountainPeakY = mountainsBeginY - halfMountainHeight;

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
      {/* TODO: Separate the Lines out into a separate Mountain component so this component is cleaner */}
      {/* Full mountain + ice cover */}
      <Line
        x={fullMountainBeginsX}
        y={mountainsBeginY}
        points={fullMountainPoints}
        fill={MOUNTAIN_FILL}
        tension={MOUNTAIN_LINES_TENSION}
        closed
        draggable
      />
      <IceCover
        mountainType={FULL_MOUNTAIN}
        mountainWidth={fullMountainWidth}
        mountainHeight={fullMountainHeight}
        iceCover={DEFAULT_ICE_COVER}
        mountainPeakX={fullMountainPeakX}
        mountainPeakY={fullMountainPeakY}
      />
      {/* Half mountain + ice cover */}
      <Line
        x={halfMountainBeginsX}
        y={mountainsBeginY}
        points={halfMountainPoints}
        fill={MOUNTAIN_FILL}
        tension={MOUNTAIN_LINES_TENSION}
        closed
      />
      <IceCover
        mountainType={HALF_MOUNTAIN}
        mountainWidth={halfMountainWidth}
        mountainHeight={halfMountainHeight}
        iceCover={DEFAULT_ICE_COVER}
        mountainPeakX={halfMountainPeakX}
        mountainPeakY={halfMountainPeakY}
      />
    </Group>
  );
};

Mountains.propTypes = {
  stageWidth: PropTypes.number.isRequired,
  groundHeight: PropTypes.number.isRequired,
  groundWidth: PropTypes.number.isRequired,
  groundBeginsY: PropTypes.number.isRequired,
};

export default Mountains;
