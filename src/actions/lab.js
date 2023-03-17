import {
  SET_FEEDBACK_VALUES,
  SET_RADIATION_MODE,
  SET_IS_PAUSED,
  SET_SCALE_UNIT,
  SET_SIMULATION_MODE,
  RESET,
  INCREMENT_INTERVAL_COUNT,
  TOGGLE_FLUXES_FILLS,
  RESET_FLUXES_FILL,
  SET_VALUES_TEMPORARILY,
  SET_VARIABLE,
} from '../types';

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

export const toggleFluxesFills = (payload) => (dispatch) =>
  dispatch({ type: TOGGLE_FLUXES_FILLS, payload });

export const resetFluxesFills = (payload) => (dispatch) =>
  dispatch({ type: RESET_FLUXES_FILL, payload });

export const setVariable = (payload) => (dispatch) =>
  dispatch({ type: SET_VARIABLE, payload });

export const setValuesTemporarily = (payload) => (dispatch) =>
  dispatch({ type: SET_VALUES_TEMPORARILY, payload });
