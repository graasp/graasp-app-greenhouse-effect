import { GROUND, SKY } from './canvas/backgrounds';

export const RADIATION_MODES = {
  WAVES: 'waves',
  FLUXES: 'fluxes',
};

export const SIMULATION_MODES = {
  ICE_AGE: {
    name: 'Ice Age',
    carbonDioxide: 200,
    methane: 0.4,
    waterVapor: 5066,
    iceCover: 20,
    cloudCover: 30,
    cTerm: 0.204,
    solarFlux: 340,
    groundColorRange: GROUND.colorRange.earth,
    groundColorRangePaused: GROUND.colorRangePaused.earth,
    skyColorRange: SKY.colorRange.earth,
    skyColorRangePaused: SKY.colorRangePaused.earth,
  },
  TWENTIETH_CENTURY: {
    name: '1900',
    carbonDioxide: 290,
    methane: 1,
    waterVapor: 7253,
    iceCover: 10,
    cloudCover: 40,
    cTerm: 0.227,
    solarFlux: 340,
    groundColorRange: GROUND.colorRange.earth,
    groundColorRangePaused: GROUND.colorRangePaused.earth,
    skyColorRange: SKY.colorRange.earth,
    skyColorRangePaused: SKY.colorRangePaused.earth,
  },
  TODAY: {
    name: '2020',
    carbonDioxide: 413.2,
    methane: 1.9,
    waterVapor: 7748,
    iceCover: 10,
    cloudCover: 40,
    cTerm: 0.231,
    solarFlux: 340,
    groundColorRange: GROUND.colorRange.earth,
    groundColorRangePaused: GROUND.colorRangePaused.earth,
    skyColorRange: SKY.colorRange.earth,
    skyColorRangePaused: SKY.colorRangePaused.earth,
  },
  MARS: {
    name: 'Mars',
    carbonDioxide: 965000,
    methane: 0,
    waterVapor: 210,
    iceCover: 2,
    cloudCover: 0,
    cTerm: 0,
    solarFlux: 147,
    groundColorRange: GROUND.colorRange.mars,
    groundColorRangePaused: GROUND.colorRangePaused.mars,
    skyColorRange: SKY.colorRange.mars,
    skyColorRangePaused: SKY.colorRangePaused.mars,
  },
  VENUS: {
    name: 'Venus',
    carbonDioxide: 965000,
    methane: 0,
    waterVapor: 20,
    iceCover: 0,
    cloudCover: 100,
    cTerm: 0,
    solarFlux: 650,
    groundColorRange: GROUND.colorRange.venus,
    groundColorRangePaused: GROUND.colorRangePaused.venus,
    skyColorRange: SKY.colorRange.venus,
    skyColorRangePaused: SKY.colorRangePaused.venus,
  },
};

export const INITIAL_SIMULATION_MODE = SIMULATION_MODES.TODAY;
export const INITIAL_ICE_COVER = INITIAL_SIMULATION_MODE.iceCover;
export const INITIAL_CLOUD_COVER = INITIAL_SIMULATION_MODE.cloudCover;
export const INITIAL_CARBON_DIOXIDE = INITIAL_SIMULATION_MODE.carbonDioxide;
export const INITIAL_METHANE = INITIAL_SIMULATION_MODE.methane;
export const INITIAL_C_TERM = INITIAL_SIMULATION_MODE.cTerm;

export const SOLAR_FLUXES = Object.fromEntries(
  Object.entries(
    SIMULATION_MODES,
    // eslint-disable-next-line no-unused-vars
  ).map(([simulationMode, simulationModeDetails]) => [
    simulationModeDetails.name,
    simulationModeDetails.solarFlux,
  ]),
);

export const GROUND_COLOR_RANGES = Object.fromEntries(
  Object.entries(
    SIMULATION_MODES,
    // eslint-disable-next-line no-unused-vars
  ).map(([simulationMode, simulationModeDetails]) => [
    simulationModeDetails.name,
    simulationModeDetails.groundColorRange,
  ]),
);

export const GROUND_PAUSED_COLOR_RANGES = Object.fromEntries(
  Object.entries(
    SIMULATION_MODES,
    // eslint-disable-next-line no-unused-vars
  ).map(([simulationMode, simulationModeDetails]) => [
    simulationModeDetails.name,
    simulationModeDetails.groundColorRangePaused,
  ]),
);

export const SKY_COLOR_RANGES = Object.fromEntries(
  Object.entries(
    SIMULATION_MODES,
    // eslint-disable-next-line no-unused-vars
  ).map(([simulationMode, simulationModeDetails]) => [
    simulationModeDetails.name,
    simulationModeDetails.skyColorRange,
  ]),
);

export const SKY_PAUSED_COLOR_RANGES = Object.fromEntries(
  Object.entries(
    SIMULATION_MODES,
    // eslint-disable-next-line no-unused-vars
  ).map(([simulationMode, simulationModeDetails]) => [
    simulationModeDetails.name,
    simulationModeDetails.skyColorRangePaused,
  ]),
);
