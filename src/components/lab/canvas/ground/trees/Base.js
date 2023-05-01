import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-konva';
import { generateTreeBase } from '../../../../../utils';
import {
  TREE_BARK_FILL,
  TREE_BASE_LINE_TENSION,
} from '../../../../../constants';

const Base = ({ radius, treeBaseWidth, treeBaseHeight, barkHeight }) => {
  return (
    <Line
      points={generateTreeBase(treeBaseWidth, treeBaseHeight)}
      fill={TREE_BARK_FILL}
      x={-radius / 2}
      y={barkHeight}
      closed
      tension={TREE_BASE_LINE_TENSION}
    />
  );
};

Base.propTypes = {
  radius: PropTypes.number.isRequired,
  treeBaseWidth: PropTypes.number.isRequired,
  treeBaseHeight: PropTypes.number.isRequired,
  barkHeight: PropTypes.number.isRequired,
};

export default Base;
