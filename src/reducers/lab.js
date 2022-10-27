import _ from 'lodash';
import {
  RADIATION_MODES,
  SCALE_UNITS,
  SIMULATION_MODES,
} from '../config/constants';
import {
  SET_FEEDBACK_VALUES,
  SET_RADIATION_MODE,
  SET_IS_PAUSED,
  SET_SCALE_UNIT,
  SET_SIMULATION_MODE,
  RESET,
  INCREMENT_INTERVAL_COUNT,
  TOGGLE_FLUXES_BLINKING,
  SET_CARBON_DIOXIDE,
  SET_METHANE,
  SET_WATER_VAPOR,
  SET_CLOUD_COVER,
  SET_ICE_COVER,
  SET_C_TERM,
} from '../types';

const INITIAL_STATE = {
  isPaused: true,
  settings: {
    open: false,
  },
  radiationMode: RADIATION_MODES.WAVES,
  simulationMode: SIMULATION_MODES.TODAY.name,
  carbonDioxide: SIMULATION_MODES.TODAY.carbonDioxide,
  methane: SIMULATION_MODES.TODAY.methane,
  cTerm: SIMULATION_MODES.TODAY.cTerm,
  waterVapor: SIMULATION_MODES.TODAY.waterVapor,
  iceCover: SIMULATION_MODES.TODAY.iceCover,
  cloudCover: SIMULATION_MODES.TODAY.cloudCover,
  feedback: {
    iceCoverChange: false,
    waterVapor: false,
  },
  showLoader: true,
  showSideMenu: true,
  scaleUnit: SCALE_UNITS.CELSIUS,
  intervalCount: 0,
  fluxesBlinking: false,
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SET_RADIATION_MODE:
      return { ...state, radiationMode: payload };
    case SET_SCALE_UNIT:
      return { ...state, scaleUnit: payload };
    case SET_FEEDBACK_VALUES:
      return { ...state, feedback: _.merge({}, state.feedback, payload) };
    case SET_IS_PAUSED:
      return {
        ...state,
        isPaused: payload,
      };
    case SET_CARBON_DIOXIDE:
      return { ...state, carbonDioxide: payload };
    case SET_METHANE:
      return { ...state, methane: payload };
    case SET_C_TERM:
      return { ...state, cTerm: payload };
    case SET_WATER_VAPOR:
      return { ...state, waterVapor: payload };
    case SET_CLOUD_COVER:
      return { ...state, cloudCover: payload };
    case SET_ICE_COVER:
      return { ...state, iceCover: payload };
    case SET_SIMULATION_MODE:
      return {
        ...state,
        simulationMode: payload.name,
        carbonDioxide: payload.carbonDioxide,
        methane: payload.methane,
        cTerm: payload.cTerm,
        waterVapor: payload.waterVapor,
        iceCover: payload.iceCover,
        cloudCover: payload.cloudCover,
      };

    case INCREMENT_INTERVAL_COUNT:
      return { ...state, intervalCount: state.intervalCount + 1 };
    case RESET:
      return INITIAL_STATE;
    case TOGGLE_FLUXES_BLINKING:
      return { ...state, fluxesBlinking: !state.fluxesBlinking };
    default:
      return state;
  }
};
