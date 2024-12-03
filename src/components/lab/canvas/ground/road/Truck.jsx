import React from 'react';
import PropTypes from 'prop-types';
import { Group } from 'react-konva';
import {
  TRUCK_FRONT_WIDTH,
  TRUCK_FRONT_HEIGHT,
  TRUCK_SIDE_WIDTH,
  TRUCK_CARGO_HEIGHT,
  TRUCK_CARGO_WIDTH,
  TRUCK_BEGINS_X,
  TRUCK_BEGINS_Y,
  TRUCK_CARGO_GAP,
  TRUCK_SIDE_HEIGHT,
} from '../../../../../constants';
import Wheels from './truck/Wheels';
import Front from './truck/Front';
import Side from './truck/Side';
import Cargo from './truck/Cargo';

const Truck = ({ roadHeight, roadWidth }) => {
  // (1) constants for dimensions
  // truck 'side'
  const truckSideWidth = TRUCK_SIDE_WIDTH * roadWidth;
  const truckSideHeight = TRUCK_SIDE_HEIGHT * roadHeight;
  // truck 'front'
  const truckFrontWidth = TRUCK_FRONT_WIDTH * roadWidth;
  const truckFrontHeight = TRUCK_FRONT_HEIGHT * roadHeight;
  // truck 'cargo'
  const truckCargoWidth = TRUCK_CARGO_WIDTH * roadWidth;
  const truckCargoHeight = TRUCK_CARGO_HEIGHT * truckFrontHeight;
  // other dimension variables
  const truckCargoGap = TRUCK_CARGO_GAP * truckFrontHeight;
  const truckTotalWidth = truckSideWidth + truckFrontWidth;

  // (2) constants for positioning
  const truckBeginsX = TRUCK_BEGINS_X * roadWidth;
  const truckBeginsY = TRUCK_BEGINS_Y * roadHeight;
  const truckSideBeginsX = truckBeginsX;
  const truckSideBeginsY = truckBeginsY + truckCargoGap + truckCargoHeight;
  const truckFrontBeginsX = truckBeginsX + truckSideWidth;
  const truckFrontBeginsY = truckBeginsY;
  const truckCargoBeginsX = truckBeginsX;
  const truckCargoBeginsY = truckBeginsY + truckCargoGap;

  return (
    <Group>
      <Front
        truckFrontBeginsX={truckFrontBeginsX}
        truckFrontBeginsY={truckFrontBeginsY}
        truckFrontWidth={truckFrontWidth}
        truckFrontHeight={truckFrontHeight}
      />
      <Side
        truckSideBeginsX={truckSideBeginsX}
        truckSideBeginsY={truckSideBeginsY}
        truckSideWidth={truckSideWidth}
        truckSideHeight={truckSideHeight}
      />
      <Cargo
        truckCargoBeginsX={truckCargoBeginsX}
        truckCargoBeginsY={truckCargoBeginsY}
        truckCargoWidth={truckCargoWidth}
        truckCargoHeight={truckCargoHeight}
      />
      <Wheels
        truckBeginsX={truckBeginsX}
        truckBeginsY={truckBeginsY}
        truckTotalWidth={truckTotalWidth}
        truckSideWidth={truckSideWidth}
        truckFrontHeight={truckFrontHeight}
      />
    </Group>
  );
};

Truck.propTypes = {
  roadHeight: PropTypes.number.isRequired,
  roadWidth: PropTypes.number.isRequired,
};

export default Truck;
