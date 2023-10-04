import { ICE_AGE, MARS, TODAY, PRE_INDUSTRIAL, VENUS } from './strings';

export const STEFAN_BOLTZMANN_CONSTANT = 5.670367e-8;
export const ZERO_KELVIN_IN_CELISUS = 273.15;
export const MAX_TEMPERATURE_DISPLAYED_ON_EARTH_CELSIUS = 30;

export const MAX_ICE_COVER = 100;
export const MIN_ICE_COVER = 0;
export const MAX_GHE = 1;
export const MIN_GHE = 0;
export const MAX_TOTAL_GHE = MAX_GHE * 100;
export const MAX_ALBEDO = 100;
export const MAX_CARBON_DIOXIDE_DEFAULT = 1000;
export const MAX_CARBON_DIOXIDE_MARS_VENUS = 1e6;
export const MAX_METHANE = 5;
export const METHANE_SLIDER_STEP = 0.1;
export const MIN_WATER_DEFAULT = 3000;
export const MIN_WATER_MARS_VENUS = 0;
export const MAX_WATER = 19000;
export const MAX_CLOUD_COVER = 100;
export const MIN_CLOUD_COVER = 20;

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
