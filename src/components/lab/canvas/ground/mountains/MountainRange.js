import React from 'react';
import PropTypes from 'prop-types';
import { Group } from 'react-konva';
import {
  FULL_MOUNTAIN_HEIGHT,
  FULL_MOUNTAIN,
  FULL_MOUNTAIN_WIDTH,
  FULL_MOUNTAIN_X_INDENT,
  HALF_MOUNTAIN_HEIGHT,
  HALF_MOUNTAIN,
  HALF_MOUNTAIN_WIDTH,
  MOUNTAINS_INDENT_Y,
  DEFAULT_ICE_COVER,
} from '../../../../../config/constants';
import MountainWithIceCover from './MountainWithIceCover';

const MountainRange = ({
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

  return (
    <Group>
      <MountainWithIceCover
        mountainType={FULL_MOUNTAIN}
        mountainWidth={fullMountainWidth}
        mountainHeight={fullMountainHeight}
        mountainBeginsX={fullMountainBeginsX}
        mountainBeginsY={mountainsBeginY}
        iceCover={DEFAULT_ICE_COVER}
      />
      <MountainWithIceCover
        mountainType={HALF_MOUNTAIN}
        mountainWidth={halfMountainWidth}
        mountainHeight={halfMountainHeight}
        mountainBeginsX={halfMountainBeginsX}
        mountainBeginsY={mountainsBeginY}
      />
    </Group>
  );
};

MountainRange.propTypes = {
  stageWidth: PropTypes.number.isRequired,
  groundHeight: PropTypes.number.isRequired,
  groundWidth: PropTypes.number.isRequired,
  groundBeginsY: PropTypes.number.isRequired,
};

export default MountainRange;
