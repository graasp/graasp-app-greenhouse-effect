import _ from 'lodash';
import {
  DEFAULT_GREENHOUSE_GASES_VALUES,
  RADIATION_MODES,
  SCALE_UNITS,
} from '../config/constants';
import {
  SET_ALBEDO_VALUES,
  SET_FEEDBACK_VALUES,
  SET_GREENHOUSE_GASES_VALUES,
  SET_NEXT_STATE,
  SET_RADIATION_MODE,
  SET_IS_PAUSED,
  SET_SCALE_UNIT,
} from '../types';

const INITIAL_STATE = {
  isPaused: true,
  settings: {
    open: false,
  },
  radiationMode: RADIATION_MODES.WAVES,
  greenhouseGasesValues: {
    carbonDioxide: DEFAULT_GREENHOUSE_GASES_VALUES.CARBON_DIOXIDE,
    methane: DEFAULT_GREENHOUSE_GASES_VALUES.METHANE,
    water: DEFAULT_GREENHOUSE_GASES_VALUES.WATER,
  },
  albedo: {
    iceCover: 10,
    cloudCover: 45,
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
    default:
      return state;
  }
};
