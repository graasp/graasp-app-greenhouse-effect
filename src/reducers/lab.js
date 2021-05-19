import _ from 'lodash';
import {
  DEFAULT_ALBEDO,
  GREENHOUSE_GASES_VALUES,
  RADIATION_MODES,
} from '../config/constants';
import {
  SET_ALBEDO,
  SET_FEEDBACK_VALUES,
  SET_GREENHOUSE_GASES_VALUES,
  SET_NEXT_STATE,
  SET_RADIATION_MODE,
} from '../types';

const INITIAL_STATE = {
  settings: {
    open: false,
  },
  radiations: {
    sun: true,
    cloud: false,
    earth: false,
    gases: false,
  },
  radiationMode: RADIATION_MODES.WAVES,
  greenhouseGasesValues: {
    carbonDioxide: GREENHOUSE_GASES_VALUES.CARBON_DIOXIDE,
    methane: GREENHOUSE_GASES_VALUES.METHANE,
    water: GREENHOUSE_GASES_VALUES.WATER,
  },
  albedo: DEFAULT_ALBEDO,
  feedback: {
    iceCoverChange: false,
    waterVapor: false,
    thawingPermafrost: false,
  },
  showLoader: true,
  showSideMenu: true,
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SET_RADIATION_MODE:
      return { ...state, radiationMode: payload };
    case SET_GREENHOUSE_GASES_VALUES:
      return {
        ...state,
        greenhouseGasesValues: _.merge(
          {},
          state.greenhouseGasesValues,
          payload,
        ),
      };
    case SET_ALBEDO:
      return { ...state, albedo: payload };
    case SET_FEEDBACK_VALUES:
      return { ...state, feedback: _.merge({}, state.feedback, payload) };
    case SET_NEXT_STATE:
      return {
        ...state,
        radiations: {
          ...state.radiations,
          ...payload.radiations,
        },
      };
    default:
      return state;
  }
};