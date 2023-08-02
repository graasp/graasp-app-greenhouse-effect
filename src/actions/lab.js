import {
  SET_FEEDBACK_VALUES,
  SET_RADIATION_MODE,
  SET_IS_PAUSED,
  SET_SCALE_UNIT,
  SET_SIMULATION_MODE,
  RESET,
  INCREMENT_INTERVAL_COUNT,
  TOGGLE_FLUXES_FILLS,
  RESET_FLUXES_FILLS,
  SET_VALUES_TEMPORARILY,
  SET_VARIABLE,
  SET_PREVIOUS_SETTINGS,
  RESTORE_PREVIOUS_SETTINGS,
  CLEAR_PREVIOUS_SETTINGS,
  SET_ANIMATION_PLAYING,
  SHOW_RUNAWAY_WARNING,
  SET_PROPAGATION_COMPLETE,
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

export const resetFluxesFills = () => (dispatch) =>
  dispatch({ type: RESET_FLUXES_FILLS });

export const setVariable = (payload) => (dispatch) =>
  dispatch({ type: SET_VARIABLE, payload });

export const setValuesTemporarily = (payload) => (dispatch) =>
  dispatch({ type: SET_VALUES_TEMPORARILY, payload });

export const setPreviousSettings = (payload) => (dispatch) =>
  dispatch({ type: SET_PREVIOUS_SETTINGS, payload });

export const restorePreviousSettings = (payload) => (dispatch) =>
  dispatch({ type: RESTORE_PREVIOUS_SETTINGS, payload });

export const clearPreviousSettings = () => (dispatch) =>
  dispatch({ type: CLEAR_PREVIOUS_SETTINGS });

export const setAnimationPlaying = (payload) => (dispatch) =>
  dispatch({ type: SET_ANIMATION_PLAYING, payload });

export const showRunawayWarning = (payload) => (dispatch) =>
  dispatch({ type: SHOW_RUNAWAY_WARNING, payload });

export const setPropagationComplete = (payload) => (dispatch) =>
  dispatch({ type: SET_PROPAGATION_COMPLETE, payload });
