import React from 'react';
import PropTypes from 'prop-types';
import Wheel from './Wheel';
import {
  TRUCK_WHEEL_RADIUS,
  WHEEL_ONE_BEGINS_X,
  WHEEL_TWO_BEGINS_X,
} from '../../../../../../constants';

const Wheels = ({
  truckBeginsX,
  truckBeginsY,
  truckTotalWidth,
  truckSideWidth,
  truckFrontHeight,
}) => {
  const wheelRadius = TRUCK_WHEEL_RADIUS * truckTotalWidth;
  const wheelsCenterY = truckBeginsY + truckFrontHeight;
  const wheelOneBeginsX = truckBeginsX + WHEEL_ONE_BEGINS_X * truckTotalWidth;
  const wheelTwoBeginsX = truckBeginsX + WHEEL_TWO_BEGINS_X * truckTotalWidth;
  const wheelThreeBeginsX = truckBeginsX + truckSideWidth;

  const wheelsCenterXPoints = [
    wheelOneBeginsX,
    wheelTwoBeginsX,
    wheelThreeBeginsX,
  ];

  return wheelsCenterXPoints.map((xPoint, index) => (
    <Wheel
      wheelCenterX={xPoint}
      wheelCenterY={wheelsCenterY}
      wheelRadius={wheelRadius}
      // eslint-disable-next-line react/no-array-index-key
      key={index}
    />
  ));
};

Wheels.propTypes = {
  truckBeginsX: PropTypes.number.isRequired,
  truckBeginsY: PropTypes.number.isRequired,
  truckTotalWidth: PropTypes.number.isRequired,
  truckSideWidth: PropTypes.number.isRequired,
  truckFrontHeight: PropTypes.number.isRequired,
};

export default Wheels;
