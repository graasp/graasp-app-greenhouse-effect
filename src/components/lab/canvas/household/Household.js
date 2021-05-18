import React from 'react';
import PropTypes from 'prop-types';
import { Group } from 'react-konva';
import Roof from './Roof';
import FrontAndSide from './FrontAndSide';

const Household = ({
  householdFrontWidth,
  householdSideWidth,
  householdHeight,
  householdRoofHeight,
  x,
  y,
}) => {
  return (
    <Group>
      <Roof
        householdFrontWidth={householdFrontWidth}
        householdSideWidth={householdSideWidth}
        householdRoofHeight={householdRoofHeight}
        x={x}
        y={y}
      />
      <FrontAndSide
        householdFrontWidth={householdFrontWidth}
        householdSideWidth={householdSideWidth}
        householdHeight={householdHeight}
        x={x}
        y={y}
      />
    </Group>
  );
};

Household.propTypes = {
  householdFrontWidth: PropTypes.number.isRequired,
  householdSideWidth: PropTypes.number.isRequired,
  householdHeight: PropTypes.number.isRequired,
  householdRoofHeight: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};

export default Household;
