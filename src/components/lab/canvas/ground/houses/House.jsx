import React from 'react';
import PropTypes from 'prop-types';
import { Group } from 'react-konva';
import Roof from './Roof';
import FrontAndSide from './FrontAndSide';

const House = ({
  houseFrontWidth,
  houseSideWidth,
  houseHeight,
  houseRoofHeight,
  x,
  y,
}) => {
  return (
    <Group>
      <Roof
        houseFrontWidth={houseFrontWidth}
        houseSideWidth={houseSideWidth}
        houseRoofHeight={houseRoofHeight}
        x={x}
        y={y}
      />
      <FrontAndSide
        houseFrontWidth={houseFrontWidth}
        houseSideWidth={houseSideWidth}
        houseHeight={houseHeight}
        x={x}
        y={y}
      />
    </Group>
  );
};

House.propTypes = {
  houseFrontWidth: PropTypes.number.isRequired,
  houseSideWidth: PropTypes.number.isRequired,
  houseHeight: PropTypes.number.isRequired,
  houseRoofHeight: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};

export default House;
