import _ from 'lodash';
import {
  resetFluxesFills,
  setCTerm,
  setSliderIceCover,
  setThermometerIceCover,
  setThermometerValues,
  toggleFluxesFills,
} from '../actions';
import {
  CLOUD_ADJACENT_CIRCLE_RADIUS,
  ATOM_DIMENSIONS,
  CARBON,
  ICE_CAP_TRAPEZIUM_INDENT,
  OXYGEN,
  CLOUD_PERIPHERAL_CIRCLE_RADIUS,
  MOLECULE_DISTRIBUTION_MAX_X,
  MOLECULE_DISTRIBUTION_MIN_X,
  GREENHOUSE_GASES_DISTRIBUTION,
  UP_STRING,
  FLUX_WIDTH_AS_PERCENTAGE_OF_FLUX_VALUE,
  MAXIMUM_FLUX_WIDTH_AS_PERCENTAGE_OF_STAGE_WIDTH,
  Y_SHIFT_PER_INTERVAL,
  Y_INCREMENT,
  VISIBLE_LIGHT_PERIOD,
  THERMOMETER_SCALE_STEP,
  MINIMUM_THERMOMETER_TEMPERATURE_CELSIUS,
  SCALE_UNITS,
  MAX_TEMPERATURE_DISPLAYED_ON_EARTH_CELSIUS,
  SIMULATION_MODES,
  LARGE_FLUX,
  FLUX_BLINKING_INTERVAL,
  GROUND_TO_SKY,
  SKY_TO_GROUND,
  SKY_TO_ATMOSPHERE,
  GROUND_TO_ATMOSPHERE,
} from '../config/constants';
import { celsiusToKelvin, kelvinToCelsius } from './greenhouseEffect';

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

export const generateCloudCircles = (
  centralCircleRadiusX,
  centralCircleRadiusY,
  centralCircleX,
) => {
  const adjacentCircleRadiusX =
    centralCircleRadiusX * CLOUD_ADJACENT_CIRCLE_RADIUS;
  const adjacentCircleRadiusY =
    centralCircleRadiusY * CLOUD_ADJACENT_CIRCLE_RADIUS;
  const peripheralCircleRadiusX =
    centralCircleRadiusX * CLOUD_PERIPHERAL_CIRCLE_RADIUS;
  const peripheralCircleRadiusY =
    centralCircleRadiusY * CLOUD_PERIPHERAL_CIRCLE_RADIUS;

  const circleOne = {
    radiusX: peripheralCircleRadiusX,
    radiusY: peripheralCircleRadiusY,
    x: centralCircleX - centralCircleRadiusX - adjacentCircleRadiusX,
  };

  const circleTwo = {
    radiusX: adjacentCircleRadiusX,
    radiusY: adjacentCircleRadiusY,
    x: centralCircleX - centralCircleRadiusX,
  };

  const circleThree = {
    radiusX: centralCircleRadiusX,
    radiusY: centralCircleRadiusY,
    x: centralCircleX,
  };

  const circleFour = {
    radiusX: adjacentCircleRadiusX,
    radiusY: adjacentCircleRadiusY,
    x: centralCircleX + centralCircleRadiusX,
  };

  const circleFive = {
    radiusX: peripheralCircleRadiusX,
    radiusY: peripheralCircleRadiusY,
    x: centralCircleX + centralCircleRadiusX + adjacentCircleRadiusX,
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
  rotation,
) => {
  const { x: moleculeCenterX, y: moleculeCenterY } = moleculeCenter;
  return {
    topOxygen: {
      x: moleculeCenterX + carbonRadius * Math.cos(rotation),
      y: moleculeCenterY - carbonRadius - oxygenRadius,
    },
    carbon: { x: moleculeCenterX, y: moleculeCenterY },
    bottomOxygen: {
      x: moleculeCenterX + carbonRadius * Math.cos(rotation),
      y: moleculeCenterY + carbonRadius + oxygenRadius,
    },
  };
};

export const determineWaterAtomsCoordinates = (
  moleculeCenter,
  oxygenRadius,
  hydrogenRadius,
  rotation,
) => {
  const { x: moleculeCenterX, y: moleculeCenterY } = moleculeCenter;
  const hydrogenXOffset = Math.sin((45 * Math.PI) / 180) * oxygenRadius;
  const hydrogenYOffset =
    Math.cos((45 * Math.PI) / 180) * oxygenRadius + hydrogenRadius;
  return {
    topHydrogen: {
      x: moleculeCenterX - hydrogenXOffset * Math.cos(rotation),
      y: moleculeCenterY - hydrogenYOffset * Math.sin(rotation),
    },
    oxygen: { x: moleculeCenterX, y: moleculeCenterY },
    bottomHydrogen: {
      x: moleculeCenterX - hydrogenXOffset * Math.cos(rotation),
      y: moleculeCenterY + hydrogenYOffset * Math.sin(rotation),
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
  thermometerBaseWidth,
  thermometerBulbRadius,
) => {
  const halfBaseWidth = thermometerBaseWidth / 2;
  const yIndent = Math.sqrt(
    thermometerBulbRadius ** 2 - (thermometerBaseWidth / 2) ** 2,
  );
  return {
    x: halfBaseWidth,
    y: yIndent,
  };
};

export const generateThermometerLabels = (numGrades, scaleName) => {
  let minimumTemperature = MINIMUM_THERMOMETER_TEMPERATURE_CELSIUS;
  if (scaleName === SCALE_UNITS.KELVIN.name) {
    minimumTemperature = celsiusToKelvin(minimumTemperature);
  }

  return new Array(numGrades)
    .fill()
    .map(
      (emptyElement, index) =>
        minimumTemperature + index * THERMOMETER_SCALE_STEP,
    );
};

export const determineThermometerFillHeight = (temperature, scaleValues) => {
  const scaleMinimum = Math.min(...scaleValues);
  const scaleMaximum = Math.max(...scaleValues);
  const scaleRange = scaleMaximum - scaleMinimum;
  if (temperature < scaleMinimum) {
    return 0;
  }
  if (temperature > scaleMaximum) {
    return 1;
  }
  return (temperature - scaleMinimum) / scaleRange;
};

export const createTemperatureLabel = (
  temperatureInKelvin,
  scaleName,
  scaleLabel,
  simulationMode,
) => {
  const maxTemperature =
    scaleName === SCALE_UNITS.CELSIUS.name
      ? MAX_TEMPERATURE_DISPLAYED_ON_EARTH_CELSIUS
      : Math.round(celsiusToKelvin(MAX_TEMPERATURE_DISPLAYED_ON_EARTH_CELSIUS));

  const temperature =
    scaleName === SCALE_UNITS.CELSIUS.name
      ? kelvinToCelsius(temperatureInKelvin)
      : temperatureInKelvin;

  if (simulationMode === SIMULATION_MODES.VENUS.name) {
    return `${Math.round(temperature)}${scaleLabel}`;
  }

  return temperature > maxTemperature
    ? `${maxTemperature}${scaleLabel}+`
    : `${temperature.toFixed(1)}${scaleLabel}`;
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
export const determineMoleculesWithinRowCenterXs = (chunkedMolecules) => {
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

export const adjustGreenhouseGasesDistribution = ({
  carbonDioxide,
  methane,
  water,
}) => ({
  methane: methane / GREENHOUSE_GASES_DISTRIBUTION.METHANE,
  carbonDioxide: carbonDioxide / GREENHOUSE_GASES_DISTRIBUTION.CARBON_DIOXIDE,
  water: water / GREENHOUSE_GASES_DISTRIBUTION.WATER,
});

// given an ice cover %, calculate how much of land and mountains is covered by ice
// formula provided by teachers
export const computeIcePercentage = (iceCover) => {
  if (iceCover >= 0.1 && iceCover < 0.55) {
    return 2 * iceCover - 0.1;
  }
  if (iceCover < 0.1 && iceCover >= 0.05) {
    return 0.05;
  }
  if (iceCover < 0.05) {
    return 0;
  }
  // remaining case is when iceCover >= 0.55, in which case ice coverage is 100%
  return 1;
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

export const generateFluxPointerPoints = (
  direction,
  pointerWidth,
  pointerHeight,
) => {
  return direction === UP_STRING
    ? [0, 0, pointerWidth / 2, pointerHeight, -pointerWidth / 2, pointerHeight]
    : [0, 0, pointerWidth / 2, 0, 0, pointerHeight, -pointerWidth / 2, 0];
};

// remember, points on a Konva line are an array of the form [x_0, y_0, x_1, y_1, ..., x_n, y_n]
// each pair in that array represents an offset from the origin of the line
// we want to draw the line y = amplitude * sin(period * x)
// because the line we're drawing is vertical, our equation is in fact x = amplitude * sin(period * y)
// i.e. y point is given, x point is determined
// hence we can create a loop: start at a given y, increment y by yIncrement
// the choice of increment is relevant: the more y points are input, the more the line is 'filled out'
export const generateSineCurve = (
  currentInterval,
  startingPoint,
  absorptionPoint,
  amplitude,
  period = VISIBLE_LIGHT_PERIOD,
  yShiftPerInterval = Y_SHIFT_PER_INTERVAL,
  yIncrement = Y_INCREMENT,
) => {
  const sineCurvePoints = [];
  const curveDirection = startingPoint > absorptionPoint ? 1 : -1;
  const curveHeight = Math.abs(startingPoint - absorptionPoint);
  const intervalsToReachAbsorptionPoint = curveHeight / yShiftPerInterval;
  if (currentInterval <= intervalsToReachAbsorptionPoint) {
    let y = 0;
    while (y < currentInterval * yShiftPerInterval) {
      sineCurvePoints.push(amplitude * Math.sin(y * period));
      sineCurvePoints.push(
        curveDirection * (y - currentInterval * yShiftPerInterval),
      );
      y += yIncrement;
    }
  } else {
    let y =
      (currentInterval - intervalsToReachAbsorptionPoint) * yShiftPerInterval;
    while (
      y <
      curveHeight +
        (currentInterval - intervalsToReachAbsorptionPoint) * yShiftPerInterval
    ) {
      sineCurvePoints.push(amplitude * Math.sin(y * period));
      sineCurvePoints.push(
        curveDirection * (y - currentInterval * yShiftPerInterval),
      );
      y += yIncrement;
    }
  }
  return sineCurvePoints;
};

export const calculateFluxWidth = (flux, stageWidth) => {
  if (flux > LARGE_FLUX) {
    // if a flux is LARGE, take maximum possible flux size and scale it by 1.35
    return stageWidth * MAXIMUM_FLUX_WIDTH_AS_PERCENTAGE_OF_STAGE_WIDTH * 1.35;
  }

  // to ensure fluxes aren't too large, cap their size via Math.min(...)
  return Math.min(
    flux * FLUX_WIDTH_AS_PERCENTAGE_OF_FLUX_VALUE,
    stageWidth * MAXIMUM_FLUX_WIDTH_AS_PERCENTAGE_OF_STAGE_WIDTH,
  );
};

export const stopFluxesBlinking = () => {
  clearInterval(window.fluxBlinkingInterval);
};

export const keepFluxesBlinking = (fluxes, dispatch) => {
  stopFluxesBlinking();
  window.fluxBlinkingInterval = setInterval(() => {
    dispatch(toggleFluxesFills(fluxes));
  }, FLUX_BLINKING_INTERVAL);
};

export const graduallyDispatchCTerms = (cTerms, dispatch, delay) => {
  for (let i = 0; i < cTerms.length; i += 1) {
    setTimeout(() => {
      dispatch(
        toggleFluxesFills([GROUND_TO_SKY, SKY_TO_GROUND, SKY_TO_ATMOSPHERE]),
      );
      dispatch(setCTerm(cTerms[i]));
      if (i === cTerms.length - 1) {
        dispatch(resetFluxesFills());
      }
    }, delay * (i + 1));
  }
};

export const graduallyDispatchIceCoverTerms = (
  iceCoverTerms,
  dispatch,
  delay,
) => {
  for (let i = 0; i < iceCoverTerms.length; i += 1) {
    setTimeout(() => {
      dispatch(
        toggleFluxesFills([
          GROUND_TO_SKY,
          SKY_TO_GROUND,
          SKY_TO_ATMOSPHERE,
          GROUND_TO_ATMOSPHERE,
        ]),
      );
      dispatch(setSliderIceCover(iceCoverTerms[i]));
      dispatch(setThermometerIceCover(iceCoverTerms[i]));
      if (i === iceCoverTerms.length - 1) {
        dispatch(resetFluxesFills());
      }
    }, delay * (i + 1));
  }
};

export const graduallyDispatchThermometerValues = (
  targetValues,
  originalValues,
  numIncrements,
  delay,
  dispatch,
  blinkEarthFluxes = true,
) => {
  const {
    sliderIceCover,
    sliderCloudCover,
    sliderCarbonDioxide,
    sliderMethane,
  } = targetValues;

  const {
    thermometerIceCover,
    thermometerCloudCover,
    thermometerCarbonDioxide,
    thermometerMethane,
  } = originalValues;

  const iceCoverIncrement =
    (sliderIceCover - thermometerIceCover) / numIncrements;
  const cloudCoverIncrement =
    (sliderCloudCover - thermometerCloudCover) / numIncrements;
  const carbonDioxideIncrement =
    (sliderCarbonDioxide - thermometerCarbonDioxide) / numIncrements;
  const methaneIncrement = (sliderMethane - thermometerMethane) / numIncrements;

  for (let i = 1; i <= numIncrements; i += 1) {
    setTimeout(() => {
      if (blinkEarthFluxes) {
        dispatch(
          toggleFluxesFills([GROUND_TO_SKY, SKY_TO_GROUND, SKY_TO_ATMOSPHERE]),
        );
      }
      dispatch(
        setThermometerValues({
          iceCover: thermometerIceCover + iceCoverIncrement * i,
          cloudCover: thermometerCloudCover + cloudCoverIncrement * i,
          carbonDioxide: thermometerCarbonDioxide + carbonDioxideIncrement * i,
          methane: thermometerMethane + methaneIncrement * i,
        }),
      );
      if (i === numIncrements) {
        dispatch(resetFluxesFills());
      }
    }, delay * (i - 1));
  }
};
