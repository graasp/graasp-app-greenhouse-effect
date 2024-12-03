import React from 'react';
import PropTypes from 'prop-types';
import { Rect } from 'react-konva';
import { TREE_BARK_FILL } from '../../../../../constants';

const Bark = ({ barkWidth, barkHeight }) => {
  return (
    <Rect
      x={-barkWidth / 2}
      width={barkWidth}
      height={barkHeight}
      fill={TREE_BARK_FILL}
    />
  );
};

Bark.propTypes = {
  barkWidth: PropTypes.number.isRequired,
  barkHeight: PropTypes.number.isRequired,
};

export default Bark;
