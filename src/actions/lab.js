import {
  TOGGLE_WATER_FEEDBACK,
  TOGGLE_ICE_FEEDBACK,
  SET_RADIATION_MODE,
  SET_IS_PAUSED,
  SET_SCALE_UNIT,
  SET_SIMULATION_MODE,
  RESET,
  INCREMENT_INTERVAL_COUNT,
  TOGGLE_FLUXES_FILLS,
  RESET_FLUXES_FILLS,
  SET_VARIABLE,
  STORE_SETTINGS,
  RESTORE_SETTINGS,
  CLEAR_STORED_SETTINGS,
  SET_ANIMATION_PLAYING,
  SHOW_RUNAWAY_WARNING,
  SET_PROPAGATION_COMPLETE,
  SET_SHOW_NET_FLUX,
  SET_WATER_FEEDBACK,
  SET_ICE_FEEDBACK,
} from '../types';

export const toggleWaterFeedback = (payload) => (dispatch) => {
  dispatch({ type: TOGGLE_WATER_FEEDBACK, payload });
};

export const toggleIceFeedback = (payload) => (dispatch) => {
  dispatch({ type: TOGGLE_ICE_FEEDBACK, payload });
};

export const setRadiationMode = (payload) => (dispatch) => {
  dispatch({ type: SET_RADIATION_MODE, payload });
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

export const storeSettings = (payload) => (dispatch) =>
  dispatch({ type: STORE_SETTINGS, payload });

export const restoreSettings = (payload) => (dispatch) =>
  dispatch({ type: RESTORE_SETTINGS, payload });

export const clearStoredSettings = () => (dispatch) =>
  dispatch({ type: CLEAR_STORED_SETTINGS });

export const setAnimationPlaying = (payload) => (dispatch) =>
  dispatch({ type: SET_ANIMATION_PLAYING, payload });

export const showRunawayWarning = (payload) => (dispatch) =>
  dispatch({ type: SHOW_RUNAWAY_WARNING, payload });

export const setPropagationComplete = (payload) => (dispatch) =>
  dispatch({ type: SET_PROPAGATION_COMPLETE, payload });

export const setShowNetFlux = (payload) => (dispatch) =>
  dispatch({ type: SET_SHOW_NET_FLUX, payload });

export const setWaterFeedback = (payload) => (dispatch) =>
  dispatch({ type: SET_WATER_FEEDBACK, payload });

export const setIceFeedback = (payload) => (dispatch) =>
  dispatch({ type: SET_ICE_FEEDBACK, payload });
