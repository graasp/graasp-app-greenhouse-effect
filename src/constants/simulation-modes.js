import { GROUND, SKY } from './canvas/backgrounds';
import { ICE_AGE, MARS, TODAY, PRE_INDUSTRIAL, VENUS } from './strings';
import { SOLAR_FLUXES } from './physics';
import {
  computeAlbedo,
  computeGreenhouseEffect,
  computeTemperature,
  computeWaterVapor,
  kelvinToCelsius,
} from '../utils/physics';

export const RADIATION_MODES = {
  WAVES: 'waves',
  FLUXES: 'fluxes',
};

export const SIMULATION_MODES = {
  ICE_AGE: {
    name: ICE_AGE,
    carbonDioxide: 200,
    methane: 0.4,
    waterVapor: 5066,
    iceCover: 20,
    cloudCover: 30,
    cTerm: 0.204,
    solarFlux: SOLAR_FLUXES[ICE_AGE],
    groundColorRange: GROUND.colorRange.earth,
    groundColorRangePaused: GROUND.colorRangePaused.earth,
    skyColorRange: SKY.colorRange.earth,
    skyColorRangePaused: SKY.colorRangePaused.earth,
  },
  PRE_INDUSTRIAL: {
    name: PRE_INDUSTRIAL,
    carbonDioxide: 290,
    methane: 1,
    waterVapor: 7253,
    iceCover: 10,
    cloudCover: 40,
    cTerm: 0.227,
    solarFlux: SOLAR_FLUXES[PRE_INDUSTRIAL],
    groundColorRange: GROUND.colorRange.earth,
    groundColorRangePaused: GROUND.colorRangePaused.earth,
    skyColorRange: SKY.colorRange.earth,
    skyColorRangePaused: SKY.colorRangePaused.earth,
  },
  TODAY: {
    name: TODAY,
    carbonDioxide: 413.2,
    methane: 1.9,
    waterVapor: 7748,
    iceCover: 10,
    cloudCover: 40,
    cTerm: 0.231,
    solarFlux: SOLAR_FLUXES[TODAY],
    groundColorRange: GROUND.colorRange.earth,
    groundColorRangePaused: GROUND.colorRangePaused.earth,
    skyColorRange: SKY.colorRange.earth,
    skyColorRangePaused: SKY.colorRangePaused.earth,
  },
  MARS: {
    name: MARS,
    carbonDioxide: 965000,
    methane: 0,
    waterVapor: 210,
    iceCover: 2,
    cloudCover: 0,
    cTerm: 0,
    solarFlux: SOLAR_FLUXES[MARS],
    groundColorRange: GROUND.colorRange.mars,
    groundColorRangePaused: GROUND.colorRangePaused.mars,
    skyColorRange: SKY.colorRange.mars,
    skyColorRangePaused: SKY.colorRangePaused.mars,
  },
  VENUS: {
    name: VENUS,
    carbonDioxide: 965000,
    methane: 0,
    waterVapor: 20,
    iceCover: 0,
    cloudCover: 100,
    cTerm: 0,
    solarFlux: SOLAR_FLUXES[VENUS],
    groundColorRange: GROUND.colorRange.venus,
    groundColorRangePaused: GROUND.colorRangePaused.venus,
    skyColorRange: SKY.colorRange.venus,
    skyColorRangePaused: SKY.colorRangePaused.venus,
  },
};

export const INITIAL_SIMULATION_MODE = SIMULATION_MODES.PRE_INDUSTRIAL;
const INITIAL_ICE_COVER = INITIAL_SIMULATION_MODE.iceCover;
const INITIAL_CLOUD_COVER = INITIAL_SIMULATION_MODE.cloudCover;
const INITIAL_CARBON_DIOXIDE = INITIAL_SIMULATION_MODE.carbonDioxide;
const INITIAL_METHANE = INITIAL_SIMULATION_MODE.methane;
const INITIAL_C_TERM = INITIAL_SIMULATION_MODE.cTerm;
export const INITIAL_ALBEDO = computeAlbedo(
  INITIAL_ICE_COVER,
  INITIAL_CLOUD_COVER,
  INITIAL_SIMULATION_MODE.name,
);
export const INITIAL_GREENHOUSE_EFFECT = computeGreenhouseEffect(
  INITIAL_CARBON_DIOXIDE,
  INITIAL_METHANE,
  INITIAL_C_TERM,
  INITIAL_SIMULATION_MODE.name,
);
export const INITIAL_TEMPERATURE = computeTemperature(
  INITIAL_GREENHOUSE_EFFECT,
  INITIAL_ALBEDO.totalAlbedo,
  INITIAL_SIMULATION_MODE.name,
);
const INITIAL_WATER_VAPOR = computeWaterVapor(
  kelvinToCelsius(INITIAL_TEMPERATURE),
);
export const INITIAL_VARIABLES = {
  iceCover: INITIAL_ICE_COVER,
  cloudCover: INITIAL_CLOUD_COVER,
  carbonDioxide: INITIAL_CARBON_DIOXIDE,
  methane: INITIAL_METHANE,
  greenhouseEffect: INITIAL_GREENHOUSE_EFFECT,
  albedo: INITIAL_ALBEDO,
  temperature: INITIAL_TEMPERATURE,
  waterVapor: INITIAL_WATER_VAPOR,
  cTerm: INITIAL_C_TERM,
};

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
