import React from 'react';
import PropTypes from 'prop-types';
import { Rect } from 'react-konva';
import { TRUCK_BODY_FILL } from '../../../../../../config/constants';

const Side = ({
  truckSideBeginsX,
  truckSideBeginsY,
  truckSideWidth,
  truckSideHeight,
}) => {
  return (
    <Rect
      x={truckSideBeginsX}
      y={truckSideBeginsY}
      width={truckSideWidth}
      height={truckSideHeight}
      fill={TRUCK_BODY_FILL}
    />
  );
};

Side.propTypes = {
  truckSideBeginsX: PropTypes.number.isRequired,
  truckSideBeginsY: PropTypes.number.isRequired,
  truckSideWidth: PropTypes.number.isRequired,
  truckSideHeight: PropTypes.number.isRequired,
};

export default Side;
