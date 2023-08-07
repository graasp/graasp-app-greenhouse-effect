import React from 'react';
import PropTypes from 'prop-types';
import { Circle } from 'react-konva';
import { TREE_CROWN_FILL } from '../../../../../constants';

const Crown = ({ crownRadius }) => {
  return <Circle radius={crownRadius} fill={TREE_CROWN_FILL} />;
};

Crown.propTypes = {
  crownRadius: PropTypes.number.isRequired,
};

export default Crown;
