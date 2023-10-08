import _ from 'lodash';
import {
  ATOM_DIMENSIONS,
  CARBON,
  OXYGEN,
  MOLECULE_DISTRIBUTION_MAX_X,
  MOLECULE_DISTRIBUTION_MIN_X,
  DISTRIBUTION_SCALARS,
  CARBON_DIOXIDE,
  SIMULATION_MODES,
  MARS_ZOOM_CARBON_DIOXIDE,
  VENUS_ZOOM_CARBON_DIOXIDE,
} from '../../constants';

// this function determines: (1) How many CO2 molecules can be veritcally placed on the sky,
// (2) What are the y-coordinates (as %s, to be multiplied in <Molecules> by skyHeight) of the center of these molecules
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

// given flat array of the form [{CO2}, {H2O}, {CO2}, ...], return chunked array where molecules are distributed on numberOfRows
export const chunkMolecules = (moleculeDistribution, simulationMode) => {
  const centerYs = determineMoleculeRowsCenterYs();
  const numberOfRows = centerYs.length;

  const chunkedDistribution = [];

  for (let i = numberOfRows; i > 0; i -= 1) {
    chunkedDistribution.push(
      moleculeDistribution.splice(
        0,
        Math.ceil(moleculeDistribution.length / i),
      ),
    );
  }

  return simulationMode === SIMULATION_MODES.MARS.name
    ? _.shuffle(chunkedDistribution)
    : chunkedDistribution;
};

// when zoomed in on the canvas, we want to see randomly scattered CO2/H2O/CH4 molecules
// when a user increases/decreases CO2/CH4 sliders, we want to see the number of these molecules on the screen increase/decrease
// this function returns an array distributing the _maximum_ number of CO2/H2O/CH4 molecules possible
// some of these will be 'switched off', i.e. do not appear on the screen
// as user increases CO2/CH4 sliders, switched off molecules become switched on (and vice-versa)
// pre-computing this maximal distribution is necessary; otherwise, every time CO2/CH4 are toggled, a new random distribution would be computed
// (and this would look odd, with molecules jumping around)
export const createMaxDistribution = (
  maxMoleculeCounts,
  scaleFactors = DISTRIBUTION_SCALARS,
) => {
  // in order to prevent the screen from being over-crowded with a particular molecule, we scale down the count of some molecules
  // for example, the app's upper limit for CO2 is 1000 ppm, but we scale this number down by 10
  // hence, the maximum number of CO2 molecules displayed is 1000 / 10 = 100
  const adjustedCounts = maxMoleculeCounts.map(({ name, maxCount }) => ({
    name,
    maxCount: Math.floor(maxCount / scaleFactors[name]),
  }));

  let allMolecules = [];
  adjustedCounts.forEach(({ name, maxCount }) => {
    let rank = 0;
    const moleculeArray = new Array(maxCount).fill().map(() => {
      rank += 1;
      return {
        name,
        switchedOn: false,
        rank,
        centerX:
          Math.random() *
            (MOLECULE_DISTRIBUTION_MAX_X - MOLECULE_DISTRIBUTION_MIN_X) +
          MOLECULE_DISTRIBUTION_MIN_X,
        rotation: Math.random() * 180,
      };
    });
    allMolecules = [...allMolecules, ...moleculeArray];
  });

  return _.shuffle(allMolecules);
};

const createCustomDistribution = (simulationMode) => {
  const carbonDioxideCount =
    simulationMode === SIMULATION_MODES.MARS.name
      ? MARS_ZOOM_CARBON_DIOXIDE
      : VENUS_ZOOM_CARBON_DIOXIDE;

  return new Array(carbonDioxideCount).fill().map(() => ({
    name: CARBON_DIOXIDE,
    switchedOn: true,
    centerX: Math.random(),
    rotation: Math.random() * 180,
  }));
};

// given a maximum distribution and the current levels of CO2/H2O/CH4, switch on/off CO2/H2O/CH4 molecules to match these levels
export const distributeMolecules = (
  maxDistribution,
  newDistribution,
  simulationMode,
  scaleFactors = DISTRIBUTION_SCALARS,
) => {
  if (
    simulationMode === SIMULATION_MODES.MARS.name ||
    simulationMode === SIMULATION_MODES.VENUS.name
  ) {
    return createCustomDistribution(simulationMode);
  }

  const distributionCopy = [...maxDistribution];

  newDistribution.forEach(({ name, count: newCount }) => {
    const currentCount = distributionCopy.filter(
      (molecule) => molecule.name === name && molecule.switchedOn,
    ).length;

    const adjustedNewCount = Math.floor(newCount / scaleFactors[name]);
    const change = adjustedNewCount - currentCount;
    const startOn = change > 0 ? currentCount : currentCount + 1;

    for (let i = 1; i <= change; i += 1) {
      const rank = distributionCopy.findIndex(
        (molecule) =>
          molecule.rank === startOn + i * Math.sign(change) &&
          molecule.name === name,
      );
      distributionCopy[rank] = {
        ...distributionCopy[rank],
        switchedOn: !distributionCopy[rank].switchedOn,
      };
    }
  });

  return distributionCopy;
};
