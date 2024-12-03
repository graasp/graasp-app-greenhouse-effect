import React from 'react';
import PropTypes from 'prop-types';
import { Group } from 'react-konva';
import Crown from './Crown';
import Bark from './Bark';
import Base from './Base';

const Tree = ({
  barkWidth,
  barkHeight,
  crownRadius,
  treeBaseWidth,
  treeBaseHeight,
  x,
  y,
}) => {
  return (
    <Group x={x} y={y}>
      <Bark barkWidth={barkWidth} barkHeight={barkHeight} />
      <Crown crownRadius={crownRadius} />
      <Base
        treeBaseWidth={treeBaseWidth}
        treeBaseHeight={treeBaseHeight}
        barkHeight={barkHeight}
      />
    </Group>
  );
};

Tree.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  barkWidth: PropTypes.number.isRequired,
  barkHeight: PropTypes.number.isRequired,
  crownRadius: PropTypes.number.isRequired,
  treeBaseWidth: PropTypes.number.isRequired,
  treeBaseHeight: PropTypes.number.isRequired,
};

export default Tree;
