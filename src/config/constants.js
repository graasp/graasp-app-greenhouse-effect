/* ------DEFAULT APP CONSTANTS------ */
export const DRAWER_WIDTH = 430;
export const DEFAULT_THEME_DIRECTION = 'rtl';
export const FORM_CONTROL_MIN_WIDTH = 120;
export const LOGO_SIZE = '48px';
export const DEFAULT_HEADER_VISIBLE = false;
export const MAXIMUM_Z_INDEX = 999999;

export const RADIATION_MODES = {
  WAVES: 'waves',
  FLUXES: 'fluxes',
};

export const BACKGROUND_COLOR = 'lightgrey';

/* ------CONSTANTS FOR WIDTH, HEIGHT, COLOR OF CANVAS BACKGROUND ELEMENTS ------ */
// (1) In general, all dimensions in this file are stated as percentages (values between 0 and 1)
// (2) Background element dimensions are stated as a percentage of stage/canvas dimensions
// (3) Dimensions of elements within an area of the canvas are stated as a percentage of that area
// (e.g. the dimensions of the road are stated as a percentage of the ground)
// (4) Dimensions of details within an element are stated as a percentage of that element
// (e.g. the dimensions of the factory chimney are stated as a percentage of the factory's width)
// In general, the idea is to allow for stating dimensiosn as intuitively as possible
// (e.g. it would not be intuitive to state the chimney's width as a percentage of the whole canvas)
// (6) In addition to dimensions, most elements also have positioning variables
// These are also stated as percentages relative to the area they're within
export const ATMOSPHERE = {
  height: 0.2,
  width: 1,
  colorRange: [0, '#303030', 1, '#444444'],
};
export const SKY = {
  height: 0.65,
  width: 1,
  colorRange: {
    earth: [0, '#A4C8EA', 1, '#C8DEF2'],
    venus: [0, '#737373', 1, '#e5e5e5'],
    mars: [0, '#8D8D8D', 1, '#E6CF6B'],
  },
  colorRangePaused: {
    earth: [0, '#c1cdd9', 1, '#d3dbe3'],
    venus: [0, '#8D8D8D', 1, '#f2f2f2'],
    mars: [0, '#A6A6A6', 1, '#FFE884'],
  },
};
export const SEA = {
  height: 0.15,
  width: 0.4,
  indent: 0.06,
  colorRange: [0, '#406bca', 1, '#6688D4'],
  colorRangePaused: [0, '#6f8cc9', 1, '#92a6d4'],
  colorRangeFrozen: [0, '#F5F5F5', 1, '#F5F5F5'],
};
export const GROUND = {
  height: 0.15,
  width: { earth: 0.6, nonEarth: 1 },
  colorRange: {
    earth: [0, '#50A032', 1, '#84BC6F'],
    venus: [0, '#AF854B', 1, '#795C34'],
    mars: [0, '#87270E', 1, '#A05006'],
  },
  colorRangePaused: {
    earth: [0, '#6c9c5a', 1, '#9fba95'],
    venus: [0, '#E2B87E', 1, '#93764E'],
    mars: [0, '#A04027', 1, '#B9691F'],
  },
};

/* ------SUN CONSTANTS------ */
// SUN_CENTER_X: how far from the left of the canvas the sun is positioned
export const SUN_CENTER_X = 0.4;
export const SUN_RAYS_NUMBER_OF_RAYS = 10;
// note that the sun is a combination of a Konva Star (SUN_RAYS_RADIUS) and Konva Circle (SUN_RADIUS)
export const SUN_RAYS_RADIUS = 0.4;
export const SUN_RADIUS = 0.25;
export const SUN_FILL = 'yellow';
export const SUN_BORDER = 2;
export const SUN_BORDER_COLOR = '#444444';

/* ------ICE CAPS CONSTANTS------ */
export const ICE_CAP_BASE = 0.15;
export const ICE_CAP_HEIGHT = 0.5;
// TRAPEZIUM_INDENT: distance from bottom left of trapezium to point at which a straight line from top left of trapezium descends
export const ICE_CAP_TRAPEZIUM_INDENT = 0.15;
export const X_DISTANCE_BETWEEN_ICE_CAPS = 0.05;
// y distance between ice caps so that ice caps in a row are staggered rather than in a straight line
export const Y_DISTANCE_BETWEEN_ICE_CAPS = 0.075;
// ROW_INDENTS: positioning of ice cap rows relative to sea
export const ICE_CAP_ROWS_BEGIN = [
  { x: 0.25, y: 0.05 },
  { x: 0.3, y: 0.55 },
];
export const ICE_CAP_FILL = 'whitesmoke';
export const ICE_CAP_BORDER_COLOR = 'darkblue';
export const ICE_CAP_BORDER_WIDTH = 0.5;
export const ICE_CAP_LINES_TENSION = 0.1;

/* ------CLOUD CONSTANTS------ */
export const CLOUD_CENTRAL_CIRCLE_RADIUS = 0.1;
export const CLOUD_RESPONSIVE_ADJUSTMENT_FACTOR = 1.5;
export const FIRST_CLOUD_CENTRAL_CIRCLE_X = 0.3;
export const FIRST_CLOUD_CENTRAL_CIRCLE_Y = 0.3;
export const SECOND_CLOUD_CENTRAL_CIRCLE_X = 0.7;
export const SECOND_CLOUD_CENTRAL_CIRCLE_Y =
  FIRST_CLOUD_CENTRAL_CIRCLE_X - 0.05;
export const CLOUD_FILL = 'white';
export const CLOUD_ADJACENT_CIRCLE_RADIUS = 0.85;
export const CLOUD_PERIPHERAL_CIRCLE_RADIUS = 0.4;

/* ------ROAD CONSTANTS------ */
export const ROAD_BEGINS_X = 0.18;
export const ROAD_BEGINS_Y = 0.6;
export const ROAD_HEIGHT = 0.3;
export const ROAD_FILL = 'grey';
export const ROAD_LINE_COLOR = 'white';
export const ROAD_LINE_DASH = [10, 10];

/* ------HOUSE CONSTANTS------ */
export const DEFAULT_NUMBER_OF_HOUSES_IN_ROW = 3;
// The house is two rectangles side by side, with the left rectangle darker to give a 3D effect
// House front: the left rectangle of the house
// House side: the right rectangle of the house
export const HOUSE_FRONT_WIDTH = 0.035;
export const HOUSE_SIDE_WIDTH = 0.065;
export const HOUSE_HEIGHT = 0.25;
export const HOUSE_ROOF_HEIGHT = 0.12;
export const HOUSE_FRONT_COLOR = '#505050';
export const HOUSE_SIDE_COLOR = '#808080';
export const HOUSE_FRONT_ROOF_COLOR = '#8B8000';
export const HOUSE_SIDE_ROOF_COLOR = '#C2B280';
export const HOUSE_DOOR_WIDTH = 0.2;
export const HOUSE_DOOR_HEIGHT = 0.5;
export const HOUSE_DOOR_FILL = '#4B371C';
export const HOUSE_ROW_BEGINS_Y = 0.25;
export const HOUSE_ROW_BEGINS_X = 0.625;
export const X_DISTANCE_BETWEEN_HOUSES = 0.025;
export const HOUSE_DOOR_BEGINS_X = 0.15;

/* ------FACTORY CONSTANTS------ */
export const DEFAULT_NUMBER_OF_FACTORIES_IN_ROW = 2;
export const FACTORY_SIDE_BUILDING_WIDTH = 0.04;
export const FACTORY_MAIN_BUILDING_WIDTH = 0.1;
export const FACTORY_SIDE_BUILDING_HEIGHT = 0.3;
export const FACTORY_MAIN_BUILDING_HEIGHT = 0.6;
export const FACTORY_SIDE_BUILDING_COLOR = '#181818';
export const FACTORY_MAIN_BUILDING_COLOR = '#303030';
export const FACTORY_ROW_BEGINS_Y = 0.4;
export const FACTORY_ROW_BEGINS_X = 0.2;
export const X_DISTANCE_BETWEEN_FACTORIES = 0.025;
// Windows
export const FACTORY_WINDOW_WIDTH = 0.35;
export const FACTORY_WINDOW_LENGTH = 0.2;
export const FACTORY_WINDOW_BEGINS_X = 0.1;
export const FACTORY_WINDOW_BEGINS_Y = 0.9;
export const X_DISTANCE_BETWEEN_FACTORY_WINDOWS = 0.1;
export const FACTORY_WINDOW_FILL = '#FADA5E';
export const WINDOW_LINES_COLOR = FACTORY_MAIN_BUILDING_COLOR;
export const WINDOW_LINES_WIDTH = 0.5;
// Chimney
export const FACTORY_CHIMNEY_WIDTH = 0.15;
export const FACTORY_CHIMNEY_HEIGHT = 0.15;
export const FACTORY_CHIMNEY_FILL = FACTORY_MAIN_BUILDING_COLOR;
export const FACTORY_CHIMNEY_BEGINS_X = 0.75;

/* ------MOUNTAIN CONSTANTS------ */
export const MOUNTAIN_FILL = '#9A7B4F';
export const MOUNTAIN_FILL_PAUSED = '#998871';
export const MOUNTAIN_LINES_TENSION = 0;
export const MOUNTAIN_RANGE_BEGINS_X = 0.6;
export const FULL_MOUNTAIN_WIDTH = 0.3;
export const FULL_MOUNTAIN_HEIGHT = 0.75;
export const HALF_MOUNTAIN_WIDTH = 0.15;
export const HALF_MOUNTAIN_HEIGHT = 1.35;
export const MOUNTAINS_INDENT_Y = 0.075;
export const FULL_MOUNTAIN_X_INDENT = 0.8;
export const FULL_MOUNTAIN = 'FULL_MOUNTAIN';
export const HALF_MOUNTAIN = 'HALF_MOUNTAIN';
export const ICE_COVER_FILL = '#F5F5F5';
export const ICE_COVER_LINES_TENSION = 0.1;

/* ------TRUCK CONSTANTS------ */
export const TRUCK_FRONT_WIDTH = 0.05;
export const TRUCK_FRONT_HEIGHT = 1.15;
export const TRUCK_FRONT_CURVES = [0, 5, 5, 0];
export const TRUCK_SIDE_WIDTH = 0.175;
// next three variables should add up to 1 - these are stated as a percentage of TRUCK_FRONT_HEIGHT
export const TRUCK_SIDE_HEIGHT = 0.15;
export const TRUCK_CARGO_HEIGHT = 0.75;
export const TRUCK_CARGO_GAP = 0.1;
export const TRUCK_CARGO_WIDTH = TRUCK_SIDE_WIDTH;
export const TRUCK_BEGINS_X = 0.15;
export const TRUCK_BEGINS_Y = -0.5;
export const TRUCK_WHEEL_RADIUS = 0.075;
export const TRUCK_CARGO_FILL = '#C24641';
export const TRUCK_BODY_FILL = '#990012';
export const WHEEL_TIRE_FILL = '#282828';
export const WHEEL_RIM_FILL = 'grey';
export const WHEEL_ONE_BEGINS_X = 0.1;
export const WHEEL_TWO_BEGINS_X = 0.3;
export const WINDOW_BEGINS_X = 0.3;
export const WINDOW_BEGINS_Y = 0.1;
export const WINDOW_WIDTH = 0.5;
export const WINDOW_HEIGHT = 0.4;
export const WINDOW_FILL = '#D3D3D3';

/* ------PERMAFROST CONSTANTS------ */
export const PERMAFROST_WIDTH = 1;
export const PERMAFROST_HEIGHT = 0.05;
export const PERMAFROST_FILL = '#F5F5F5';

/* ------GREENHOUSE GAS MOLECULES CONSTANTS------ */
export const CARBON_DIOXIDE = 'CARBON_DIOXIDE';
export const WATER = 'WATER';
export const METHANE = 'METHANE';
export const ATOM_DIMENSIONS = { small: 0.003, medium: 0.006 };
export const CARBON = {
  atomColor: 'black',
  size: 'medium',
};
export const OXYGEN = {
  atomColor: 'indianred',
  size: 'medium',
};
export const HYDROGEN = {
  atomColor: 'gray',
  size: 'small',
};
export const MOLECULE_DISTRIBUTION_MIN_X = 0.01;
// to avoid clashes with therometer, don't place molecules more than this constant from beginning of canvas
export const MOLECULE_DISTRIBUTION_MAX_X = 0.99;

/* ------THERMOMETER CONSTANTS------ */
export const THERMOMETER_BEGINS_X = 0.95;
export const THERMOMETER_BEGINS_Y = 0.48;
export const THERMOMETER_BASE_WIDTH = 0.015;
export const THERMOMETER_HEIGHT = 0.4;
export const THERMOMETER_BORDER_COLOR = '#282828';
export const THERMOMETER_BORDER_WIDTH = 0.75;
export const THERMOMETER_BULB_RADIUS = 0.015;
export const THERMOMETER_FILL = '#CD4646';
export const THERMOMETER_MIN_VALUE_IN_KELVIN = 250; // Kelvin
export const THERMOMETER_MAX_VALUE_IN_KELVIN = 305; // Kelvin
export const THERMOMETER_GRADATION_WIDTH = 0.25;

export const SUN_LIGHT_COLOR = 'yellow';
export const SUN_FLUXES_DEFAULT_COLOR = 'yellow';
export const SUN_FLUXES_DARKENED_COLOR = 'gold';
export const EARTH_RADIATION_COLOR = 'red';
export const EARTH_FLUXES_DEFAULT_COLOR = 'red';
export const EARTH_FLUXES_DARKENED_COLOR = 'darkred';
export const CLOUD_TO_ATMOSPHERE_FLUX_ROTATION = -20;
export const GROUND_TO_ATMOSPHERE_FLUX_ROTATION = -10;
export const SKY_TO_ATMOSPHERE_FLUX_ROTATION = 20;
export const SKY_TO_GROUND_FLUX_ROTATION = -10;
export const CLOUD_TO_ATMOSPHERE_WAVE_ROTATION = -25;
export const GROUND_TO_ATMOSPHERE_WAVE_ROTATION = -10;
export const SKY_TO_ATMOSPHERE_WAVE_ROTATION = 20;
export const SKY_TO_GROUND_WAVE_ROTATION = -20;
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
// wave amplitudes
export const SUN_TO_CLOUD_WAVE_AMPLITUDE = 50;
export const CLOUD_TO_GROUND_WAVE_AMPLITUDE = 35;
export const GROUND_TO_ATMOSPHERE_WAVE_AMPLITUDE = 15;
export const CLOUD_TO_ATMOSPHERE_WAVE_AMPLITUDE = 15;
export const GROUND_TO_SKY_WAVE_AMPLITUDE = 50;
// constants used in the creation of custom flux arrow
export const FLUX_WIDTH_AS_PERCENTAGE_OF_FLUX_VALUE = 0.7;
export const MAXIMUM_FLUX_WIDTH_AS_PERCENTAGE_OF_STAGE_WIDTH = 0.2;
export const FLUX_POINTER_HEIGHT_AS_PERCENTAGE_OF_POINTER_WIDTH = 0.4;
export const MINIMUM_FLUX_POINTER_HEIGHT = 22.5;
export const FLUX_BODY_WIDTH_AS_PERCENTAGE_OF_TOTAL_WIDTH = 0.7;

export const TOTAL_INTERVALS_TO_COMPLETE_FLUX = 50;

export const ALBEDO_MAX_VALUE = 100;
export const CARBON_DIOXIDE_CONCENTRATION_MAX_VALUE_DEFAULT = 5000;
export const CARBON_DIOXIDE_CONCENTRATION_MAX_VALUE_ON_MARS_OR_VENUS = 1e6;
export const CARBON_DIOXIDE_CONCENTRATION_MIN_VALUE = 50;
export const METHANE_CONCENTRATION_MAX_VALUE = 10;
export const METHANE_CONCENTRATION_MIN_VALUE = 0.1;
export const WATER_CONCENTRATION_MIN_VALUE_DEFAULT = 3000;
export const WATER_CONCENTRATION_MIN_VALUE_ON_MARS_OR_VENUS = 0;
export const WATER_CONCENTRATION_MAX_VALUE = 13000;
export const ICE_COVER_MAX_VALUE = 100;
export const CLOUD_COVER_MAX_VALUE = 100;
export const GREENHOUSE_TOTAL_EFFECT_MAX_VALUE = 100;

export const ZOOM_IN_CURSOR = 'zoom-in';
export const ZOOM_OUT_CURSOR = 'zoom-out';
export const DEFAULT_CURSOR = 'default';

export const STEFAN_BOLTZMANN_CONSTANT = 5.670367e-8;

export const SCALE_WIDTH = 7;
export const SCALE_FONT_SIZE = 13;
export const SCALE_PADDING_LEFT = 7;
export const SCALE_PADDING_RIGHT = 15;
export const SCALE_LINE_HEIGHT = 1.5;
export const SCALE_HEIGHT = 17;
// the actual number of displayed ticks might vary due to number rounding
export const SCALE_MAX_NUMBER_TICKS = 6;

export const SCALE_UNITS = {
  KELVIN: { name: 'kelvin', unit: 'K' },
  CELSIUS: { name: 'celsius', unit: '°C' },
};
export const THERMOMETER_CURRENT_TEMPERATURE_FONT_SIZE = 20;
export const THERMOMETER_CURRENT_TEMPERATURE_WIDTH = 20;
export const THERMOMETER_CURRENT_TEMPERATURE_MARGIN_BOTTOM = 10;

export const ZERO_KELVIN_IN_CELISUS = 273.15;

export const SIMULATION_MODES = {
  ICE_AGE: {
    name: 'Ice Age',
    greenhouseGasesValues: {
      carbonDioxide: 200,
      methane: 0.4,
      water: 5200,
    },
    albedo: {
      iceCover: 20,
      cloudCover: 30,
    },
    cTerm: 0.204,
    SOLAR_FLUX: 340,
  },
  TWENTIETH_CENTURY: {
    name: '1900',
    greenhouseGasesValues: {
      carbonDioxide: 290,
      methane: 1,
      water: 7300,
    },
    albedo: {
      iceCover: 10,
      cloudCover: 40,
    },
    cTerm: 0.227,
    SOLAR_FLUX: 340,
  },
  TODAY: {
    name: '2020',
    greenhouseGasesValues: {
      carbonDioxide: 413.2,
      methane: 1.9,
      water: 7800,
    },
    albedo: {
      iceCover: 10,
      cloudCover: 40,
    },
    cTerm: 0.231,
    SOLAR_FLUX: 340,
  },
  MARS: {
    name: 'Mars',
    greenhouseGasesValues: {
      carbonDioxide: 965000,
      methane: 0,
      water: 210,
    },
    albedo: {
      iceCover: 2,
      cloudCover: 0,
    },
    cTerm: 0,
    SOLAR_FLUX: 147,
  },
  VENUS: {
    name: 'Venus',
    greenhouseGasesValues: {
      carbonDioxide: 965000,
      methane: 0,
      water: 20,
    },
    albedo: {
      iceCover: 0,
      cloudCover: 100,
    },
    cTerm: 0,
    SOLAR_FLUX: 650,
  },
};

export const cTerms = Object.fromEntries(
  Object.entries(
    SIMULATION_MODES,
    // eslint-disable-next-line no-unused-vars
  ).map(([simulationMode, simulationModeDetails]) => [
    simulationModeDetails.name,
    simulationModeDetails.cTerm,
  ]),
);

export const TWENTIETH_CENTURY_ALBEDO_OFFSET = -0.006;

export const SOLAR_FLUXES = Object.fromEntries(
  Object.entries(
    SIMULATION_MODES,
    // eslint-disable-next-line no-unused-vars
  ).map(([simulationMode, simulationModeDetails]) => [
    simulationModeDetails.name,
    simulationModeDetails.SOLAR_FLUX,
  ]),
);

export const CLOUD_COVER_PERCENTAGE_LIMIT = 50;

export const GREENHOUSE_GASES_DISTRIBUTION = {
  METHANE: 1,
  CARBON_DIOXIDE: 10,
  WATER: 10,
};

export const ON_STRING = 'on';
export const AUTO_STRING = 'auto';
export const UP_STRING = 'up';
export const DOWN_STRING = 'down';
export const TOP_STRING = 'top';
export const BOTTOM_STRING = 'bottom';
export const INFRARED = 'infrared';
export const VISIBLE_LIGHT = 'visible-light';
export const DEFAULT_FILL = 'default-fill';
export const DARK_FILL = 'dark-fill';

export const APPLICATION_INTERVAL = 50;
export const Y_SHIFT_PER_INTERVAL = Math.PI;
export const VISIBLE_LIGHT_PERIOD = 1 / 6;
export const INFRARED_RADIATION_PERIOD = 1 / 12;
export const Y_INCREMENT = Math.PI / 8;

export const FLUX_BLINKING_INTERVAL = 1000;
