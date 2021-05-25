import React from 'react';
import PropTypes from 'prop-types';
import Tree from './Tree';
import {
  NUMBER_OF_TREES_IN_ROW,
  TREE_CIRCLE_RADIUS,
  TREE_HEIGHT,
  TREE_ROW_BEGINS_X,
  TREE_WIDTH,
  X_DISTANCE_BETWEEN_TREES,
} from '../../../../../config/constants';

const TreeRow = ({
  groundHeight,
  groundWidth,
  groundBeginsX,
  groundBeginsY,
}) => {
  const treeWidth = TREE_WIDTH * groundWidth;
  const treeHeight = TREE_HEIGHT * groundHeight;
  const treeCircleRadius = TREE_CIRCLE_RADIUS * treeWidth;

  const treeRowBeginsX = TREE_ROW_BEGINS_X * groundWidth + groundBeginsX;
  const xDistanceBetweenTrees = X_DISTANCE_BETWEEN_TREES * groundWidth;

  const trees = new Array(NUMBER_OF_TREES_IN_ROW)
    .fill()
    .map((emptyElement, index) => (
      <Tree
        x={treeRowBeginsX + index * (xDistanceBetweenTrees + treeWidth)}
        y={groundBeginsY}
        treeWidth={treeWidth}
        treeHeight={treeHeight}
        treeCircleRadius={treeCircleRadius}
        // eslint-disable-next-line react/no-array-index-key
        key={index}
      />
    ));

  return trees;
};

TreeRow.propTypes = {
  groundHeight: PropTypes.number.isRequired,
  groundWidth: PropTypes.number.isRequired,
  groundBeginsX: PropTypes.number.isRequired,
  groundBeginsY: PropTypes.number.isRequired,
};

export default TreeRow;
