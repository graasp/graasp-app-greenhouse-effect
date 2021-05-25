import { ICE_CAP_TRAPEZIUM_INDENT, SMOKE_INDENT_Y } from '../config/constants';

// ice caps are trapezium-shaped, but there is no native trapezium in konva
// the approach used to create a trapezium is a line with a property of 'closed'
// this function calculates the points of that line given the width and height of the desired treapezium/ice cap
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

// the cloud is five concentric circles - a large one in the center flanked by two smaller ones on each side
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

// the base of the house is composed of two rectangles; the 'front' of the house is the smaller rectangle
// the roof of this smaller rectangle is a triangle
// this function calculates the points of that triangle given the width of the base and the desired roof height
// the points returned are used to draw a Konva line; with a property of 'closed', it becomes a triangle
export const generateHouseFrontRoofPoints = (houseFrontWidth, roofHeight) => {
  // first point of line is (0, 0), i.e. start drawing shape at (0, 0) offset from shape origin (specified in x/y props)
  const frontRoofPointOne = [0, 0];
  const frontRoofPointTwo = [houseFrontWidth, 0];
  const frontRoofPointThree = [houseFrontWidth / 2, -roofHeight];
  return [...frontRoofPointOne, ...frontRoofPointTwo, ...frontRoofPointThree];
};

// the roof of this portion of the house is a parallelogram
// this function calculates the points of that parallelogram given the width of the front/side and the desired roof height
// the points returned are used to draw a Konva line; with a property of 'closed', it becomes a parallelogram
export const generateHouseSideRoofPoints = (
  houseFrontWidth,
  houseSideWidth,
  roofHeight,
) => {
  const sideRoofIndent = houseFrontWidth / 2;
  const sideRoofPointOne = [0, 0];
  const sideRoofPointTwo = [houseSideWidth, 0];
  const sideRoofPointThree = [houseSideWidth - sideRoofIndent, -roofHeight];
  const sideRoofPointFour = [-sideRoofIndent, -roofHeight];
  return [
    ...sideRoofPointOne,
    ...sideRoofPointTwo,
    ...sideRoofPointThree,
    ...sideRoofPointFour,
  ];
};

// function used to draw smoke coming out of factory chimney
// the smoke is a stack of circles; from bottom, row one has one circle, row two two circles, etc.
// this function returns the centers of these circles given the position of the chimney and the desired size of the smoke
export const generateSmokeCirclePoints = (
  chimneyX,
  chimneyY,
  chimneyWidth,
  chimneyHeight,
  smokeCircleRadius,
) => {
  const halfRadius = smokeCircleRadius / 2;

  // circle on row one
  const firstCircleX = chimneyX + chimneyWidth / 2;
  const firstCircleY =
    chimneyY -
    chimneyHeight -
    SMOKE_INDENT_Y * chimneyHeight -
    smokeCircleRadius;
  const rowOne = [{ x: firstCircleX, y: firstCircleY }];

  // circles on row two
  const secondRowY = firstCircleY - smokeCircleRadius;
  const rowTwo = [
    { x: firstCircleX - halfRadius, y: secondRowY },
    { x: firstCircleX + halfRadius, y: secondRowY },
  ];

  // circles on row three
  const thirdRowY = secondRowY - smokeCircleRadius;
  const rowThree = [
    { x: firstCircleX, y: thirdRowY },
    { x: firstCircleX - smokeCircleRadius, y: thirdRowY },
    { x: firstCircleX + smokeCircleRadius, y: thirdRowY },
  ];

  return [...rowOne, ...rowTwo, ...rowThree];
};

// 'full mountain': equilateral triangle
export const generateFullMountainPoints = (mountainWidth, mountainHeight) => {
  const mountainPointOne = [0, 0];
  const mountainPointTwo = [mountainWidth / 2, -mountainHeight];
  const mountainPointThree = [mountainWidth, 0];
  return [...mountainPointOne, ...mountainPointTwo, ...mountainPointThree];
};

// 'half mountain': right angled triangle
export const generateHalfMountainPoints = (
  halfMountainWidth,
  halfMountainHeight,
) => {
  const halfMountainPointOne = [0, 0];
  const halfMountainPointTwo = [halfMountainWidth, 0];
  const halfMountainPointThree = [halfMountainWidth, -halfMountainHeight];
  return [
    ...halfMountainPointOne,
    ...halfMountainPointTwo,
    ...halfMountainPointThree,
  ];
};

export const generateTreeCirclePoints = (
  treeX,
  treeY,
  treeHeight,
  treeWidth,
  circleRadius,
) => {
  const treeBaseMidpoint = treeX + treeWidth / 2;
  const halfRadius = circleRadius / 2;

  const rowOneY = treeY - treeHeight;
  const rowTwoY = rowOneY - circleRadius;

  const rowOne = [
    { x: treeBaseMidpoint + halfRadius, y: rowOneY },
    { x: treeBaseMidpoint - halfRadius, y: rowOneY },
  ];
  const rowTwo = [{ x: treeBaseMidpoint, y: rowTwoY }];

  return [...rowOne, ...rowTwo];
};
