import _ from 'lodash';
import {
  CLOUD_ADJACENT_CIRCLE_RADIUS,
  ATOM_DIMENSIONS,
  CARBON,
  CLOUD_CENTRAL_CIRCLE_Y,
  ICE_CAP_TRAPEZIUM_INDENT,
  OXYGEN,
  CLOUD_PERIPHERAL_CIRCLE_RADIUS,
  MOLECULE_DISTRIBUTION_MAX_X,
  MOLECULE_DISTRIBUTION_MIN_X,
  CLOUD_ELLIPSE_RADIUS_X,
  CLOUD_ELLIPSE_RADIUS_Y,
  CLOUD_CENTRAL_CIRCLE_X,
} from '../config/constants';

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
  const adjacentCircleRadius =
    centralCircleRadius * CLOUD_ADJACENT_CIRCLE_RADIUS;
  const peripheralCircleRadius =
    centralCircleRadius * CLOUD_PERIPHERAL_CIRCLE_RADIUS;

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

// given a moleculeDistribution of the form {CO2: N, H2O: M, CH4: K}, where N, M, K are integers (counts of each molecule)
// return a flat array of the form [CO2, H2O, CO2, CH4, ...] where the molecules are distributed randomly
const distributeMoleculesRandomly = (moleculeDistribution) => {
  let arrayOfMolecules = [];
  const moleculeDistributionArray = Object.entries(moleculeDistribution);
  // moleculeDistributionArray is of the form [['Water', 5],['Methane', 10],...]
  moleculeDistributionArray.forEach(([moleculeName, moleculeNumber]) => {
    const moleculeArray = Array.from(
      { length: moleculeNumber },
      () => moleculeName,
    );
    arrayOfMolecules = [...arrayOfMolecules, ...moleculeArray];
  });
  return _.shuffle(arrayOfMolecules);
};

// this function determines: (1) How many CO2 molecules can be veritcally placed on the sky?,
// (2) What are the y-coordinates (as %s, to be multiplied in <Molecules> by skyHeight) of the center of these molecules?
// (noting that the CO2 is the longest molecule in the application)
export const determineMoleculeRowsCenterYs = () => {
  const carbonRadius = ATOM_DIMENSIONS[CARBON.size];
  const oxygenRadius = ATOM_DIMENSIONS[OXYGEN.size];
  const carbonDiameter = 2 * carbonRadius;
  const oxygenDiameter = 2 * oxygenRadius;
  const carbonDioxideHeight = carbonDiameter + 2 * oxygenDiameter;

  const numberOfRows = Math.floor(1 / carbonDioxideHeight);
  const firstCarbonDioxideCenterY = oxygenDiameter + carbonRadius;

  const centerYs = new Array(numberOfRows)
    .fill()
    .map(
      (emptyElement, index) =>
        firstCarbonDioxideCenterY + carbonDioxideHeight * index,
    );

  return centerYs;
};

// given a moleculeDistribution of the form {CO2: N, H2O: M, CH4: K}, where N, M, K are integers (counts of each molecule):
// (1) use distributeMoleculesRandomly to get a flat array of the form [CO2, H2O, CO2, CH4, ...],
// (2) return a chunked array where the molecules are distributed on the numberOfRows available
export const chunkMolecules = (moleculeDistribution) => {
  const centerYs = determineMoleculeRowsCenterYs();
  const numberOfRows = centerYs.length;

  const randomDistribution = distributeMoleculesRandomly(moleculeDistribution);

  const chunkedDistribution = [];

  for (let i = numberOfRows; i > 0; i -= 1) {
    chunkedDistribution.push(
      randomDistribution.splice(0, Math.ceil(randomDistribution.length / i)),
    );
  }

  return chunkedDistribution;
};

// given a moleculeDistribution of the form {CO2: N, H2O: M, CH4: K}, where N, M, K are integers (counts of each molecule),
// (1) find the chunked distribution of these molecules,
// (2) return the x-coordinates (randomly determined) (as %s, to be multiplied in <Molecules> by stageWidth) of each molecule
export const determineMoleculesWithinRowCenterXs = (moleculeDistribution) => {
  const chunkedMolecules = chunkMolecules(moleculeDistribution);

  const centerXs = chunkedMolecules.map((moleculeRow) => {
    return moleculeRow.map(
      () =>
        Math.random() *
          (MOLECULE_DISTRIBUTION_MAX_X - MOLECULE_DISTRIBUTION_MIN_X) +
        MOLECULE_DISTRIBUTION_MIN_X,
    );
  });
  return centerXs;
};

export const computeCloudEllipseRadiuses = ({
  cloudCover,
  skyHeight,
  skyWidth,
  skyBeginsY = 0,
}) => {
  // we determine the size of the circles of the cloud from a central circle we define (using generateCloudCircles below)
  const centralCircleRadius = (cloudCover / 500) * skyHeight;
  const centralCircleX = CLOUD_CENTRAL_CIRCLE_X * skyWidth;
  const centralCircleY = skyBeginsY + CLOUD_CENTRAL_CIRCLE_Y * skyHeight;

  const cloudEllipseRadiusX = centralCircleRadius * CLOUD_ELLIPSE_RADIUS_X;
  const cloudEllipseRadiusY = centralCircleRadius * CLOUD_ELLIPSE_RADIUS_Y;

  return {
    centralCircleRadius,
    cloudEllipseRadiusX,
    cloudEllipseRadiusY,
    centralCircleX,
    centralCircleY,
  };
};
