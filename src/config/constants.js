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
  colorRange: [0, '#A4C8EA', 1, '#C8DEF2'],
  colorRangePaused: [0, '#c1cdd9', 1, '#d3dbe3'],
};
export const SEA = {
  height: 0.15,
  width: 0.4,
  indent: 0.06,
  colorRange: [0, '#406bca', 1, '#6688D4'],
  colorRangePaused: [0, '#6f8cc9', 1, '#92a6d4'],
};
export const GROUND = {
  height: 0.15,
  width: 0.6,
  colorRange: [0, '#50A032', 1, '#84BC6F'],
  colorRangePaused: [0, '#6c9c5a', 1, '#9fba95'],
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
export const NUMBER_OF_ICE_CAP_ROWS = 2;
// Since there are two ice cap rows, we choose a default for number of ice caps in each row
export const DEFAULT_NUMBER_OF_ICE_CAPS_PER_ROW = [3, 3];
export const ICE_CAP_BASE = 0.15;
export const ICE_CAP_HEIGHT = 0.5;
// TRAPEZIUM_INDENT: distance from bottom left of trapezium to point at which a straight line from top left of trapezium descends
export const ICE_CAP_TRAPEZIUM_INDENT = 0.15;
export const X_DISTANCE_BETWEEN_ICE_CAPS = 0.05;
// y distance between ice caps so that ice caps in a row are staggered rather than in a straight line
export const Y_DISTANCE_BETWEEN_ICE_CAPS = 0.075;
// ROW_INDENTS: positioning of ice cap rows relative to sea
export const ICE_CAP_ROWS_BEGIN = [
  { x: 0.3, y: 0.05 },
  { x: 0.35, y: 0.7 },
];
export const ICE_CAP_FILL = 'whitesmoke';
export const ICE_CAP_BORDER_COLOR = 'darkblue';
export const ICE_CAP_BORDER_WIDTH = 0.5;
export const ICE_CAP_LINES_TENSION = 0.1;

/* ------CLOUD CONSTANTS------ */
export const CLOUD_CENTRAL_CIRCLE_RADIUS = 0.1;
export const CLOUD_CENTRAL_CIRCLE_X = 0.3;
export const CLOUD_CENTRAL_CIRCLE_Y = 0.3;
export const CLOUD_ELLIPSE_RADIUS_X = 2;
export const CLOUD_ELLIPSE_RADIUS_Y = 0.55;
export const CLOUD_FILL = 'white';
export const CLOUD_BORDER_COLOR = 'black';
export const CLOUD_BORDER_WIDTH = 0.5;
export const CLOUD_ADJACENT_CIRCLE_RADIUS = 0.85;
export const CLOUD_PERIPHERAL_CIRCLE_RADIUS = 0.5;

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
// ice and snow cover as a percentage of the mountain (can be adjusted in state/redux later)
export const DEFAULT_ICE_COVER = 0.5;
export const ICE_COVER_FILL = '#F5F5F5';
export const ICE_COVER_LINES_TENSION = 0.1;
export const MOUNTAIN_ICE_COVER_MAXIMUM_PERCENT = 70;

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
export const MOLECULE_ROW_BEGINS_X = 0.45;
export const MOLECULE_ROW_BEGINS_Y = 0.5;
export const X_DISTANCE_BETWEEN_MOLECULES_IN_ROW = 0.025;
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
// to avoid clashes with cloud, on rows whose y falls within cloud, place the molecules at least this constant from beginning of canvas
export const MOLECULE_DISTRIBUTION_MIN_X_ON_CLOUD_ROWS = 0.5;

/* ------THERMOMETER CONSTANTS------ */
export const THERMOMETER_BEGINS_X = 0.95;
export const THERMOMETER_BEGINS_Y = 0.48;
export const THERMOMETER_BASE_WIDTH = 0.015;
export const THERMOMETER_HEIGHT = 0.4;
export const THERMOMETER_BORDER_COLOR = '#282828';
export const THERMOMETER_BORDER_WIDTH = 0.75;
export const THERMOMETER_BULB_RADIUS = 0.015;
export const THERMOMETER_FILL = '#CD4646';
export const DEFAULT_THERMOMETER_PERCENTAGE_FULL = 0.4;
export const THERMOMETER_NUMBER_OF_GRADATIONS = 10;
export const THERMOMETER_MIN_VALUE_IN_KELVIN = 250; // Kelvin
export const THERMOMETER_MAX_VALUE_IN_KELVIN = 305; // Kelvin
export const THERMOMETER_GRADATION_WIDTH = 0.25;
export const THERMOMETER_GRADATION_STROKE = 1;

export const SET_INTERVAL_TIME = 80;
export const DEFAULT_TIMER_COUNT = 1;

export const DEFAULT_RADIATION_LINE_TENSION = 0.3;

export const NUMBER_OF_LINES = 5;
export const LINE_STEP = 5;
export const LINE_ANGLE = Math.PI / 2;
export const LINE_STARTING_POSITION_Y = 550;

export const SUN_LIGHT_COLOR = 'yellow';
export const EARTH_RADIATION_COLOR = 'red';

export const RADIATION_STATES = {
  SUN_RADIATION: 'SUN_RADIATION',
  CLOUD_RADIATION: 'CLOUD_RADIATION',
  GASES_RADIATION: 'GASES_RADIATION',
  EARTH_RADIATION: 'EARTH_RADIATION',
  ICE_RADIATION: 'ICE_RADIATION',
};

export const DEFAULT_ALBEDO = 30;

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
export const INFRARED_AMPLITUDE = 50;
export const ULTRAVIOLET_AMPLITUDE = 30;
export const INFRARED_WAVELENGTH = 10;
export const ULTRAVIOLET_WAVELENGTH = 30;

export const FLUX_TEXT_COLOR = 'black';
export const FLUX_MARGIN = 25;
export const FLUX_HEAD_HEIGHT = 40;
export const FLUX_BODY_AMPLITUDE = 0;
export const FLUX_TEXT_STROKE_WIDTH = 5;
export const FLUX_TEXT_FONT_SIZE = 20;
export const FLUX_TEXT_WIDTH = 40;
export const FLUX_WAVELENGTH = 70;
export const FLUX_PROGRESS_MAX_VALUE = 100;
export const ICE_TO_SKY_RADIATION_FLUX_OFFSET_X = 50;
export const FLUX_PROGRESS_INTERVAL_DELTA = 10;

export const ZOOM_IN_CURSOR = 'zoom-in';
export const ZOOM_OUT_CURSOR = 'zoom-out';
export const DEFAULT_CURSOR = 'default';

export const SOLAR_FLUX = { value: 340, width: 110, height: 80 };
export const STEFAN_BOLTZMANN_CONSTANT = 5.670367e-8;

export const SCALE_WIDTH = 7;
export const SCALE_FONT_SIZE = 13;
export const SCALE_PADDING_LEFT = 7;
export const SCALE_PADDING_RIGHT = 15;
export const SCALE_LINE_HEIGHT = 1.5;
export const SCALE_HEIGHT = 17;
// approximatively the width of the scale text
export const SCALE_TEXT_WIDTH_FACTOR = SCALE_FONT_SIZE;
// the actual number of displayed ticks might vary due to number rounding
export const SCALE_MAX_NUMBER_TICKS = 6;
export const SCALE_LEGEND_PADDING_BOTTOM = 30;
export const SCALE_TICKS_STROKE_COLOR = 'black';
export const INITIAL_TEMPERATURE = 289;
// apply dashed stroke that is 6px long and 2 pixels apart
export const SCALE_LABELS_LINE_DASH = [6, 2];

export const THERMOMETER_HEIGHT_FACTOR = 0.5;
export const SCALE_UNITS = {
  KELVIN: { name: 'kelvin', unit: 'K' },
  CELSIUS: { name: 'celsius', unit: '°C' },
};
export const THERMOMETER_CURRENT_TEMPERATURE_FONT_SIZE = 20;
export const THERMOMETER_CURRENT_TEMPERATURE_WIDTH = 20;
export const THERMOMETER_CURRENT_TEMPERATURE_MARGIN_BOTTOM = 10;

export const CHANGING_TEMPERATURE_SPEED = 0.01;
export const SLOW_UPDATE_ANIMATION_TIME = 6000;
export const SLOW_ANIMATION_SPEED_DELTA = 0.001;
export const CHANGING_FLUX_CARBON_DIOXIDE_SPEED = 10;
export const SET_INTERVAL_PAUSED_ANIMATION_TIME = 200;
export const BLINKING_SHADOW_COLOR = 'yellow';
export const DEFAULT_SHADOW_COLOR = 'black';
export const SUN_FLUXES_DELTA_WIDTH = 0.35;
export const EARTH_FLUXES_DELTA_WIDTH = 0.3;

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
      iceCover: 90,
      cloudCover: 40,
    },
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
  },
  TODAY: {
    name: '2020',
    greenhouseGasesValues: {
      carbonDioxide: 413.2,
      methane: 0,
      water: 7800,
    },
    albedo: {
      iceCover: 10,
      cloudCover: 40,
    },
  },
  MARS: {
    name: 'Mars',
    greenhouseGasesValues: {
      carbonDioxide: 965000,
      methane: 0,
      water: 210,
    },
    albedo: {
      iceCover: 10,
      cloudCover: 40,
    },
  },
  VENUS: {
    name: 'Venus',
    greenhouseGasesValues: {
      carbonDioxide: 965000,
      methane: 1.8,
      water: 20,
    },
    albedo: {
      iceCover: 10,
      cloudCover: 40,
    },
  },
};

export const CLOUD_COVER_DIVISION_FACTOR = 380;
export const CLOUD_COVER_CIRCLES_DIVISION_FACTOR = 3;
export const CLOUD_COVER_PERCENTAGE_LIMIT = 50;

export const GREENHOUSE_GASES_DISTRIBUTION = {
  METHANE: 1,
  CARBON_DIOXIDE: 10,
  WATER: 10,
};
