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
  SET_SLIDER_ICE_COVER,
  SET_SLIDER_CLOUD_COVER,
  SET_SLIDER_CARBON_DIOXIDE,
  SET_SLIDER_METHANE,
  SET_THERMOMETER_VALUES,
  SET_C_TERM,
  SET_VALUES_TEMPORARILY_VIA_C_TERM,
  SET_VALUES_TEMPORARILY_VIA_ICE_COVER,
  SET_THERMOMETER_ICE_COVER,
  SET_ICE_COVER_AND_C_TERM,
  SET_IMPLIED_WATER_VAPOR,
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

export const setValuesTemporarilyViaCTerm = (payload) => (dispatch) =>
  dispatch({ type: SET_VALUES_TEMPORARILY_VIA_C_TERM, payload });

export const setValuesTemporarilyViaIceCover = (payload) => (dispatch) =>
  dispatch({ type: SET_VALUES_TEMPORARILY_VIA_ICE_COVER, payload });

export const setCTerm = (payload) => (dispatch) =>
  dispatch({ type: SET_C_TERM, payload });

export const toggleFluxesFills = (payload) => (dispatch) =>
  dispatch({ type: TOGGLE_FLUXES_FILLS, payload });

export const resetFluxesFills = (payload) => (dispatch) =>
  dispatch({ type: RESET_FLUXES_FILL, payload });

export const setSliderIceCover = (payload) => (dispatch) =>
  dispatch({ type: SET_SLIDER_ICE_COVER, payload });

export const setSliderCloudCover = (payload) => (dispatch) =>
  dispatch({ type: SET_SLIDER_CLOUD_COVER, payload });

export const setSliderCarbonDioxide = (payload) => (dispatch) =>
  dispatch({ type: SET_SLIDER_CARBON_DIOXIDE, payload });

export const setSliderMethane = (payload) => (dispatch) =>
  dispatch({ type: SET_SLIDER_METHANE, payload });

export const setThermometerValues = (payload) => (dispatch) =>
  dispatch({ type: SET_THERMOMETER_VALUES, payload });

export const setThermometerIceCover = (payload) => (dispatch) =>
  dispatch({ type: SET_THERMOMETER_ICE_COVER, payload });

export const setIceCoverAndCTerm = (payload) => (dispatch) =>
  dispatch({ type: SET_ICE_COVER_AND_C_TERM, payload });

export const setImpliedWaterVapor = (payload) => (dispatch) =>
  dispatch({ type: SET_IMPLIED_WATER_VAPOR, payload });
