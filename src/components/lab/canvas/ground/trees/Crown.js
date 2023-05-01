import React from 'react';
import PropTypes from 'prop-types';
import { Circle } from 'react-konva';
import { generateTreeCrownCoordinates } from '../../../../../utils';
import { TREE_CROWN_FILL } from '../../../../../constants';

const Crown = ({ radius }) => {
  return generateTreeCrownCoordinates(radius).map((row) =>
    row.map(([a, b], index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Circle x={a} y={b} fill={TREE_CROWN_FILL} radius={radius} key={index} />
    )),
  );
};

Crown.propTypes = {
  radius: PropTypes.number.isRequired,
};

export default Crown;
