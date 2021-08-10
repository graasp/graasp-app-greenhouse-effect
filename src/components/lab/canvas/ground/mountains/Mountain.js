import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Line } from 'react-konva';
import {
  MOUNTAIN_FILL,
  MOUNTAIN_FILL_PAUSED,
  MOUNTAIN_LINES_TENSION,
} from '../../../../../config/constants';

const Mountain = ({ mountainPoints, mountainBeginsX, mountainBeginsY }) => {
  const isPaused = useSelector(({ lab }) => lab.isPaused);

  return (
    <Line
      x={mountainBeginsX}
      y={mountainBeginsY}
      points={mountainPoints}
      fill={isPaused ? MOUNTAIN_FILL_PAUSED : MOUNTAIN_FILL}
      tension={MOUNTAIN_LINES_TENSION}
      closed
    />
  );
};

Mountain.propTypes = {
  mountainPoints: PropTypes.arrayOf(PropTypes.number).isRequired,
  mountainBeginsX: PropTypes.number.isRequired,
  mountainBeginsY: PropTypes.number.isRequired,
};

export default Mountain;
