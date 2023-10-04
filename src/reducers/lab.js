import {
  INITIAL_FLUX_FILLS,
  RADIATION_MODES,
  SCALE_UNITS,
  INITIAL_SIMULATION_MODE,
  INITIAL_VARIABLES,
  THERMOMETER,
} from '../constants';
import {
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
  TOGGLE_WATER_FEEDBACK,
  TOGGLE_ICE_FEEDBACK,
} from '../types';
import {
  adjustFluxesFills,
  computeOutputs,
  computeWaterVapor,
  kelvinToCelsius,
} from '../utils';

const INITIAL_STATE = {
  isPaused: true,
  radiationMode: RADIATION_MODES.WAVES,
  simulationMode: INITIAL_SIMULATION_MODE.name,
  sliders: INITIAL_VARIABLES,
  thermometer: INITIAL_VARIABLES,
  waterFeedback: false,
  iceFeedback: false,
  scaleUnit: SCALE_UNITS.CELSIUS,
  intervalCount: 0,
  fluxesFills: INITIAL_FLUX_FILLS,
  previousSettings: {},
  animationPlaying: false,
  showRunawayWarning: false,
  propagationComplete: false,
  showNetFlux: false,
  iceCoverChangedFromFeedback: false,
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SET_RADIATION_MODE:
      return {
        ...state,
        radiationMode: payload,
        showNetFlux: payload === RADIATION_MODES.FLUXES,
        isPaused: true,
      };
    case SET_SCALE_UNIT:
      return { ...state, scaleUnit: payload };
    case TOGGLE_WATER_FEEDBACK:
      return { ...state, waterFeedback: payload };
    case TOGGLE_ICE_FEEDBACK:
      return { ...state, iceFeedback: payload };
    case SET_IS_PAUSED:
      return {
        ...state,
        isPaused: payload,
      };
    case SET_SIMULATION_MODE: {
      const { greenhouseEffect, albedo, temperature } = computeOutputs(
        payload,
        payload.name,
      );
      const updatedValues = {
        iceCover: payload.iceCover,
        cloudCover: payload.cloudCover,
        carbonDioxide: payload.carbonDioxide,
        methane: payload.methane,
        greenhouseEffect,
        albedo,
        temperature,
        waterVapor: payload.waterVapor,
        cTerm: payload.cTerm,
      };
      return {
        ...state,
        simulationMode: payload.name,
        sliders: updatedValues,
        thermometer: updatedValues,
        previousSettings: {},
        showRunawayWarning: false,
      };
    }
    case SET_VARIABLE: {
      const [values, section, updateWaterVapor] = payload;
      let updatedValues =
        section === THERMOMETER
          ? { ...state.thermometer, ...values }
          : { ...state.sliders, ...values };
      const {
        greenhouseEffect,
        albedo,
        temperature,
        waterVapor: newWaterVapor,
      } = computeOutputs(updatedValues, state.simulationMode);
      updatedValues = {
        ...updatedValues,
        greenhouseEffect,
        albedo,
        temperature,
        waterVapor: updateWaterVapor ? newWaterVapor : state.sliders.waterVapor,
      };
      const finalState = { ...state };
      finalState[section] = updatedValues;
      return finalState;
    }
    case SET_WATER_FEEDBACK: {
      const { cTerm, checked } = payload;
      const {
        temperature: thermoTemp,
        waterVapor: initialWaterVapor,
      } = state.thermometer;
      const { temperature, greenhouseEffect } = computeOutputs(
        { ...state.sliders, cTerm },
        state.simulationMode,
      );
      const waterVapor = checked
        ? computeWaterVapor(kelvinToCelsius(thermoTemp))
        : initialWaterVapor;
      return {
        ...state,
        sliders: {
          ...state.sliders,
          greenhouseEffect,
          temperature,
          waterVapor,
          cTerm,
        },
      };
    }
    case SET_ICE_FEEDBACK: {
      const { iceCover, checked } = payload;
      const { temperature, greenhouseEffect, albedo } = computeOutputs(
        { ...state.sliders, iceCover },
        state.simulationMode,
      );
      return {
        ...state,
        sliders: {
          ...state.sliders,
          iceCover,
          temperature,
          greenhouseEffect,
          albedo,
        },
        iceCoverChangedFromFeedback: checked,
      };
    }
    case STORE_SETTINGS:
      return {
        ...state,
        previousSettings: { ...state.previousSettings, ...payload },
      };
    case RESTORE_SETTINGS:
      return {
        ...state,
        sliders: payload.sliders,
        thermometer: payload.thermometer,
        waterFeedback: payload.waterFeedback,
        iceFeedback: payload.iceFeedback,
        showRunawayWarning: false,
      };
    case CLEAR_STORED_SETTINGS:
      return { ...state, previousSettings: {} };
    case INCREMENT_INTERVAL_COUNT:
      return { ...state, intervalCount: state.intervalCount + 1 };
    case RESET: {
      const { greenhouseEffect, albedo, temperature } = computeOutputs(
        payload,
        payload.name,
      );
      const updatedValues = {
        iceCover: payload.iceCover,
        cloudCover: payload.cloudCover,
        carbonDioxide: payload.carbonDioxide,
        methane: payload.methane,
        greenhouseEffect,
        albedo,
        temperature,
        waterVapor: payload.waterVapor,
        cTerm: payload.cTerm,
      };
      return {
        ...INITIAL_STATE,
        simulationMode: payload.name,
        sliders: updatedValues,
        thermometer: updatedValues,
        radiationMode: state.radiationMode,
        showNetFlux: state.radiationMode === RADIATION_MODES.FLUXES,
      };
    }
    case TOGGLE_FLUXES_FILLS:
      return {
        ...state,
        fluxesFills: adjustFluxesFills(state.fluxesFills, payload),
      };
    case RESET_FLUXES_FILLS:
      return { ...state, fluxesFills: INITIAL_FLUX_FILLS };
    case SET_ANIMATION_PLAYING:
      return { ...state, animationPlaying: payload };
    case SHOW_RUNAWAY_WARNING:
      return { ...state, showRunawayWarning: payload };
    case SET_PROPAGATION_COMPLETE:
      return { ...state, propagationComplete: payload };
    case SET_SHOW_NET_FLUX:
      return { ...state, showNetFlux: payload };
    default:
      return state;
  }
};
