import { RADIATION_STATES } from '../config/constants';
import {
  SET_GREENHOUSE_GASES_VALUES,
  SET_ALBEDO,
  SET_FEEDBACK_VALUES,
  SET_RADIATION_MODE,
  SET_NEXT_STATE,
  SET_IS_PAUSED,
} from '../types';

export const setGreenhouseGasesValues = (payload) => (dispatch) => {
  dispatch({ type: SET_GREENHOUSE_GASES_VALUES, payload });
};

export const setAlbedo = (payload) => (dispatch) => {
  dispatch({ type: SET_ALBEDO, payload });
};

export const setFeedbackValues = (payload) => (dispatch) => {
  dispatch({ type: SET_FEEDBACK_VALUES, payload });
};

export const setRadationMode = (payload) => (dispatch) => {
  dispatch({ type: SET_RADIATION_MODE, payload });
  dispatch({ type: SET_IS_PAUSED, payload: true });
};

export const setIsPaused = (payload) => (dispatch) =>
  dispatch({
    type: SET_IS_PAUSED,
    payload,
  });

export const setNextState = (state) => (dispatch) => {
  let stateData;
  switch (state) {
    case RADIATION_STATES.SUN_RADIATION:
      stateData = {
        radiations: { sun: true },
      };
      break;
    case RADIATION_STATES.CLOUD_RADIATION:
      stateData = {
        radiations: { cloud: true },
      };
      break;
    case RADIATION_STATES.GASES_RADIATION:
      stateData = {
        radiations: { gases: true },
      };
      break;
    case RADIATION_STATES.EARTH_RADIATION:
      stateData = {
        radiations: { earth: true },
      };
      break;
    case RADIATION_STATES.ICE_RADIATION:
      stateData = {
        radiations: { ice: true },
      };
      break;
    default:
      stateData = {
        radiations: {
          cloud: false,
          earth: false,
          gases: false,
          sky: false,
          ice: false,
        },
      };
  }

  dispatch({ type: SET_NEXT_STATE, payload: stateData });
};
