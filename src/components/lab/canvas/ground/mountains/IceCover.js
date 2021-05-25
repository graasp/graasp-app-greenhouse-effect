import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-konva';
import {
  FULL_MOUNTAIN,
  ICE_COVER_FILL,
  ICE_COVER_LINES_TENSION,
} from '../../../../../config/constants';

const IceCover = ({
  mountainType,
  mountainWidth,
  mountainHeight,
  mountainPoints,
  iceCover,
  mountainBeginsX,
  mountainBeginsY,
}) => {
  const iceCoverBeginsX =
    mountainType === FULL_MOUNTAIN
      ? mountainBeginsX + (mountainWidth / 2) * (1 - iceCover)
      : mountainBeginsX + mountainWidth * (1 - iceCover);
  const iceCoverBeginsY = mountainBeginsY - mountainHeight * (1 - iceCover);

  return (
    <Line
      x={iceCoverBeginsX}
      y={iceCoverBeginsY}
      points={mountainPoints}
      fill={ICE_COVER_FILL}
      tension={ICE_COVER_LINES_TENSION}
      scale={{ x: iceCover, y: iceCover }}
      closed
    />
  );
};

IceCover.propTypes = {
  mountainType: PropTypes.string.isRequired,
  mountainWidth: PropTypes.number.isRequired,
  mountainHeight: PropTypes.number.isRequired,
  mountainPoints: PropTypes.arrayOf(PropTypes.number).isRequired,
  iceCover: PropTypes.number.isRequired,
  mountainBeginsX: PropTypes.number.isRequired,
  mountainBeginsY: PropTypes.number.isRequired,
};

export default IceCover;
