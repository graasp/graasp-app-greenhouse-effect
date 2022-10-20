import {
  SET_GREENHOUSE_GASES_VALUES,
  SET_ALBEDO_VALUES,
  SET_FEEDBACK_VALUES,
  SET_RADIATION_MODE,
  SET_IS_PAUSED,
  SET_SCALE_UNIT,
  SET_SIMULATION_MODE,
  RESET,
  INCREMENT_INTERVAL_COUNT,
  TOGGLE_FLUXES_BLINKING,
} from '../types';

export const setGreenhouseGasesValues = (payload) => (dispatch) => {
  dispatch({ type: SET_GREENHOUSE_GASES_VALUES, payload });
};

export const setAlbedoValues = (payload) => (dispatch) => {
  dispatch({ type: SET_ALBEDO_VALUES, payload });
};

export const setFeedbackValues = (payload) => (dispatch) => {
  dispatch({ type: SET_FEEDBACK_VALUES, payload });
};

export const setRadiationMode = (payload) => (dispatch) => {
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

export const reset = (payload) => (dispatch) => {
  dispatch({ type: RESET, payload });
};

export const setSimulationMode = (payload) => (dispatch) => {
  dispatch({ type: SET_SIMULATION_MODE, payload });
};

export const incrementIntervalCount = () => (dispatch) =>
  dispatch({ type: INCREMENT_INTERVAL_COUNT });

export const toggleFluxesBlinking = () => (dispatch) =>
  dispatch({ type: TOGGLE_FLUXES_BLINKING });
