import { ICE_CAP_TRAPEZIUM_INDENT, SMOKE_INDENT_Y } from '../config/constants';

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

// **TODO**: Add some explanations of how this works
export const generateHouseholdFrontRoofPoints = (
  householdFrontWidth,
  roofHeight,
) => {
  const frontRoofPointOne = [0, 0];
  const frontRoofPointTwo = [householdFrontWidth, 0];
  const frontRoofPointThree = [householdFrontWidth / 2, -roofHeight];
  return [...frontRoofPointOne, ...frontRoofPointTwo, ...frontRoofPointThree];
};

// **TODO**: Add some explanations of how this works
export const generateHouseholdSideRoofPoints = (
  householdFrontWidth,
  householdSideWidth,
  roofHeight,
) => {
  const sideRoofIndent = householdFrontWidth / 2;
  const sideRoofPointOne = [0, 0];
  const sideRoofPointTwo = [householdSideWidth, 0];
  const sideRoofPointThree = [householdSideWidth - sideRoofIndent, -roofHeight];
  const sideRoofPointFour = [-sideRoofIndent, -roofHeight];
  return [
    ...sideRoofPointOne,
    ...sideRoofPointTwo,
    ...sideRoofPointThree,
    ...sideRoofPointFour,
  ];
};

export const generateSmokeCirclePoints = (
  chimneyX,
  chimneyY,
  chimneyWidth,
  chimneyHeight,
  smokeCircleRadius,
) => {
  const halfRadius = smokeCircleRadius / 2;
  const firstCircleX = chimneyX + chimneyWidth / 2;
  const firstCircleY =
    chimneyY -
    chimneyHeight -
    SMOKE_INDENT_Y * chimneyHeight -
    smokeCircleRadius;
  const rowOne = [{ x: firstCircleX, y: firstCircleY }];

  const secondRowY = firstCircleY - smokeCircleRadius;
  const rowTwo = [
    { x: firstCircleX - halfRadius, y: secondRowY },
    { x: firstCircleX + halfRadius, y: secondRowY },
  ];

  const thirdRowY = secondRowY - smokeCircleRadius;
  const rowThree = [
    { x: firstCircleX, y: thirdRowY },
    { x: firstCircleX - smokeCircleRadius, y: thirdRowY },
    { x: firstCircleX + smokeCircleRadius, y: thirdRowY },
  ];

  return [...rowOne, ...rowTwo, ...rowThree];
};
