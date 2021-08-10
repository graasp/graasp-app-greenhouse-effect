import _ from 'lodash';
import {
  RADIATION_MODES,
  SCALE_UNITS,
  SIMULATION_MODES,
} from '../config/constants';
import {
  SET_ALBEDO_VALUES,
  SET_FEEDBACK_VALUES,
  SET_GREENHOUSE_GASES_VALUES,
  SET_NEXT_STATE,
  SET_RADIATION_MODE,
  SET_IS_PAUSED,
  SET_SCALE_UNIT,
  SET_SIMULATION_MODE,
} from '../types';

const INITIAL_STATE = {
  isPaused: true,
  settings: {
    open: false,
  },
  radiationMode: RADIATION_MODES.WAVES,
  greenhouseGasesValues: {
    carbonDioxide: SIMULATION_MODES.TODAY.greenhouseGasesValues.carbonDioxide,
    methane: SIMULATION_MODES.TODAY.greenhouseGasesValues.methane,
    water: SIMULATION_MODES.TODAY.greenhouseGasesValues.water,
  },
  albedo: {
    iceCover: SIMULATION_MODES.TODAY.albedo.iceCover,
    cloudCover: SIMULATION_MODES.TODAY.albedo.cloudCover,
  },
  feedback: {
    iceCoverChange: false,
    waterVapor: false,
    thawingPermafrost: false,
  },
  showLoader: true,
  showSideMenu: true,
  scaleUnit: SCALE_UNITS.CELSIUS,
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SET_RADIATION_MODE:
      return { ...state, radiationMode: payload };
    case SET_SCALE_UNIT:
      return { ...state, scaleUnit: payload };
    case SET_GREENHOUSE_GASES_VALUES:
      return {
        ...state,
        greenhouseGasesValues: _.merge(
          {},
          state.greenhouseGasesValues,
          payload,
        ),
      };
    case SET_ALBEDO_VALUES:
      return { ...state, albedo: { ...state.albedo, ...payload } };
    case SET_FEEDBACK_VALUES:
      return { ...state, feedback: _.merge({}, state.feedback, payload) };
    case SET_NEXT_STATE:
      return {
        ...state,
        radiations: {
          ...state.radiations,
          ...payload,
        },
      };
    case SET_IS_PAUSED:
      return {
        ...state,
        isPaused: payload,
      };
    case SET_SIMULATION_MODE:
      return {
        ...state,
        greenhouseGasesValues: _.merge(
          {},
          state.greenhouseGasesValues,
          payload.greenhouseGasesValues,
        ),
        albedo: _.merge({}, state.albedo, payload.albedo),
      };
    default:
      return state;
  }
};
