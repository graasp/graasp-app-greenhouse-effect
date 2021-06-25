import {
  SET_GREENHOUSE_GASES_VALUES,
  SET_ALBEDO,
  SET_FEEDBACK_VALUES,
  SET_RADIATION_MODE,
  SET_NEXT_STATE,
  SET_IS_PAUSED,
  SET_SCALE_UNIT,
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

export const setScaleUnit = (payload) => (dispatch) => {
  dispatch({ type: SET_SCALE_UNIT, payload });
};

export const setIsPaused = (payload) => (dispatch) =>
  dispatch({
    type: SET_IS_PAUSED,
    payload,
  });

export const setNextState = (payload) => (dispatch) => {
  dispatch({ type: SET_NEXT_STATE, payload });
};
