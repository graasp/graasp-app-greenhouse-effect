import {
  SET_FEEDBACK_VALUES,
  SET_RADIATION_MODE,
  SET_IS_PAUSED,
  SET_SCALE_UNIT,
  SET_SIMULATION_MODE,
  RESET,
  INCREMENT_INTERVAL_COUNT,
  SET_FINAL_CARBON_DIOXIDE,
  SET_FINAL_METHANE,
  SET_FINAL_CLOUD_COVER,
  SET_FINAL_ICE_COVER,
  SET_C_TERM,
  SET_TEMPORARY_ICE_COVER,
  SET_TEMPORARY_CLOUD_COVER,
  SET_TEMPORARY_CARBON_DIOXIDE,
  SET_TEMPORARY_METHANE,
  TOGGLE_FLUXES_FILLS,
  RESET_FLUXES_FILL,
} from '../types';

export const setFinalCarbonDioxide = (payload) => (dispatch) => {
  dispatch({ type: SET_FINAL_CARBON_DIOXIDE, payload });
};

export const setTemporaryCarbonDioxide = (payload) => (dispatch) => {
  dispatch({ type: SET_TEMPORARY_CARBON_DIOXIDE, payload });
};

export const setFinalMethane = (payload) => (dispatch) => {
  dispatch({ type: SET_FINAL_METHANE, payload });
};

export const setTemporaryMethane = (payload) => (dispatch) => {
  dispatch({ type: SET_TEMPORARY_METHANE, payload });
};

export const setFinalCloudCover = (payload) => (dispatch) => {
  dispatch({ type: SET_FINAL_CLOUD_COVER, payload });
};

export const setTemporaryCloudCover = (payload) => (dispatch) => {
  dispatch({ type: SET_TEMPORARY_CLOUD_COVER, payload });
};

export const setFinalIceCover = (payload) => (dispatch) => {
  dispatch({ type: SET_FINAL_ICE_COVER, payload });
};

export const setTemporaryIceCover = (payload) => (dispatch) => {
  dispatch({ type: SET_TEMPORARY_ICE_COVER, payload });
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

export const setCTerm = (payload) => (dispatch) =>
  dispatch({ type: SET_C_TERM, payload });

export const toggleFluxesFills = (payload) => (dispatch) =>
  dispatch({ type: TOGGLE_FLUXES_FILLS, payload });

export const resetFluxesFills = (payload) => (dispatch) =>
  dispatch({ type: RESET_FLUXES_FILL, payload });
