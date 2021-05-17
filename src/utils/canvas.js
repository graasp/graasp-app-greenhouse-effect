import { ICE_CAP_TRAPEZIUM_INDENT } from '../config/constants';

// ice caps are trapezium-shaped, but there is no native trapezium in konva
// the approach used to create a trapezium is a line with a property of 'closed'
// this function calculates the points of that line given the width and height of the desired ice cap
export const generateIceCapPoints = (iceCapBaseWidth, iceCapHeight) => {
  // first point of line is (0, 0), i.e. start drawing shape at (0, 0) offset from shape origin (specified in x/y props)
  const trapeziumPointZero = [0, 0];

  // note that remaining points are offsets from origin
  // only three points are required - the 'closed' prop in the component closes the shape
  const trapeziumPointOne = [
    iceCapBaseWidth * ICE_CAP_TRAPEZIUM_INDENT,
    -iceCapHeight,
  ];
  const trapeziumPointTwo = [
    iceCapBaseWidth * (1 - ICE_CAP_TRAPEZIUM_INDENT),
    -iceCapHeight,
  ];
  const trapeziumPointThree = [iceCapBaseWidth, 0];

  return [
    ...trapeziumPointZero,
    ...trapeziumPointOne,
    ...trapeziumPointTwo,
    ...trapeziumPointThree,
  ];
};

export const generateCloudCircles = (centralCircleRadius, centralCircleX) => {
  const adjacentCircleRadius = centralCircleRadius * 0.85;
  const peripheralCircleRadius = centralCircleRadius * 0.5;

  const circleOne = {
    radius: peripheralCircleRadius,
    x: centralCircleX - centralCircleRadius - adjacentCircleRadius,
  };

  const circleTwo = {
    radius: adjacentCircleRadius,
    x: centralCircleX - centralCircleRadius,
  };

  const circleThree = {
    radius: centralCircleRadius,
    x: centralCircleX,
  };

  const circleFour = {
    radius: adjacentCircleRadius,
    x: centralCircleX + centralCircleRadius,
  };

  const circleFive = {
    radius: peripheralCircleRadius,
    x: centralCircleX + centralCircleRadius + adjacentCircleRadius,
  };

  return [circleOne, circleTwo, circleThree, circleFour, circleFive];
};
