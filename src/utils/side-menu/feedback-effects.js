import {
  resetFluxesFills,
  setAnimationPlaying,
  setVariable,
  toggleFluxesFills,
} from '../../actions';
import {
  FEEDBACK_EFFECTS_DEFAULT_EPSILON,
  MAX_TEMPERATURE_DISPLAYED_ON_EARTH_CELSIUS,
  ICE_COVER_MAX_VALUE,
  ICE_COVER_MIN_VALUE,
  GREENHOUSE_EFFECT_MIN_VALUE,
  GREENHOUSE_EFFECT_MAX_VALUE,
  GRADUAL_UPDATE_INTERVAL,
  GRADUAL_UPDATE_NUM_INCREMENTS,
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
      cTerms.push({ cTerm: newCTerm });
      break;
    }
    cTerms.push({ cTerm: newCTerm });
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
      iceCoverTerms.push({ iceCover: ICE_COVER_MAX_VALUE });
      break;
    }
    if (newIceCover <= ICE_COVER_MIN_VALUE) {
      iceCoverTerms.push({ iceCover: ICE_COVER_MIN_VALUE });
      break;
    }
    iceCoverTerms.push({ iceCover: newIceCover });
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

export const computeIncrements = (
  targetValues,
  originalValues,
  numIncrements = GRADUAL_UPDATE_NUM_INCREMENTS,
) => {
  const {
    sliderIceCover,
    sliderCloudCover,
    sliderCarbonDioxide,
    sliderMethane,
  } = targetValues;

  const {
    thermometerIceCover,
    thermometerCloudCover,
    thermometerCarbonDioxide,
    thermometerMethane,
  } = originalValues;

  const increments = [];
  for (let i = 1; i <= numIncrements; i += 1) {
    increments.push({
      iceCover:
        thermometerIceCover +
        ((sliderIceCover - thermometerIceCover) / numIncrements) * i,
      cloudCover:
        thermometerCloudCover +
        ((sliderCloudCover - thermometerCloudCover) / numIncrements) * i,
      carbonDioxide:
        thermometerCarbonDioxide +
        ((sliderCarbonDioxide - thermometerCarbonDioxide) / numIncrements) * i,
      methane:
        thermometerMethane +
        ((sliderMethane - thermometerMethane) / numIncrements) * i,
    });
  }

  return increments;
};

export const graduallyDispatchTerms = (
  terms,
  dispatch,
  sections,
  fluxesToToggle,
  updateWaterVapor = false,
  delay = GRADUAL_UPDATE_INTERVAL,
) => {
  dispatch(setAnimationPlaying(true));
  for (let i = 0; i < terms.length; i += 1) {
    setTimeout(() => {
      dispatch(toggleFluxesFills(fluxesToToggle));
      sections.forEach((section) =>
        dispatch(setVariable([terms[i], section, updateWaterVapor])),
      );
      if (i === terms.length - 1) {
        dispatch(resetFluxesFills());
        dispatch(setAnimationPlaying(false));
      }
    }, delay * (i + 1));
  }
};
