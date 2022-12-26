import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Line } from 'react-konva';
import {
  FULL_MOUNTAIN,
  ICE_COVER_FILL,
  ICE_COVER_LINES_TENSION,
} from '../../../../../config/constants';
import {
  computeIcePercentage,
  computeMountainIceCoverDimensions,
  generateFullMountainPoints,
  generateHalfMountainPoints,
} from '../../../../../utils/canvas';

const IceCover = ({
  mountainType,
  mountainWidth,
  mountainHeight,
  mountainBeginsX,
  mountainBeginsY,
}) => {
  const { sliderIceCover } = useSelector(({ lab }) => lab);
  const icePercentage = computeIcePercentage(sliderIceCover / 100);
  const { iceCoverWidth, iceCoverHeight } = computeMountainIceCoverDimensions(
    mountainWidth,
    mountainHeight,
    icePercentage,
  );

  const iceCoverPoints =
    mountainType === FULL_MOUNTAIN
      ? generateFullMountainPoints(iceCoverWidth, iceCoverHeight)
      : generateHalfMountainPoints(iceCoverWidth, iceCoverHeight);

  const iceCoverBeginsX =
    mountainType === FULL_MOUNTAIN
      ? mountainBeginsX + mountainWidth / 2 - iceCoverWidth / 2
      : mountainBeginsX + mountainWidth - iceCoverWidth;
  const iceCoverBeginsY = mountainBeginsY - mountainHeight + iceCoverHeight;

  return (
    <Line
      x={iceCoverBeginsX}
      y={iceCoverBeginsY}
      points={iceCoverPoints}
      fill={ICE_COVER_FILL}
      tension={ICE_COVER_LINES_TENSION}
      closed
    />
  );
};

IceCover.propTypes = {
  mountainType: PropTypes.string.isRequired,
  mountainWidth: PropTypes.number.isRequired,
  mountainHeight: PropTypes.number.isRequired,
  mountainBeginsX: PropTypes.number.isRequired,
  mountainBeginsY: PropTypes.number.isRequired,
};

export default IceCover;
