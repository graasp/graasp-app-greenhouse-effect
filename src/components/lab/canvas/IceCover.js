import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-konva';
import {
  FULL_MOUNTAIN,
  ICE_COVER_FILL,
  ICE_COVER_LINES_TENSION,
} from '../../../config/constants';
import {
  generateFullMountainPoints,
  generateHalfMountainPoints,
} from '../../../utils/canvas';

const IceCover = ({
  mountainType,
  iceCover,
  mountainWidth,
  mountainHeight,
  mountainPeakX,
  mountainPeakY,
}) => {
  const iceCoverHeight = iceCover * mountainHeight;
  const iceCoverWidth = iceCover * mountainWidth;

  const iceCoverBeginsX =
    mountainType === FULL_MOUNTAIN
      ? mountainPeakX - iceCoverWidth / 2
      : mountainPeakX - iceCoverWidth;
  const iceCoverBeginsY = mountainPeakY + iceCoverHeight;

  const iceCoverPoints =
    mountainType === FULL_MOUNTAIN
      ? generateFullMountainPoints(iceCoverWidth, iceCoverHeight)
      : generateHalfMountainPoints(iceCoverWidth, iceCoverHeight);

  return (
    <Line
      x={iceCoverBeginsX}
      y={iceCoverBeginsY}
      points={iceCoverPoints}
      closed
      // TODO: look at converting to linear gradient to make snow more realistic?
      fill={ICE_COVER_FILL}
      tension={ICE_COVER_LINES_TENSION}
    />
  );
};

IceCover.propTypes = {
  mountainType: PropTypes.string.isRequired,
  iceCover: PropTypes.number.isRequired,
  mountainWidth: PropTypes.number.isRequired,
  mountainHeight: PropTypes.number.isRequired,
  mountainPeakX: PropTypes.number.isRequired,
  mountainPeakY: PropTypes.number.isRequired,
};

export default IceCover;
