// the base of the house is composed of two rectangles; the 'front' of the house is the smaller rectangle
// the roof of this smaller rectangle is a triangle
// this function calculates the points of that triangle given the width of the base and the desired roof height

import {
  ROW_FOUR_CIRCLES,
  ROW_ONE_CIRCLES,
  ROW_THREE_CIRCLES,
  ROW_TWO_CIRCLES,
} from '../../constants';

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

// when users change ice cover (via its slider), the amount of ice on the mountains changes
// this fn calculates the dimensions of the ice 'triangle' formed on the mountains given their width, height, and the % ice coverage
// (noting that if ice is e.g. 50% of mountain, then the ice triangle's *area* [and not base/height] should be half the mountain's)
export const computeMountainIceCoverDimensions = (
  mountainWidth,
  mountainHeight,
  icePercentage,
) => {
  const iceCoverWidth = Math.sqrt(mountainWidth ** 2 * icePercentage);
  const iceCoverHeight = Math.sqrt(mountainHeight ** 2 * icePercentage);
  return { iceCoverWidth, iceCoverHeight };
};

// given an ice cover %, calculate how much of land and mountains is covered by ice
// formula provided by teachers
export const computeIcePercentage = (iceCover) => {
  return iceCover >= 0.1 ? Math.min(2 * iceCover - 0.1, 1) : iceCover;
};

export const generateRoadPoints = (roadWidth, roadHeight, roadIndent) => {
  const pointZero = [0, 0];

  const pointOne = [roadIndent, roadHeight];
  const pointTwo = [roadWidth, roadHeight];
  const pointThree = [roadWidth, 0];

  return [...pointZero, ...pointOne, ...pointTwo, ...pointThree];
};

export const generateTreeCrownCoordinates = (radius) => {
  const rowOne = new Array(ROW_ONE_CIRCLES)
    .fill()
    .map((emptyElement, index) => [index * radius, radius]);
  const rowTwo = new Array(ROW_TWO_CIRCLES)
    .fill()
    .map((emptyElement, index) => [-radius / 2 + index * radius, 0]);
  const rowThree = new Array(ROW_THREE_CIRCLES)
    .fill()
    .map((emptyElement, index) => [index * radius, -radius]);
  const rowFour = new Array(ROW_FOUR_CIRCLES)
    .fill()
    .map((emptyElement, index) => [(index + 1) * radius, -radius * 2]);

  return [rowOne, rowTwo, rowThree, rowFour];
};

export const generateTreeBase = (baseWidth, baseHeight) => {
  const pointOne = [0, 0];
  const pointTwo = [baseWidth / 2, -baseHeight];
  const pointThree = [baseWidth, 0];
  return [...pointOne, ...pointTwo, ...pointThree];
};
