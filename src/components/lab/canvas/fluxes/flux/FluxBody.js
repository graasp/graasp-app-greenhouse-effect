import React from 'react';
import PropTypes from 'prop-types';
import { Rect } from 'react-konva';
import { UP_STRING } from '../../../../../config/constants';

const FluxBody = ({ bodyWidth, bodyHeight, fill, direction }) => {
  const directedHeight = direction === UP_STRING ? -bodyHeight : bodyHeight;

  return (
    <Rect
      x={-bodyWidth / 2}
      width={bodyWidth}
      height={directedHeight}
      fill={fill}
    />
  );
};

FluxBody.propTypes = {
  bodyWidth: PropTypes.number.isRequired,
  bodyHeight: PropTypes.number.isRequired,
  fill: PropTypes.string.isRequired,
  direction: PropTypes.string.isRequired,
};

export default FluxBody;
