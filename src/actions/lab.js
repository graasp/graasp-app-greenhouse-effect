import {
  SET_FEEDBACK_VALUES,
  SET_RADIATION_MODE,
  SET_IS_PAUSED,
  SET_SCALE_UNIT,
  SET_SIMULATION_MODE,
  RESET,
  INCREMENT_INTERVAL_COUNT,
  TOGGLE_FLUXES_BLINKING,
  SET_CARBON_DIOXIDE,
  SET_METHANE,
  SET_WATER_VAPOR,
  SET_CLOUD_COVER,
  SET_ICE_COVER,
  SET_C_TERM,
} from '../types';

export const setCarbonDioxide = (payload) => (dispatch) => {
  dispatch({ type: SET_CARBON_DIOXIDE, payload });
};

export const setMethane = (payload) => (dispatch) => {
  dispatch({ type: SET_METHANE, payload });
};

export const setWaterVapor = (payload) => (dispatch) => {
  dispatch({ type: SET_WATER_VAPOR, payload });
};

export const setCloudCover = (payload) => (dispatch) => {
  dispatch({ type: SET_CLOUD_COVER, payload });
};

export const setIceCover = (payload) => (dispatch) => {
  dispatch({ type: SET_ICE_COVER, payload });
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

export const setCTerm = (payload) => (dispatch) =>
  dispatch({ type: SET_C_TERM, payload });
