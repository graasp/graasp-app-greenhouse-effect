import { computeCTerm, kelvinToCelsius } from '../physics';
import { computeCTerms } from './compute-c-terms';
import { dispatchFeedbackTerms } from './dispatch-terms';
import { setInSlider, storeBlinkingFluxes, updateWaterVapor } from './helpers';

export const handleWaterFeedback = (settings, dispatch, slidersUnchanged) => {
  storeBlinkingFluxes(dispatch);

  const { temperature } = settings.sliders;
  const projectedCTerm = computeCTerm(kelvinToCelsius(temperature));
  if (!slidersUnchanged) {
    updateWaterVapor(dispatch, true);
    setInSlider(dispatch, { cTerm: projectedCTerm });
  }

  const { cTerms, runawayGHE } = computeCTerms(settings, slidersUnchanged);
  dispatchFeedbackTerms(cTerms, dispatch, runawayGHE, true);
};
