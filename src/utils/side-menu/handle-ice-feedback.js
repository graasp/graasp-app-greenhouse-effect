import { storeSettings, setVariable } from '../../actions';
import { EARTH_FLUXES, GROUND_TO_ATMOSPHERE, SLIDERS } from '../../constants';
import { computeIceCover, kelvinToCelsius } from '../physics';
import { computeIceCovers } from './compute-ice-covers';
import { dispatchFeedbackTerms } from './dispatch-terms';

export const handleIceFeedback = (settings, dispatch, slidersUnchanged) => {
  const { sliders, simulationMode } = settings;
  const fluxesToBlink = [...EARTH_FLUXES, GROUND_TO_ATMOSPHERE];
  dispatch(storeSettings({ fluxesToBlink }));

  const { temperature } = sliders;
  const projectedIceCover = computeIceCover(kelvinToCelsius(temperature));
  if (!slidersUnchanged) {
    dispatch(setVariable([{ iceCover: projectedIceCover }, SLIDERS]));
  }

  const { iceCovers, runawayGHE } = computeIceCovers(sliders, simulationMode);
  dispatchFeedbackTerms(iceCovers, dispatch, runawayGHE);
};
