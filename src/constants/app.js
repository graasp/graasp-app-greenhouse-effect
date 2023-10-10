/* ------DEFAULT APP CONSTANTS------ */
export const DRAWER_WIDTH = 430;
export const DEFAULT_THEME_DIRECTION = 'rtl';
export const FORM_CONTROL_MIN_WIDTH = 120;
export const LOGO_SIZE = '48px';
export const DEFAULT_HEADER_VISIBLE = false;
export const MAXIMUM_Z_INDEX = 999999;
export const BACKGROUND_COLOR = 'lightgrey';

export const APPLICATION_INTERVAL = 50;
export const TOTAL_INTERVALS_TO_COMPLETE_FLUX = 25;
export const NUM_INCREMENTS = 10;
export const GRADUAL_UPDATE_INTERVAL = 500;
export const FLUX_BLINKING_INTERVAL = 500;

export const Y_SHIFT_PER_INTERVAL = 1.25 * Math.PI;
export const VISIBLE_LIGHT_PERIOD = 1 / 6;
export const INFRARED_RADIATION_PERIOD = 1 / 12;
export const Y_INCREMENT = Math.PI / 8;

// in the feedback effects, when temperature changes become smaller than this number, exit the loop
export const FIRST_EPSILON = 0.125;
export const DEFAULT_EPSILON = 0.01;
