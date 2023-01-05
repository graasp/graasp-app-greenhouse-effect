import React from 'react';
import PropTypes from 'prop-types';
import { Rect } from 'react-konva';
import { TRUCK_CARGO_FILL } from '../../../../../../constants';

const Cargo = ({
  truckCargoBeginsX,
  truckCargoBeginsY,
  truckCargoWidth,
  truckCargoHeight,
}) => {
  return (
    <Rect
      x={truckCargoBeginsX}
      y={truckCargoBeginsY}
      width={truckCargoWidth}
      height={truckCargoHeight}
      fill={TRUCK_CARGO_FILL}
      stroke={TRUCK_CARGO_FILL}
    />
  );
};

Cargo.propTypes = {
  truckCargoBeginsX: PropTypes.number.isRequired,
  truckCargoBeginsY: PropTypes.number.isRequired,
  truckCargoWidth: PropTypes.number.isRequired,
  truckCargoHeight: PropTypes.number.isRequired,
};

export default Cargo;
