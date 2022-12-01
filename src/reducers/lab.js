import _ from 'lodash';
import {
  INITIAL_FLUX_FILLS,
  RADIATION_MODES,
  SCALE_UNITS,
  SIMULATION_MODES,
} from '../config/constants';
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
import { adjustFluxesFills } from '../utils/reducers';

const INITIAL_STATE = {
  isPaused: true,
  settings: {
    open: false,
  },
  radiationMode: RADIATION_MODES.WAVES,
  simulationMode: SIMULATION_MODES.TODAY.name,
  finalCarbonDioxide: SIMULATION_MODES.TODAY.carbonDioxide,
  temporaryCarbonDioxide: SIMULATION_MODES.TODAY.carbonDioxide,
  finalMethane: SIMULATION_MODES.TODAY.methane,
  temporaryMethane: SIMULATION_MODES.TODAY.methane,
  cTerm: SIMULATION_MODES.TODAY.cTerm,
  waterVapor: SIMULATION_MODES.TODAY.waterVapor,
  finalIceCover: SIMULATION_MODES.TODAY.iceCover,
  temporaryIceCover: SIMULATION_MODES.TODAY.iceCover,
  finalCloudCover: SIMULATION_MODES.TODAY.cloudCover,
  temporaryCloudCover: SIMULATION_MODES.TODAY.cloudCover,
  feedback: {
    iceCoverChange: false,
    waterVapor: false,
  },
  showLoader: true,
  showSideMenu: true,
  scaleUnit: SCALE_UNITS.CELSIUS,
  intervalCount: 0,
  fluxesFills: INITIAL_FLUX_FILLS,
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
    case SET_FINAL_CARBON_DIOXIDE:
      return { ...state, finalCarbonDioxide: payload };
    case SET_TEMPORARY_CARBON_DIOXIDE:
      return { ...state, temporaryCarbonDioxide: payload };
    case SET_FINAL_METHANE:
      return { ...state, finalMethane: payload };
    case SET_TEMPORARY_METHANE:
      return { ...state, temporaryMethane: payload };
    case SET_C_TERM:
      return { ...state, cTerm: payload };
    case SET_FINAL_CLOUD_COVER:
      return { ...state, finalCloudCover: payload };
    case SET_TEMPORARY_CLOUD_COVER:
      return { ...state, temporaryCloudCover: payload };
    case SET_FINAL_ICE_COVER:
      return { ...state, finalIceCover: payload };
    case SET_TEMPORARY_ICE_COVER:
      return { ...state, temporaryIceCover: payload };
    case SET_SIMULATION_MODE:
      return {
        ...state,
        simulationMode: payload.name,
        finalCarbonDioxide: payload.carbonDioxide,
        temporaryCarbonDioxide: payload.carbonDioxide,
        finalMethane: payload.methane,
        temporaryMethane: payload.methane,
        cTerm: payload.cTerm,
        waterVapor: payload.waterVapor,
        finalIceCover: payload.iceCover,
        temporaryIceCover: payload.iceCover,
        finalCloudCover: payload.cloudCover,
        temporaryCloudCover: payload.cloudCover,
      };

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
    default:
      return state;
  }
};
