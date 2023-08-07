import { ICE_AGE, MARS, TODAY, PRE_INDUSTRIAL, VENUS } from './strings';

export const STEFAN_BOLTZMANN_CONSTANT = 5.670367e-8;
export const ZERO_KELVIN_IN_CELISUS = 273.15;

// above this temperature, the earth has heated so much that for all purposes there's no difference
export const MAX_TEMPERATURE_DISPLAYED_ON_EARTH_CELSIUS = 30;

// these constants are used (1) in the feedback effects, to break the iterative loop if it exceeds/falls below these values
// (2) in sliders
export const ICE_COVER_MAX_VALUE = 100;
export const ICE_COVER_MIN_VALUE = 0;
export const GREENHOUSE_EFFECT_MAX_VALUE = 1;
export const GREENHOUSE_EFFECT_MIN_VALUE = 0;
export const GREENHOUSE_TOTAL_EFFECT_MAX_VALUE =
  GREENHOUSE_EFFECT_MAX_VALUE * 100;
export const ALBEDO_MAX_VALUE = 100;
export const CARBON_DIOXIDE_CONCENTRATION_MAX_VALUE_DEFAULT = 1000;
export const CARBON_DIOXIDE_CONCENTRATION_MAX_VALUE_ON_MARS_OR_VENUS = 1e6;
export const METHANE_CONCENTRATION_MAX_VALUE = 5;
export const METHANE_SLIDER_STEP = 0.1;
export const WATER_CONCENTRATION_MIN_VALUE_DEFAULT = 3000;
export const WATER_CONCENTRATION_MIN_VALUE_ON_MARS_OR_VENUS = 0;
export const WATER_CONCENTRATION_MAX_VALUE = 19000;
export const CLOUD_COVER_MAX_VALUE = 100;
export const CLOUD_COVER_MIN_VALUE = 20;

export const SOLAR_FLUXES = {};
SOLAR_FLUXES[ICE_AGE] = 340;
SOLAR_FLUXES[PRE_INDUSTRIAL] = 340;
SOLAR_FLUXES[TODAY] = 340;
SOLAR_FLUXES[MARS] = 147;
SOLAR_FLUXES[VENUS] = 650;

export const CRYOSPHERE_ALBEDO = 0.54;
export const CLOUD_ALBEDO = 0.49;
export const SOIL_ALBEDO_TODAY = 0.071;
export const SOIL_ALBEDO_PREVIOUS_ERAS = 0.051;
