import React from 'react';
import { useSelector } from 'react-redux';
import {
  TREE_BARK_HEIGHT_PERCENTAGE,
  TREE_BARK_WIDTH_PERCENTAGE,
} from '../../../../../constants';
import Tree from './Tree';

const TreeRow = ({ rowWidth, rowBeginsX, rowBeginsY }) => {
  const { width: stageWidth, height: stageHeight } = useSelector(
    ({ layout }) => layout.lab.stageDimensions,
  );

  const barkWidth = stageWidth * TREE_BARK_WIDTH_PERCENTAGE;
  const barkHeight = stageHeight * TREE_BARK_HEIGHT_PERCENTAGE;
  const crownRadius = barkWidth * 1.25;
  const treeBaseWidth = barkWidth * 2;
  const treeBaseHeight = barkHeight / 3;
  const totalTreeWidth = crownRadius * 2;
  const numTrees = totalTreeWidth && Math.floor(rowWidth / totalTreeWidth) + 1;

  const treesArray = new Array(numTrees).fill();

  return treesArray.map((emptyElement, index) => {
    const verticalPerturbationSign = index % 2 === 0 ? 1 : -1;

    return (
      <Tree
        barkWidth={barkWidth}
        barkHeight={barkHeight}
        crownRadius={crownRadius}
        treeBaseWidth={treeBaseWidth}
        treeBaseHeight={treeBaseHeight}
        x={rowBeginsX + totalTreeWidth * index}
        y={rowBeginsY - treeBaseHeight + verticalPerturbationSign * 1}
        // eslint-disable-next-line react/no-array-index-key
        key={index}
      />
    );
  });
};

export default TreeRow;
