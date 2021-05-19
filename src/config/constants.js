/* ------DEFAULT APP CONSTANTS------ */
export const DRAWER_WIDTH = 430;
export const DEFAULT_THEME_DIRECTION = 'rtl';
export const FORM_CONTROL_MIN_WIDTH = 120;
export const LOGO_SIZE = '48px';
export const DEFAULT_HEADER_VISIBLE = false;
export const MAXIMUM_Z_INDEX = 999999;

export const RADIATION_MODES = {
  WAVES: 'waves',
  FLUX: 'flux',
};
export const SET_INTERVAL_TIME = 80;
export const STROKE_COLOR = 'black';
export const DEFAULT_TIMER_COUNT = 1;

export const LINE_STROKE_COLOR = 'black';
export const DEFAULT_TENSION = 0.3;

export const NUMBER_OF_LINES = 5;
export const LINE_STEP = 5;
export const LINE_AMPLITUDE = 30;
export const LINE_ANGLE = Math.PI / 2;
export const LINE_STARTING_POSITION_Y = 550;

export const SUN_LIGHT_COLOR = 'yellow';
export const EARTH_RADIATION_COLOR = 'red';

export const GREENHOUSE_GASES_VALUES = {
  CARBON_DIOXIDE: 10,
  METHANE: 10,
  WATER: 10,
};

export const RADIATION_STATES = {
  SUN_RADIATION: 'SUN_RADIATION',
  CLOUD_RADIATION: 'CLOUD_RADIATION',
  GASES_RADIATION: 'GASES_RADIATION',
  EARTH_RADIATION: 'EARTH_RADIATION',
};

export const DEFAULT_ALBEDO = 30;

export const ALBEDO_MAX_VALUE = 100;
export const CARBON_DIOXIDE_CONCENTRATION_MAX_VALUE = 1000;
export const METHANE_CONCENTRATION_MAX_VALUE = 10;
export const WATER_CONCENTRATION_MAX_VALUE = 100;
export const GREENHOUSE_TOTAL_EFFECT_MAX_VALUE = 100;
export const BACKGROUND_COLOR = 'lightgrey';

export const ATMOSPHERE = {
  height: 0.2,
  width: 1,
  colorRange: [0, '#303030', 1, '#444444'],
};
export const SKY = {
  height: 0.65,
  width: 1,
  colorRange: [0, '#A4C8EA', 1, '#C8DEF2'],
};
export const SEA = {
  height: 0.15,
  width: 0.4,
  colorRange: [0, '#406bca', 1, '#6688D4'],
};
export const GROUND = {
  height: 0.15,
  width: 0.6,
  colorRange: [0, '#50A032', 1, '#84BC6F'],
};

export const SUN_CENTER_X = 0.3;
export const SUN_RAYS_RADIUS = 0.4;
export const SUN_RAYS_NUMBER_OF_RAYS = 10;
export const SUN_RADIUS = 0.25;
export const SUN_FILL = 'yellow';
export const SUN_BORDER = 2;
export const SUN_BORDER_COLOR = '#444444';

// **TODO**: Add some explanations of these constants
export const NUMBER_OF_ICE_CAPS_IN_ROW = 3;
export const NUMBER_OF_ICE_CAP_ROWS = 2;
export const ICE_CAP_BASE = 0.15;
export const ICE_CAP_HEIGHT = 0.5;
export const ICE_CAP_TRAPEZIUM_INDENT = 0.15;
export const X_DISTANCE_BETWEEN_ICE_CAPS = 0.05;
export const Y_DISTANCE_BETWEEN_ICE_CAPS = 0.075;
export const ICE_CAP_ROW_INDENTS = [
  { x: 0.3, y: 0.05 },
  { x: 0.35, y: 0.7 },
];
export const ICE_CAP_FILL = 'whitesmoke';
export const ICE_CAP_BORDER_COLOR = 'darkblue';
export const ICE_CAP_BORDER_WIDTH = 0.5;
export const ICE_CAP_LINES_TENSION = 0.1;

export const CLOUD_CENTRAL_CIRCLE_RADIUS = 0.1;
export const CLOUD_RESPONSIVE_ADJUSTMENT_FACTOR = 3;
export const CLOUD_CENTRAL_CIRCLE_X = 0.3;
export const CLOUD_CENTRAL_CIRCLE_Y = 0.3;
export const CLOUD_ELLIPSE_RADIUS_X = 2;
export const CLOUD_ELLIPSE_RADIUS_Y = 0.75;
export const CLOUD_FILL = 'white';
export const CLOUD_BORDER_COLOR = 'black';
export const CLOUD_BORDER_WIDTH = 0.5;

export const ROAD_BEGINS_X = 0.1;
export const ROAD_BEGINS_Y = 0.6;
export const ROAD_HEIGHT = 0.3;
export const ROAD_FILL = 'grey';
export const ROAD_LINE_COLOR = 'white';
export const ROAD_LINE_DASH = [10, 10];

// **TODO**: Add some explanations
export const DEFAULT_NUMBER_OF_HOUSEHOLDS_IN_ROW = 3;
export const HOUSEHOLD_FRONT_WIDTH = 0.035;
export const HOUSEHOLD_SIDE_WIDTH = 0.065;
export const HOUSEHOLD_HEIGHT = 0.25;
export const HOUSEHOLD_ROOF_HEIGHT = 0.12;
export const HOUSEHOLD_FRONT_COLOR = '#505050';
export const HOUSEHOLD_SIDE_COLOR = '#808080';
export const HOUSEHOLD_FRONT_ROOF_COLOR = '#8B8000';
export const HOUSEHOLD_SIDE_ROOF_COLOR = '#C2B280';
export const HOUSEHOLD_DOOR_WIDTH = 0.2;
export const HOUSEHOLD_DOOR_HEIGHT = 0.5;
export const HOUSEHOLD_DOOR_FILL = '#4B371C';
export const HOUSEHOLD_ROW_BEGINS_Y = 0.25;
export const HOUSEHOLD_ROW_BEGINS_X = 0.625;
export const X_DISTANCE_BETWEEN_HOUSEHOLDS = 0.025;
export const HOUSEHOLD_DOOR_BEGINS_X = 0.15;

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
export const FACTORY_WINDOW_WIDTH = 0.35;
export const FACTORY_WINDOW_LENGTH = 0.2;
export const FACTORY_WINDOW_BEGINS_X = 0.1;
export const FACTORY_WINDOW_BEGINS_Y = 0.9;
export const X_DISTANCE_BETWEEN_FACTORY_WINDOWS = 0.1;
export const FACTORY_WINDOW_FILL = '#FADA5E';
export const WINDOW_LINES_COLOR = FACTORY_MAIN_BUILDING_COLOR;
export const WINDOW_LINES_WIDTH = 0.5;
export const FACTORY_CHIMNEY_WIDTH = 0.15;
export const FACTORY_CHIMNEY_HEIGHT = 0.3;
export const FACTORY_CHIMNEY_FILL = FACTORY_MAIN_BUILDING_COLOR;
export const FACTORY_CHIMNEY_BEGINS_X = 0.75;
export const SMOKE_CIRCLE_RADIUS = 1.25;
export const SMOKE_INDENT_Y = 0.05;
export const SMOKE_FILL = 'grey';

export const MOUNTAIN_FILL = '#9A7B4F';
export const MOUNTAIN_LINES_TENSION = 0.3;
export const MOUNTAIN_RANGE_BEGINS_X = 0.6;
export const FULL_MOUNTAIN_WIDTH = 0.3;
export const FULL_MOUNTAIN_HEIGHT = 0.75;
export const HALF_MOUNTAIN_WIDTH = 0.15;
export const HALF_MOUNTAIN_HEIGHT = 1.35;
export const MOUNTAINS_INDENT_Y = 0.075;
export const FULL_MOUNTAIN_X_INDENT = 0.8;

export const NUMBER_OF_TREES_IN_ROW = 7;
export const TREE_WIDTH = 0.01;
export const TREE_HEIGHT = 0.125;
export const TREE_CIRCLE_RADIUS = 1;
export const TREE_ROW_BEGINS_X = 0.05;
export const X_DISTANCE_BETWEEN_TREES = 0.025;
export const TREE_FILL = '#432616';
export const TREE_CIRCLES_FILL = '#4F7942';
