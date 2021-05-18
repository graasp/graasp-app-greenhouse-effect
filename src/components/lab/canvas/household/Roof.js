import React from 'react';
import PropTypes from 'prop-types';
import { Group, Line } from 'react-konva';
import {
  HOUSEHOLD_FRONT_ROOF_COLOR,
  HOUSEHOLD_SIDE_ROOF_COLOR,
} from '../../../../config/constants';
import {
  generateHouseholdFrontRoofPoints,
  generateHouseholdSideRoofPoints,
} from '../../../../utils/canvas';

const Roof = ({
  householdFrontWidth,
  householdRoofHeight,
  householdSideWidth,
  x,
  y,
}) => {
  const householdFrontRoofPoints = generateHouseholdFrontRoofPoints(
    householdFrontWidth,
    householdRoofHeight,
  );
  const householdSideRoofPoints = generateHouseholdSideRoofPoints(
    householdFrontWidth,
    householdSideWidth,
    householdRoofHeight,
  );

  return (
    <Group>
      <Line
        x={x}
        y={y}
        points={householdFrontRoofPoints}
        closed
        fill={HOUSEHOLD_FRONT_ROOF_COLOR}
      />
      <Line
        x={x + householdFrontWidth}
        y={y}
        points={householdSideRoofPoints}
        closed
        fill={HOUSEHOLD_SIDE_ROOF_COLOR}
      />
    </Group>
  );
};

Roof.propTypes = {
  householdFrontWidth: PropTypes.number.isRequired,
  householdRoofHeight: PropTypes.number.isRequired,
  householdSideWidth: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};

export default Roof;
