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
  RESET_FLUXES_FILL,
  SET_VALUES_TEMPORARILY,
  SET_VARIABLE,
  SET_PREVIOUS_SETTINGS,
  RESTORE_PREVIOUS_SETTINGS,
  CLEAR_PREVIOUS_SETTINGS,
  SET_ANIMATION_PLAYING,
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
      };
    case CLEAR_PREVIOUS_SETTINGS:
      return { ...state, previousSettings: {} };
    case INCREMENT_INTERVAL_COUNT:
      return { ...state, intervalCount: state.intervalCount + 1 };
    case RESET:
      return INITIAL_STATE;
    case TOGGLE_FLUXES_FILLS:
      return {
        ...state,
        fluxesFills: adjustFluxesFills(state.fluxesFills, payload),
      };
    case RESET_FLUXES_FILL:
      return { ...state, fluxesFills: INITIAL_FLUX_FILLS };
    case SET_ANIMATION_PLAYING:
      return { ...state, animationPlaying: payload };
    default:
      return state;
  }
};
