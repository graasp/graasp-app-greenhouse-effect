import {
  resetFluxesFills,
  setAnimationPlaying,
  setIsPaused,
  setVariable,
  storeSettings,
  toggleFluxesFills,
} from '../../actions';
import {
  MAX_TEMPERATURE_DISPLAYED_ON_EARTH_CELSIUS,
  MAX_ICE_COVER,
  MIN_ICE_COVER,
  SLIDERS,
  THERMOMETER,
  EARTH_FLUXES,
} from '../../constants';
import { computeOutputs, kelvinToCelsius } from '../physics';

export const exceedsMaxTemp = (temperature) => {
  return temperature > MAX_TEMPERATURE_DISPLAYED_ON_EARTH_CELSIUS;
};

export const isOutOfBounds = (sliderVariable) => {
  const ONE_HUNDRED_PERCENT = 1;
  const ZERO = 0;
  return sliderVariable >= ONE_HUNDRED_PERCENT || sliderVariable <= ZERO;
};

export const boundIceCover = (iceCover) => {
  if (iceCover >= MAX_ICE_COVER) {
    return MAX_ICE_COVER;
  }
  if (iceCover <= MIN_ICE_COVER) {
    return MIN_ICE_COVER;
  }
  return iceCover;
};

export const projectOutputs = (sliders, projectedTerm, simulationMode) => {
  const { temperature, greenhouseEffect } = computeOutputs(
    { ...sliders, ...projectedTerm },
    simulationMode,
  );
  return { temperature: kelvinToCelsius(temperature), greenhouseEffect };
};

export const updateWaterVapor = (dispatch, waterFeedback) =>
  dispatch(setVariable([{}, SLIDERS, waterFeedback]));

export const toggleAnimationPlaying = (dispatch, toggleOn) => {
  dispatch(resetFluxesFills());
  if (toggleOn) {
    dispatch(setAnimationPlaying(true));
  } else {
    dispatch(setAnimationPlaying(false));
  }
};

export const pauseAnimation = (dispatch) => {
  dispatch(setIsPaused(true));
};

export const setInThermometer = (dispatch, term, waterFeedback = false) => {
  dispatch(setVariable([term, THERMOMETER, waterFeedback]));
};

export const setInSlider = (dispatch, term) => {
  dispatch(setVariable([term, SLIDERS]));
};

export const blinkEarthFluxes = (dispatch) => {
  dispatch(toggleFluxesFills(EARTH_FLUXES));
};

export const storeBlinkingFluxes = (dispatch) => {
  const fluxesToBlink = EARTH_FLUXES;
  dispatch(storeSettings({ fluxesToBlink }));
};
