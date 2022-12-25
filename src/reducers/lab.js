import _ from 'lodash';
import {
  INITIAL_CARBON_DIOXIDE,
  INITIAL_CLOUD_COVER,
  INITIAL_FLUX_FILLS,
  INITIAL_ICE_COVER,
  INITIAL_METHANE,
  INITIAL_C_TERM,
  RADIATION_MODES,
  SCALE_UNITS,
  SIMULATION_MODES,
  INITIAL_SIMULATION_MODE,
} from '../config/constants';
import {
  SET_FEEDBACK_VALUES,
  SET_RADIATION_MODE,
  SET_IS_PAUSED,
  SET_SCALE_UNIT,
  SET_SIMULATION_MODE,
  RESET,
  INCREMENT_INTERVAL_COUNT,
  SET_VALUES_TEMPORARILY_VIA_C_TERM,
  TOGGLE_FLUXES_FILLS,
  RESET_FLUXES_FILL,
  SET_SLIDER_ICE_COVER,
  SET_SLIDER_CLOUD_COVER,
  SET_SLIDER_CARBON_DIOXIDE,
  SET_SLIDER_METHANE,
  SET_THERMOMETER_VALUES,
  SET_C_TERM,
  SET_VALUES_TEMPORARILY_VIA_ICE_COVER,
  SET_THERMOMETER_ICE_COVER,
} from '../types';
import {
  computeAlbedo,
  computeGreenhouseEffect,
  computeTemperature,
} from '../utils/greenhouseEffect';
import { adjustFluxesFills } from '../utils/reducers';

const INITIAL_ALBEDO = computeAlbedo(
  INITIAL_ICE_COVER,
  INITIAL_CLOUD_COVER,
  INITIAL_SIMULATION_MODE.name,
);

const INITIAL_GREENHOUSE_EFFECT = computeGreenhouseEffect(
  INITIAL_CARBON_DIOXIDE,
  INITIAL_METHANE,
  INITIAL_C_TERM,
  INITIAL_SIMULATION_MODE.name,
);

export const INITIAL_TEMPERATURE = computeTemperature(
  INITIAL_GREENHOUSE_EFFECT,
  INITIAL_ALBEDO.totalAlbedo,
  INITIAL_SIMULATION_MODE.name,
);

const INITIAL_STATE = {
  isPaused: true,
  settings: {
    open: false,
  },
  radiationMode: RADIATION_MODES.WAVES,
  simulationMode: INITIAL_SIMULATION_MODE.name,
  sliderCarbonDioxide: INITIAL_CARBON_DIOXIDE,
  thermometerCarbonDioxide: INITIAL_CARBON_DIOXIDE,
  sliderMethane: INITIAL_METHANE,
  thermometerMethane: INITIAL_METHANE,
  sliderIceCover: INITIAL_ICE_COVER,
  thermometerIceCover: INITIAL_ICE_COVER,
  sliderCloudCover: INITIAL_CLOUD_COVER,
  thermometerCloudCover: INITIAL_CLOUD_COVER,
  impliedAlbedo: INITIAL_ALBEDO,
  thermometerAlbedo: INITIAL_ALBEDO,
  impliedGreenhouseEffect: INITIAL_GREENHOUSE_EFFECT,
  thermometerGreenhouseEffect: INITIAL_GREENHOUSE_EFFECT,
  impliedTemperature: INITIAL_TEMPERATURE,
  thermometerTemperature: INITIAL_TEMPERATURE,
  cTerm: SIMULATION_MODES.TODAY.cTerm,
  waterVapor: SIMULATION_MODES.TODAY.waterVapor,
  feedback: {
    waterVaporFeedbackOn: false,
    iceCoverFeedbackOn: false,
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
    case SET_C_TERM: {
      const greenhouseEffect = computeGreenhouseEffect(
        state.sliderCarbonDioxide,
        state.sliderMethane,
        payload,
        state.simulationMode,
      );
      const temperature = computeTemperature(
        greenhouseEffect,
        state.impliedAlbedo.totalAlbedo,
        state.simulationMode,
      );
      return {
        ...state,
        impliedGreenhouseEffect: greenhouseEffect,
        thermometerGreenhouseEffect: greenhouseEffect,
        impliedTemperature: temperature,
        thermometerTemperature: temperature,
        cTerm: payload,
      };
    }
    case SET_SIMULATION_MODE: {
      const albedo = computeAlbedo(
        payload.iceCover,
        payload.cloudCover,
        payload.name,
      );

      const greenhouseEffect = computeGreenhouseEffect(
        payload.carbonDioxide,
        payload.methane,
        payload.cTerm,
        payload.name,
      );

      const temperature = computeTemperature(
        greenhouseEffect,
        albedo.totalAlbedo,
        payload.name,
      );

      return {
        ...state,
        simulationMode: payload.name,
        sliderCarbonDioxide: payload.carbonDioxide,
        thermometerCarbonDioxide: payload.carbonDioxide,
        sliderMethane: payload.methane,
        thermometerMethane: payload.methane,
        sliderIceCover: payload.iceCover,
        thermometerIceCover: payload.iceCover,
        sliderCloudCover: payload.cloudCover,
        thermometerCloudCover: payload.cloudCover,
        impliedAlbedo: albedo,
        thermometerAlbedo: albedo,
        impliedGreenhouseEffect: greenhouseEffect,
        thermometerGreenhouseEffect: greenhouseEffect,
        impliedTemperature: temperature,
        thermometerTemperature: temperature,
        cTerm: payload.cTerm,
        waterVapor: payload.waterVapor,
      };
    }
    case SET_SLIDER_ICE_COVER: {
      const impliedAlbedo = computeAlbedo(
        payload,
        state.sliderCloudCover,
        state.simulationMode,
      );
      return {
        ...state,
        sliderIceCover: payload,
        impliedAlbedo,
        impliedTemperature: computeTemperature(
          state.impliedGreenhouseEffect,
          impliedAlbedo.totalAlbedo,
          state.simulationMode,
        ),
      };
    }
    case SET_SLIDER_CLOUD_COVER: {
      const impliedAlbedo = computeAlbedo(
        state.sliderIceCover,
        payload,
        state.simulationMode,
      );
      return {
        ...state,
        sliderCloudCover: payload,
        impliedAlbedo,
        impliedTemperature: computeTemperature(
          state.impliedGreenhouseEffect,
          impliedAlbedo.totalAlbedo,
          state.simulationMode,
        ),
      };
    }
    case SET_SLIDER_CARBON_DIOXIDE: {
      const impliedGreenhouseEffect = computeGreenhouseEffect(
        payload,
        state.sliderMethane,
        state.cTerm,
        state.simulationMode,
      );
      return {
        ...state,
        sliderCarbonDioxide: payload,
        impliedGreenhouseEffect,
        impliedTemperature: computeTemperature(
          impliedGreenhouseEffect,
          state.impliedAlbedo.totalAlbedo,
          state.simulationMode,
        ),
      };
    }
    case SET_SLIDER_METHANE: {
      const impliedGreenhouseEffect = computeGreenhouseEffect(
        state.sliderCarbonDioxide,
        payload,
        state.cTerm,
        state.simulationMode,
      );
      return {
        ...state,
        sliderMethane: payload,
        impliedGreenhouseEffect,
        impliedTemperature: computeTemperature(
          impliedGreenhouseEffect,
          state.impliedAlbedo.totalAlbedo,
          state.simulationMode,
        ),
      };
    }
    case SET_THERMOMETER_VALUES: {
      const thermometerAlbedo = computeAlbedo(
        payload.iceCover,
        payload.cloudCover,
        state.simulationMode,
      );
      const thermometerGreenhouseEffect = computeGreenhouseEffect(
        payload.carbonDioxide,
        payload.methane,
        state.cTerm,
        state.simulationMode,
      );
      const thermometerTemperature = computeTemperature(
        thermometerGreenhouseEffect,
        thermometerAlbedo.totalAlbedo,
        state.simulationMode,
      );

      return {
        ...state,
        thermometerIceCover: payload.iceCover,
        thermometerCloudCover: payload.cloudCover,
        thermometerCarbonDioxide: payload.carbonDioxide,
        thermometerMethane: payload.methane,
        thermometerAlbedo,
        thermometerGreenhouseEffect,
        thermometerTemperature,
      };
    }
    case SET_THERMOMETER_ICE_COVER: {
      const thermometerAlbedo = computeAlbedo(
        payload,
        state.thermometerCloudCover,
        state.simulationMode,
      );
      const thermometerTemperature = computeTemperature(
        state.thermometerGreenhouseEffect,
        thermometerAlbedo.totalAlbedo,
        state.simulationMode,
      );

      return {
        ...state,
        thermometerAlbedo,
        thermometerTemperature,
        thermometerIceCover: payload,
      };
    }
    case SET_VALUES_TEMPORARILY_VIA_C_TERM: {
      const impliedGreenhouseEffect = computeGreenhouseEffect(
        state.sliderCarbonDioxide,
        state.sliderMethane,
        payload,
        state.simulationMode,
      );
      const impliedTemperature = computeTemperature(
        impliedGreenhouseEffect,
        state.impliedAlbedo.totalAlbedo,
        state.simulationMode,
      );
      return {
        ...state,
        impliedGreenhouseEffect,
        impliedTemperature,
      };
    }
    case SET_VALUES_TEMPORARILY_VIA_ICE_COVER: {
      const impliedAlbedo = computeAlbedo(
        payload,
        state.sliderCloudCover,
        state.simulationMode,
      );
      const impliedTemperature = computeTemperature(
        state.impliedGreenhouseEffect,
        impliedAlbedo.totalAlbedo,
        state.simulationMode,
      );
      return {
        ...state,
        sliderIceCover: payload,
        impliedAlbedo,
        impliedTemperature,
      };
    }
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
