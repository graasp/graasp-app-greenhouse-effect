import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-konva';
import {
  MOUNTAIN_FILL,
  MOUNTAIN_LINES_TENSION,
} from '../../../../../config/constants';

const Mountain = ({ mountainPoints, mountainBeginsX, mountainBeginsY }) => {
  return (
    <Line
      x={mountainBeginsX}
      y={mountainBeginsY}
      points={mountainPoints}
      fill={MOUNTAIN_FILL}
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
