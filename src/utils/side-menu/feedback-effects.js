import {
  resetFluxesFills,
  setAnimationPlaying,
  setVariable,
  showRunawayWarning,
  toggleFluxesFills,
} from '../../actions';
import {
  MAX_TEMPERATURE_DISPLAYED_ON_EARTH_CELSIUS,
  MAX_ICE_COVER,
  MIN_ICE_COVER,
  MIN_GHE,
  MAX_GHE,
  GRADUAL_UPDATE_INTERVAL,
  GRADUAL_UPDATE_NUM_INCREMENTS,
  FIRST_ITERATION_EPSILON,
  DEFAULT_EPSILON,
} from '../../constants';
import {
  computeAllOutputs,
  computeCTerm,
  computeIceCover,
  kelvinToCelsius,
} from '../physics';

export const computeWaterVaporFeedbackCTerms = (
  values,
  currentTemperature,
  simulationMode,
) => {
  const cTerms = [];
  let previousTemperature;
  let newTemperature;
  let runawayGreenhouseEffect = false;
  let epsilon = FIRST_ITERATION_EPSILON;

  do {
    previousTemperature = newTemperature || kelvinToCelsius(currentTemperature);
    const newCTerm = computeCTerm(previousTemperature);
    const { temperature, greenhouseEffect } = computeAllOutputs(
      { ...values, cTerm: newCTerm },
      simulationMode,
    );
    newTemperature = kelvinToCelsius(temperature);
    cTerms.push({ cTerm: newCTerm });
    epsilon = DEFAULT_EPSILON;

    if (greenhouseEffect >= MAX_GHE || greenhouseEffect <= MIN_GHE) {
      break;
    }

    if (newTemperature > MAX_TEMPERATURE_DISPLAYED_ON_EARTH_CELSIUS) {
      runawayGreenhouseEffect = true;
      break;
    }
  } while (Math.abs(newTemperature - previousTemperature) > epsilon);

  return { cTerms, runawayGreenhouseEffect };
};

export const computeIceCoverFeedbackTerms = (
  values,
  currentTemperature,
  simulationMode,
) => {
  const iceCoverTerms = [];
  let previousTemperature;
  let newTemperature;
  let runawayGreenhouseEffect = false;
  let epsilon = FIRST_ITERATION_EPSILON;

  do {
    previousTemperature = newTemperature || kelvinToCelsius(currentTemperature);
    const newIceCover = computeIceCover(previousTemperature);
    const { temperature } = computeAllOutputs(
      { ...values, iceCover: newIceCover },
      simulationMode,
    );
    newTemperature = kelvinToCelsius(temperature);
    if (newIceCover >= MAX_ICE_COVER) {
      iceCoverTerms.push({ iceCover: MAX_ICE_COVER });
      break;
    }
    if (newIceCover <= MIN_ICE_COVER) {
      iceCoverTerms.push({ iceCover: MIN_ICE_COVER });
      break;
    }
    iceCoverTerms.push({ iceCover: newIceCover });
    epsilon = DEFAULT_EPSILON;

    if (newTemperature > MAX_TEMPERATURE_DISPLAYED_ON_EARTH_CELSIUS) {
      runawayGreenhouseEffect = true;
      break;
    }
  } while (Math.abs(newTemperature - previousTemperature) > epsilon);

  return { iceCoverTerms, runawayGreenhouseEffect };
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

  if (
    sliderIceCover === thermometerIceCover &&
    sliderCloudCover === thermometerCloudCover &&
    sliderCarbonDioxide === thermometerCarbonDioxide &&
    sliderMethane === thermometerMethane
  ) {
    return increments;
  }

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
  callback,
  runawayGreenhouseEffect = false,
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
        callback();
        if (runawayGreenhouseEffect) {
          dispatch(showRunawayWarning(true));
        }
      }
    }, delay * (i + 1));
  }
  if (!terms.length) {
    callback();
  }
};
