import React from 'react';
import PropTypes from 'prop-types';
import { Group, Line } from 'react-konva';
import {
  HOUSE_FRONT_ROOF_COLOR,
  HOUSE_SIDE_ROOF_COLOR,
} from '../../../../../config/constants';
import {
  generateHouseFrontRoofPoints,
  generateHouseSideRoofPoints,
} from '../../../../../utils/canvas';

const Roof = ({ houseFrontWidth, houseRoofHeight, houseSideWidth, x, y }) => {
  const houseFrontRoofPoints = generateHouseFrontRoofPoints(
    houseFrontWidth,
    houseRoofHeight,
  );
  const houseSideRoofPoints = generateHouseSideRoofPoints(
    houseFrontWidth,
    houseSideWidth,
    houseRoofHeight,
  );

  return (
    <Group>
      <Line
        x={x}
        y={y}
        points={houseFrontRoofPoints}
        closed
        fill={HOUSE_FRONT_ROOF_COLOR}
      />
      <Line
        x={x + houseFrontWidth}
        y={y}
        points={houseSideRoofPoints}
        closed
        fill={HOUSE_SIDE_ROOF_COLOR}
      />
    </Group>
  );
};

Roof.propTypes = {
  houseFrontWidth: PropTypes.number.isRequired,
  houseRoofHeight: PropTypes.number.isRequired,
  houseSideWidth: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};

export default Roof;
