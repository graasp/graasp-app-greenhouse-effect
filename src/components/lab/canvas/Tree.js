import React from 'react';
import PropTypes from 'prop-types';
import { Group, Rect, Circle } from 'react-konva';
import { TREE_CIRCLES_FILL, TREE_FILL } from '../../../config/constants';
import { generateTreeCirclePoints } from '../../../utils/canvas';

const Tree = ({ x, y, treeWidth, treeHeight, treeCircleRadius }) => {
  return (
    <Group>
      <Rect
        x={x}
        y={y}
        fill={TREE_FILL}
        height={-treeHeight}
        width={treeWidth}
      />
      {generateTreeCirclePoints(
        x,
        y,
        treeHeight,
        treeWidth,
        treeCircleRadius,
      ).map(({ x: circleX, y: circleY }) => (
        <Circle
          x={circleX}
          y={circleY}
          fill={TREE_CIRCLES_FILL}
          radius={treeCircleRadius}
        />
      ))}
    </Group>
  );
};

Tree.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  treeWidth: PropTypes.number.isRequired,
  treeHeight: PropTypes.number.isRequired,
  treeCircleRadius: PropTypes.number.isRequired,
};

export default Tree;
