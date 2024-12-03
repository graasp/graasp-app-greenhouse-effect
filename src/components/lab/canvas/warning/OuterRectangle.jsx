import React from 'react';
import PropTypes from 'prop-types';
import { Rect } from 'react-konva';
import {
  WARNING_BORDER_COLOR,
  WARNING_BORDER_RADIUS,
} from '../../../../constants/canvas/warning';

const OuterRectangle = ({ width, height }) => {
  return (
    <Rect
      width={width}
      height={height}
      fill={WARNING_BORDER_COLOR}
      cornerRadius={WARNING_BORDER_RADIUS}
    />
  );
};

OuterRectangle.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default OuterRectangle;
