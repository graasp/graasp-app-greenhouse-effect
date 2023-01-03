import { resetFluxesFills, toggleFluxesFills } from '../../actions';
import {
  FEEDBACK_EFFECTS_DEFAULT_EPSILON,
  MAX_TEMPERATURE_DISPLAYED_ON_EARTH_CELSIUS,
  ICE_COVER_MAX_VALUE,
  ICE_COVER_MIN_VALUE,
  GREENHOUSE_EFFECT_MIN_VALUE,
  GREENHOUSE_EFFECT_MAX_VALUE,
  GRADUAL_UPDATE_INTERVAL,
} from '../../constants';
import {
  computeAlbedo,
  computeCTerm,
  computeGreenhouseEffect,
  computeIceCover,
  computeTemperature,
  kelvinToCelsius,
} from '../physics';

export const computeWaterVaporFeedbackCTerms = (
  carbonDioxide,
  methane,
  albedo,
  temperature,
  simulationMode,
  epsilon = FEEDBACK_EFFECTS_DEFAULT_EPSILON,
) => {
  const cTerms = [];
  let previousTemperature;
  let newTemperature;
  do {
    previousTemperature = newTemperature || kelvinToCelsius(temperature);
    const newCTerm = computeCTerm(previousTemperature);
    const newGreenhouseEffect = computeGreenhouseEffect(
      carbonDioxide,
      methane,
      newCTerm,
      simulationMode,
    );
    newTemperature = kelvinToCelsius(
      computeTemperature(newGreenhouseEffect, albedo, simulationMode),
    );
    if (
      newGreenhouseEffect >= GREENHOUSE_EFFECT_MAX_VALUE ||
      newGreenhouseEffect <= GREENHOUSE_EFFECT_MIN_VALUE
    ) {
      cTerms.push(newCTerm);
      break;
    }
    cTerms.push(newCTerm);
    if (newTemperature > MAX_TEMPERATURE_DISPLAYED_ON_EARTH_CELSIUS) {
      break;
    }
  } while (Math.abs(newTemperature - previousTemperature) > epsilon);

  return cTerms;
};

export const computeIceCoverFeedbackTerms = (
  temperature,
  greenhouseEffect,
  cloudCover,
  simulationMode,
  epsilon = FEEDBACK_EFFECTS_DEFAULT_EPSILON,
) => {
  const iceCoverTerms = [];
  let previousTemperature;
  let newTemperature;
  do {
    previousTemperature = newTemperature || kelvinToCelsius(temperature);
    const newIceCover = computeIceCover(previousTemperature);
    const { totalAlbedo: newAlbedo } = computeAlbedo(
      newIceCover,
      cloudCover,
      simulationMode,
    );
    newTemperature = kelvinToCelsius(
      computeTemperature(greenhouseEffect, newAlbedo, simulationMode),
    );
    if (newIceCover >= ICE_COVER_MAX_VALUE) {
      iceCoverTerms.push(ICE_COVER_MAX_VALUE);
      break;
    }
    if (newIceCover <= ICE_COVER_MIN_VALUE) {
      iceCoverTerms.push(ICE_COVER_MIN_VALUE);
      break;
    }
    iceCoverTerms.push(newIceCover);
    if (newTemperature > MAX_TEMPERATURE_DISPLAYED_ON_EARTH_CELSIUS) {
      break;
    }
  } while (Math.abs(newTemperature - previousTemperature) > epsilon);

  return iceCoverTerms;
};

export const computeBothFeedbackTerms = (
  temperature,
  carbonDioxide,
  methane,
  cloudCover,
  simulationMode,
  epsilon = FEEDBACK_EFFECTS_DEFAULT_EPSILON,
) => {
  const feedbackTerms = [];
  let previousTemperature;
  let newTemperature;
  do {
    previousTemperature = newTemperature || kelvinToCelsius(temperature);
    const newCTerm = computeCTerm(previousTemperature);
    const newIceCover = computeIceCover(previousTemperature);
    const newGreenhouseEffect = computeGreenhouseEffect(
      carbonDioxide,
      methane,
      newCTerm,
      simulationMode,
    );
    const { totalAlbedo: newAlbedo } = computeAlbedo(
      newIceCover,
      cloudCover,
      simulationMode,
    );
    newTemperature = kelvinToCelsius(
      computeTemperature(newGreenhouseEffect, newAlbedo, simulationMode),
    );
    if (newIceCover >= ICE_COVER_MAX_VALUE) {
      feedbackTerms.push({ iceCover: ICE_COVER_MAX_VALUE, cTerm: newCTerm });
      break;
    }
    if (newIceCover <= ICE_COVER_MIN_VALUE) {
      feedbackTerms.push({ iceCover: ICE_COVER_MIN_VALUE, cTerm: newCTerm });
      break;
    }
    if (
      newGreenhouseEffect >= GREENHOUSE_EFFECT_MAX_VALUE ||
      newGreenhouseEffect <= GREENHOUSE_EFFECT_MIN_VALUE
    ) {
      feedbackTerms.push({ iceCover: newIceCover, cTerm: newCTerm });
      break;
    }
    feedbackTerms.push({
      iceCover: newIceCover,
      cTerm: newCTerm,
      newGreenhouseEffect,
      newTemperature,
      newAlbedo,
    });
    if (newTemperature > MAX_TEMPERATURE_DISPLAYED_ON_EARTH_CELSIUS) {
      break;
    }
  } while (Math.abs(newTemperature - previousTemperature) > epsilon);

  return feedbackTerms;
};

export const graduallyDispatchFeedbackTerms = (
  terms,
  dispatch,
  actions,
  fluxesToToggle,
  delay = GRADUAL_UPDATE_INTERVAL,
) => {
  for (let i = 0; i < terms.length; i += 1) {
    setTimeout(() => {
      dispatch(toggleFluxesFills(fluxesToToggle));
      actions.forEach((action) => dispatch(action(terms[i])));
      if (i === terms.length - 1) {
        dispatch(resetFluxesFills());
      }
    }, delay * (i + 1));
  }
};
