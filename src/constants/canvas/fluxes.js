export const SUN_FLUXES_DEFAULT_COLOR = 'yellow';
export const SUN_FLUXES_DARK_COLOR = '#E8D24E';
export const EARTH_FLUXES_DEFAULT_COLOR = 'red';
export const EARTH_FLUXES_DARK_COLOR = 'darkred';

export const CLOUD_TO_ATMOSPHERE_FLUX_ROTATION = -20;
export const GROUND_TO_ATMOSPHERE_FLUX_ROTATION = -10;
export const SKY_TO_ATMOSPHERE_FLUX_ROTATION = 20;
export const SKY_TO_GROUND_FLUX_ROTATION = -20;

// three constants below used to position earth fluxes relative to stageWidth
// this is to ensure consistent placement across earth/non-earth planets
// (non-earth planets have no sea, hence differing ground dimensions, hence the need to position relative to stageWidth)
export const GROUND_TO_SKY_EARTH_FLUX_ADJUSTMENT = 1.1;
export const SKY_TO_ATMOSPHERE_EARTH_FLUX_ADJUSTMENT = 1.25;
export const SKY_TO_GROUND_EARTH_FLUX_ADJUSTMENT = 1.4;
// if a flux pointer is <25px, use a smaller font size; otherwise, the flux can accommodate a larger font
export const WIDE_FLUX_MINIMUM_WIDTH = 25;
export const FLUX_LABEL_LARGE_FONT_SIZE = 16;
export const FLUX_LABEL_SMALL_FONT_SIZE = 13;

// constants used in the creation of waves and flux arrows
export const ENERGY_WIDTH_AS_PERCENTAGE_OF_ENERGY_VALUE = 0.55;
export const LARGE_ENERGY_WIDTH_AS_PERCENTAGE_OF_STAGE_WIDTH = 0.25;
export const EXTRA_LARGE_ENERGY_WIDTH_AS_PERCENTAGE_OF_STAGE_WIDTH = 0.3;
export const FLUX_POINTER_HEIGHT_AS_PERCENTAGE_OF_POINTER_WIDTH = 0.4;
export const MINIMUM_FLUX_POINTER_HEIGHT = 22.5;
export const FLUX_BODY_WIDTH_AS_PERCENTAGE_OF_TOTAL_WIDTH = 0.7;
export const LARGE_ENERGY = 600;
export const EXTRA_LARGE_ENERGY = 1000;

export const SUN_TO_CLOUD = {
  name: 'sunToCloud',
  defaultFill: SUN_FLUXES_DEFAULT_COLOR,
  darkFill: SUN_FLUXES_DARK_COLOR,
};
export const CLOUD_TO_GROUND = {
  name: 'cloudToGround',
  defaultFill: SUN_FLUXES_DEFAULT_COLOR,
  darkFill: SUN_FLUXES_DARK_COLOR,
};
export const CLOUD_TO_ATMOSPHERE = {
  name: 'cloudToAtmosphere',
  defaultFill: SUN_FLUXES_DEFAULT_COLOR,
  darkFill: SUN_FLUXES_DARK_COLOR,
};
export const GROUND_TO_ATMOSPHERE = {
  name: 'groundToAtmosphere',
  defaultFill: SUN_FLUXES_DEFAULT_COLOR,
  darkFill: SUN_FLUXES_DARK_COLOR,
};
export const GROUND_TO_SKY = {
  name: 'groundToSky',
  defaultFill: EARTH_FLUXES_DEFAULT_COLOR,
  darkFill: EARTH_FLUXES_DARK_COLOR,
};
export const SKY_TO_GROUND = {
  name: 'skyToGround',
  defaultFill: EARTH_FLUXES_DEFAULT_COLOR,
  darkFill: EARTH_FLUXES_DARK_COLOR,
};
export const SKY_TO_ATMOSPHERE = {
  name: 'skyToAtmosphere',
  defaultFill: EARTH_FLUXES_DEFAULT_COLOR,
  darkFill: EARTH_FLUXES_DARK_COLOR,
};

export const INITIAL_FLUX_FILLS = {};
INITIAL_FLUX_FILLS[SUN_TO_CLOUD.name] = SUN_TO_CLOUD.defaultFill;
INITIAL_FLUX_FILLS[CLOUD_TO_GROUND.name] = CLOUD_TO_GROUND.defaultFill;
INITIAL_FLUX_FILLS[CLOUD_TO_ATMOSPHERE.name] = CLOUD_TO_ATMOSPHERE.defaultFill;
INITIAL_FLUX_FILLS[GROUND_TO_ATMOSPHERE.name] =
  GROUND_TO_ATMOSPHERE.defaultFill;
INITIAL_FLUX_FILLS[GROUND_TO_SKY.name] = GROUND_TO_SKY.defaultFill;
INITIAL_FLUX_FILLS[SKY_TO_GROUND.name] = SKY_TO_GROUND.defaultFill;
INITIAL_FLUX_FILLS[SKY_TO_ATMOSPHERE.name] = SKY_TO_ATMOSPHERE.defaultFill;
