import { RADIATION_MODES } from '../../constants';
import { computeIncrements } from './compute-increments';
import { dispatchToThermometer } from './dispatch-terms';
import { handleIceFeedback } from './handle-ice-feedback';
import { handleWaterFeedback } from './handle-water-feedback';
import { storeBlinkingFluxes } from './helpers';

// eslint-disable-next-line import/prefer-default-export
export const handleDisequilibrium = (settings, dispatch, slidersUnchanged) => {
  const { waterFeedback, iceFeedback, radiationMode } = settings;
  storeBlinkingFluxes(dispatch);

  const isFluxesMode = radiationMode === RADIATION_MODES.FLUXES;
  const pauseAfterPlay = isFluxesMode && !waterFeedback && !iceFeedback;

  const terms = slidersUnchanged ? [] : computeIncrements(settings);

  let callback = () => {};
  if (waterFeedback) {
    callback = () => handleWaterFeedback(settings, dispatch, slidersUnchanged);
  } else if (iceFeedback) {
    callback = () => handleIceFeedback(settings, dispatch, slidersUnchanged);
  }

  dispatchToThermometer(terms, dispatch, pauseAfterPlay, callback);
};
