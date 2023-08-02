import _ from 'lodash';
import {
  INITIAL_FLUX_FILLS,
  RADIATION_MODES,
  SCALE_UNITS,
  INITIAL_SIMULATION_MODE,
  INITIAL_VARIABLES,
  THERMOMETER,
} from '../constants';
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
import { adjustFluxesFills, computeAllOutputs } from '../utils';

const INITIAL_STATE = {
  isPaused: true,
  settings: {
    open: false,
  },
  radiationMode: RADIATION_MODES.WAVES,
  simulationMode: INITIAL_SIMULATION_MODE.name,
  sliders: INITIAL_VARIABLES,
  thermometer: INITIAL_VARIABLES,
  feedback: {
    waterVaporFeedbackOn: false,
    iceCoverFeedbackOn: false,
  },
  showLoader: true,
  showSideMenu: true,
  scaleUnit: SCALE_UNITS.CELSIUS,
  intervalCount: 0,
  fluxesFills: INITIAL_FLUX_FILLS,
  previousSettings: {},
  animationPlaying: false,
  showRunawayWarning: false,
  iceCoverTemporary: false,
  propagationComplete: false,
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SET_RADIATION_MODE:
      return { ...state, radiationMode: payload };
    case SET_SCALE_UNIT:
      return { ...state, scaleUnit: payload };
    case SET_FEEDBACK_VALUES:
      return { ...state, feedback: _.merge({}, state.feedback, payload) };
    case SET_IS_PAUSED:
      return {
        ...state,
        isPaused: payload,
      };
    case SET_SIMULATION_MODE: {
      const { greenhouseEffect, albedo, temperature } = computeAllOutputs(
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
      } = computeAllOutputs(updatedValues, state.simulationMode);
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
    case SET_VALUES_TEMPORARILY: {
      const {
        albedo,
        temperature,
        greenhouseEffect,
        waterVapor: newWaterVapor,
      } = computeAllOutputs(
        { ...state.sliders, ...payload },
        state.simulationMode,
      );
      return {
        ...state,
        sliders: {
          ...state.sliders,
          albedo,
          greenhouseEffect,
          temperature,
          iceCover: payload.iceCover
            ? payload.iceCover
            : state.sliders.iceCover,
          waterVapor:
            payload.cTerm && payload.checked
              ? newWaterVapor
              : state.thermometer.waterVapor,
        },
        iceCoverTemporary: payload.iceCoverTemporary || false,
      };
    }
    case SET_PREVIOUS_SETTINGS:
      return {
        ...state,
        previousSettings: { ...state.previousSettings, ...payload },
      };
    case RESTORE_PREVIOUS_SETTINGS:
      return {
        ...state,
        sliders: payload.sliders,
        thermometer: payload.thermometer,
        feedback: payload.feedback,
        showRunawayWarning: false,
      };
    case CLEAR_PREVIOUS_SETTINGS:
      return { ...state, previousSettings: {} };
    case INCREMENT_INTERVAL_COUNT:
      return { ...state, intervalCount: state.intervalCount + 1 };
    case RESET: {
      const { greenhouseEffect, albedo, temperature } = computeAllOutputs(
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
    default:
      return state;
  }
};
