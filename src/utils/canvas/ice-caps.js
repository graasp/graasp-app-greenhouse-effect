import { ICE_CAP_TRAPEZIUM_INDENT } from '../../constants';

// ice caps are trapezium-shaped, but there is no native trapezium in konva
// the approach used to create a trapezium is a line with a property of 'closed'
// this function calculates the points of that line given the width and height of the desired trapezium/ice cap
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

// given an ice cover %, return number of ice caps to be displayed on canvas
// formula provided by teachers
export const computeNumIceCaps = (iceCover) => {
  if (iceCover < 5) {
    return 0;
  }
  if (iceCover < 10) {
    return 1;
  }
  if (iceCover < 20) {
    return 2;
  }
  if (iceCover < 30) {
    return 4;
  }
  if (iceCover < 40) {
    return 5;
  }
  if (iceCover < 50) {
    return 6;
  }
  if (iceCover < 60) {
    return 7;
  }
  // if iceCover >= 60%, show 8 icebergs
  return 8;
};

// given numIceCaps, distribute them over two rows, alternating between each row
export const distributeIceCaps = (numIceCaps) => {
  const distribution = [0, 0];
  for (let i = 0; i < numIceCaps; i += 1) {
    distribution[i % 2] += 1;
  }
  return distribution;
};
