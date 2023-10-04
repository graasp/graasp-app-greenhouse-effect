import { storeSettings, setVariable } from '../../actions';
import {
  EARTH_FLUXES,
  GROUND_TO_ATMOSPHERE,
  SLIDERS,
  THERMOMETER,
} from '../../constants';
import {
  computeIceCovers,
  computeIncrements,
  computeCTerms,
  graduallyDispatch,
} from './feedback-effects';

const handleWaterFeedback = (
  sliders,
  dispatch,
  simulationMode,
  settingsUnchanged,
) => {
  dispatch(storeSettings({ fluxesToBlink: EARTH_FLUXES }));
  if (!settingsUnchanged) {
    dispatch(setVariable([{}, SLIDERS, true]));
  }

  const { cTerms, runawayGHE } = computeCTerms(
    sliders,
    simulationMode,
    settingsUnchanged,
  );

  graduallyDispatch(
    cTerms,
    dispatch,
    [SLIDERS, THERMOMETER],
    EARTH_FLUXES,
    () => {},
    runawayGHE,
    true,
  );
};

const handleIceFeedback = (sliders, dispatch, simulationMode) => {
  const fluxesToBlink = [...EARTH_FLUXES, GROUND_TO_ATMOSPHERE];
  dispatch(storeSettings({ fluxesToBlink }));
  const { iceCovers, runawayGHE } = computeIceCovers(sliders, simulationMode);

  graduallyDispatch(
    iceCovers,
    dispatch,
    [SLIDERS, THERMOMETER],
    fluxesToBlink,
    () => {},
    runawayGHE,
  );
};

// eslint-disable-next-line import/prefer-default-export
export const handleDisequilibrium = (settings, dispatch, settingsUnchanged) => {
  const {
    sliders,
    thermometer,
    simulationMode,
    waterFeedback,
    iceFeedback,
  } = settings;
  let callback = () => {};

  dispatch(storeSettings({ fluxesToBlink: EARTH_FLUXES }));

  const terms = settingsUnchanged
    ? []
    : computeIncrements(sliders, thermometer);

  if (waterFeedback) {
    callback = () => {
      handleWaterFeedback(sliders, dispatch, simulationMode, settingsUnchanged);
    };
  } else if (iceFeedback) {
    callback = () => {
      handleIceFeedback(sliders, dispatch, simulationMode);
    };
  }

  graduallyDispatch(terms, dispatch, [THERMOMETER], EARTH_FLUXES, callback);
};
