import _ from 'lodash';
import { ICE_CAP_TRAPEZIUM_INDENT } from '../config/constants';

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

export const determineCarbonDioxideAtomsCoordinates = (
  moleculeCenter,
  carbonRadius,
  oxygenRadius,
) => {
  const { x: moleculeCenterX, y: moleculeCenterY } = moleculeCenter;
  return {
    topOxygen: {
      x: moleculeCenterX,
      y: moleculeCenterY - carbonRadius - oxygenRadius,
    },
    carbon: { x: moleculeCenterX, y: moleculeCenterY },
    bottomOxygen: {
      x: moleculeCenterX,
      y: moleculeCenterY + carbonRadius + oxygenRadius,
    },
  };
};

export const determineWaterAtomsCoordinates = (
  moleculeCenter,
  oxygenRadius,
  hydrogenRadius,
) => {
  const { x: moleculeCenterX, y: moleculeCenterY } = moleculeCenter;
  const hydrogenXOffset = Math.sin((45 * Math.PI) / 180) * oxygenRadius;
  const hydrogenYOffset =
    Math.cos((45 * Math.PI) / 180) * oxygenRadius + hydrogenRadius;
  return {
    topHydrogen: {
      x: moleculeCenterX - hydrogenXOffset,
      y: moleculeCenterY - hydrogenYOffset,
    },
    oxygen: { x: moleculeCenterX, y: moleculeCenterY },
    bottomHydrogen: {
      x: moleculeCenterX - hydrogenXOffset,
      y: moleculeCenterY + hydrogenYOffset,
    },
  };
};

export const determineMethaneAtomsCoordinates = (
  moleculeCenter,
  carbonRadius,
  hydrogenRadius,
) => {
  const { x: moleculeCenterX, y: moleculeCenterY } = moleculeCenter;

  const leftHydrogensXOffset = Math.cos((30 * Math.PI) / 180) * carbonRadius;
  const leftHydrogensYOffset =
    Math.sin((30 * Math.PI) / 180) * carbonRadius + hydrogenRadius;
  const rightHydrogensXOffset = Math.cos((40 * Math.PI) / 180) * carbonRadius;
  const rightHydrogensYOffset =
    Math.sin((40 * Math.PI) / 180) * carbonRadius + hydrogenRadius;

  return {
    carbon: { x: moleculeCenterX, y: moleculeCenterY },
    topLeftHydrogen: {
      x: moleculeCenterX - leftHydrogensXOffset,
      y: moleculeCenterY - leftHydrogensYOffset,
    },
    topRightHydrogen: {
      x: moleculeCenterX + rightHydrogensXOffset,
      y: moleculeCenterY - rightHydrogensYOffset,
    },
    bottomRightHydrogen: {
      x: moleculeCenterX + rightHydrogensXOffset,
      y: moleculeCenterY + rightHydrogensYOffset,
    },
    bottomLeftHydrogen: {
      x: moleculeCenterX - leftHydrogensXOffset,
      y: moleculeCenterY + leftHydrogensYOffset,
    },
  };
};

const determineNumberOfMolecules = (moleculeDistribution) => {
  return Object.values(moleculeDistribution).reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0,
  );
};

export const determineMoleculeCenterXs = (
  moleculeRowBeginsX,
  centralAtomRadius,
  spaceBetweenMolecules,
  moleculeDistribution,
) => {
  const numberOfMolecules = determineNumberOfMolecules(moleculeDistribution);
  const centerXs = new Array(numberOfMolecules)
    .fill()
    .map(
      (emptyElement, index) =>
        moleculeRowBeginsX +
        (2 * index + 1) * centralAtomRadius +
        index * spaceBetweenMolecules,
    );
  return centerXs;
};

export const distributeMoleculesRandomly = (moleculeDistribution) => {
  const arrayOfMolecules = [];
  const moleculeDistributionArray = Object.entries(moleculeDistribution);
  // moleculeDistributionArray is of the form [['Water', 5],['Methane', 10],...]
  moleculeDistributionArray.forEach(([moleculeName, moleculeNumber]) => {
    let counter = moleculeNumber;
    while (counter > 0) {
      arrayOfMolecules.push(moleculeName);
      counter -= 1;
    }
  });
  return _.shuffle(arrayOfMolecules);
};

export const generateThermometerRectanglePoints = (
  baseWidth,
  thermometerHeight,
) => {
  const pointOne = [0, 0];
  const pointTwo = [0, -thermometerHeight];
  const pointThree = [baseWidth, -thermometerHeight];
  const pointFour = [baseWidth, 0];
  return [...pointOne, ...pointTwo, ...pointThree, ...pointFour];
};

export const determineBulbCoordinates = (
  thermometerBeginsX,
  thermometerBeginsY,
  thermometerBaseWidth,
  thermometerBulbRadius,
) => {
  const halfBaseWidth = thermometerBaseWidth / 2;
  const yIndent = Math.sqrt(
    thermometerBulbRadius ** 2 - (thermometerBaseWidth / 2) ** 2,
  );
  return {
    x: thermometerBeginsX + halfBaseWidth,
    y: thermometerBeginsY + yIndent,
  };
};

export const determineThermometerScalePoints = (
  thermometerBeginsY,
  thermometerBodyHeight,
  numberOfGradations,
) => {
  const distanceBetweenGradations = thermometerBodyHeight / numberOfGradations;

  const gradationCoordinates = new Array(numberOfGradations)
    .fill()
    .map(
      (emptyElement, index) =>
        thermometerBeginsY - index * distanceBetweenGradations,
    );

  return gradationCoordinates;
};

export const generateSeaPoints = (seaBaseWidth, seaHeight, seaIndent) => {
  // first point of line is (0, 0), i.e. start drawing shape at (0, 0) offset from shape origin (specified in x/y props)
  const seaPointZero = [0, 0];

  // note that remaining points are offsets from origin
  // only three points are required - the 'closed' prop in the component closes the shape
  const seaPointOne = [seaBaseWidth, 0];
  const seaPointTwo = [seaBaseWidth + seaIndent, seaHeight];
  const seaPointThree = [0, seaHeight];

  return [...seaPointZero, ...seaPointOne, ...seaPointTwo, ...seaPointThree];
};
