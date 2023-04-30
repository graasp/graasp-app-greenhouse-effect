/* ------ROAD CONSTANTS------ */
export const ROAD_BEGINS_X = 0.18;
export const ROAD_BEGINS_Y = 0.6;
export const ROAD_HEIGHT = 0.3;
export const ROAD_FILL = '#C0C0C0';
export const ROAD_LINE_COLOR = 'white';
export const ROAD_LINE_DASH = [10, 10];
export const ROAD_INDENT = 0.02;

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
export const FACTORY_SIDE_BUILDING_COLOR = '#898989';
export const FACTORY_MAIN_BUILDING_COLOR = '#6D6D6D';
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
