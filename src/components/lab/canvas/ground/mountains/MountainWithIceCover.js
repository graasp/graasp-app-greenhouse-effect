import React from 'react';
import PropTypes from 'prop-types';
import { Group } from 'react-konva';
import Mountain from './Mountain';
import IceCover from './IceCover';
import { FULL_MOUNTAIN } from '../../../../../config/constants';
import {
  generateFullMountainPoints,
  generateHalfMountainPoints,
} from '../../../../../utils/canvas';

const MountainWithIceCover = ({
  mountainType,
  mountainWidth,
  mountainHeight,
  mountainBeginsX,
  mountainBeginsY,
}) => {
  const mountainPoints =
    mountainType === FULL_MOUNTAIN
      ? generateFullMountainPoints(mountainWidth, mountainHeight)
      : generateHalfMountainPoints(mountainWidth, mountainHeight);

  return (
    <Group>
      <Mountain
        mountainPoints={mountainPoints}
        mountainBeginsX={mountainBeginsX}
        mountainBeginsY={mountainBeginsY}
      />
      <IceCover
        mountainType={mountainType}
        mountainWidth={mountainWidth}
        mountainHeight={mountainHeight}
        mountainBeginsX={mountainBeginsX}
        mountainBeginsY={mountainBeginsY}
      />
    </Group>
  );
};

MountainWithIceCover.propTypes = {
  mountainType: PropTypes.string.isRequired,
  mountainWidth: PropTypes.number.isRequired,
  mountainHeight: PropTypes.number.isRequired,
  mountainBeginsX: PropTypes.number.isRequired,
  mountainBeginsY: PropTypes.number.isRequired,
};

export default MountainWithIceCover;
