import { RADIATION_STATES } from '../config/constants';
import {
  SET_GREENHOUSE_GASES_VALUES,
  SET_ALBEDO,
  SET_FEEDBACK_VALUES,
  SET_RADIATION_MODE,
  SET_NEXT_STATE,
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
};

export const setNextState = () => (dispatch, getState) => {
  const { state } = getState().lab;

  let stateData;
  switch (state) {
    case RADIATION_STATES.SUN_RADIATION:
      stateData = {
        radiations: { cloud: true },
      };
      break;
    case RADIATION_STATES.CLOUD_RADIATION:
      stateData = {
        radiations: { earth: true },
      };
      break;
    case RADIATION_STATES.GASES_RADIATION:
      stateData = {
        radiations: { sky: true },
      };
      break;
    case RADIATION_STATES.EARTH_RADIATION:
      stateData = {
        radiations: { gases: true },
      };
      break;
    default:
  }

  dispatch({ type: SET_NEXT_STATE, payload: stateData });
};
