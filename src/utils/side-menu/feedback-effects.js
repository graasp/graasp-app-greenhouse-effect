import {
  resetFluxesFills,
  setAnimationPlaying,
  setIsPaused,
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
  FIRST_EPSILON,
  DEFAULT_EPSILON,
  ICE_COVER,
  CLOUD_COVER,
  CARBON_DIOXIDE,
  METHANE,
} from '../../constants';
import {
  computeOutputs,
  computeCTerm,
  computeIceCover,
  kelvinToCelsius,
} from '../physics';

export const computeCTerms = (sliders, simulationMode, settingsUnchanged) => {
  const { temperature: currentTemp } = sliders;
  const initialCTerm = settingsUnchanged
    ? sliders.cTerm
    : computeCTerm(kelvinToCelsius(currentTemp));
  const cTerms = [{ cTerm: initialCTerm }];

  let previousTemperature;
  let newTemperature;
  let runawayGHE = false;
  let epsilon = FIRST_EPSILON;

  do {
    previousTemperature = newTemperature || kelvinToCelsius(currentTemp);
    const newCTerm = computeCTerm(previousTemperature);
    const { temperature, greenhouseEffect } = computeOutputs(
      { ...sliders, cTerm: newCTerm },
      simulationMode,
    );
    newTemperature = kelvinToCelsius(temperature);
    cTerms.push({ cTerm: newCTerm });
    epsilon = DEFAULT_EPSILON;

    if (greenhouseEffect >= MAX_GHE || greenhouseEffect <= MIN_GHE) {
      break;
    }

    if (newTemperature > MAX_TEMPERATURE_DISPLAYED_ON_EARTH_CELSIUS) {
      runawayGHE = true;
      break;
    }
  } while (Math.abs(newTemperature - previousTemperature) > epsilon);

  return { cTerms, runawayGHE };
};

export const computeIceCovers = (sliders, simulationMode) => {
  const iceCovers = [{ iceCover: sliders.iceCover }];
  const { temperature: currentTemperature } = computeOutputs(
    sliders,
    simulationMode,
  );
  let previousTemperature;
  let newTemperature;
  let runawayGHE = false;
  let epsilon = FIRST_EPSILON;

  do {
    previousTemperature = newTemperature || kelvinToCelsius(currentTemperature);
    const newIceCover = computeIceCover(previousTemperature);
    const { temperature } = computeOutputs(
      { ...sliders, iceCover: newIceCover },
      simulationMode,
    );
    newTemperature = kelvinToCelsius(temperature);

    if (newIceCover >= MAX_ICE_COVER) {
      iceCovers.push({ iceCover: MAX_ICE_COVER });
      break;
    }

    if (newIceCover <= MIN_ICE_COVER) {
      iceCovers.push({ iceCover: MIN_ICE_COVER });
      break;
    }

    iceCovers.push({ iceCover: newIceCover });
    epsilon = DEFAULT_EPSILON;

    if (newTemperature > MAX_TEMPERATURE_DISPLAYED_ON_EARTH_CELSIUS) {
      runawayGHE = true;
      break;
    }
  } while (Math.abs(newTemperature - previousTemperature) > epsilon);

  return { iceCovers, runawayGHE };
};

export const computeIncrements = (
  targetValues,
  originalValues,
  numIncrements = GRADUAL_UPDATE_NUM_INCREMENTS,
) => {
  const afterIncrement = (key, i) =>
    i === numIncrements
      ? targetValues[key]
      : originalValues[key] +
        ((targetValues[key] - originalValues[key]) / numIncrements) * i;

  const increments = [];
  for (let i = 1; i <= numIncrements; i += 1) {
    increments.push({
      iceCover: afterIncrement(ICE_COVER, i),
      cloudCover: afterIncrement(CLOUD_COVER, i),
      carbonDioxide: afterIncrement(CARBON_DIOXIDE, i),
      methane: afterIncrement(METHANE, i),
    });
  }

  return increments;
};

export const graduallyDispatch = (
  terms,
  dispatch,
  sections,
  fluxesToBlink,
  callback,
  pauseAfterPlaying = false,
  runawayGHE = false,
  updateWaterVapor = false,
) => {
  dispatch(setAnimationPlaying(true));
  for (let i = 0; i < terms.length; i += 1) {
    setTimeout(() => {
      dispatch(toggleFluxesFills(fluxesToBlink));
      sections.forEach((section) =>
        dispatch(setVariable([terms[i], section, updateWaterVapor])),
      );
      if (i === terms.length - 1) {
        dispatch(resetFluxesFills());
        dispatch(setAnimationPlaying(false));
        callback();
        if (runawayGHE) {
          dispatch(showRunawayWarning(true));
        }
        if (pauseAfterPlaying) {
          dispatch(setIsPaused(true));
        }
      }
    }, GRADUAL_UPDATE_INTERVAL * (i + 1));
  }
  if (!terms.length) {
    callback();
  }
};
