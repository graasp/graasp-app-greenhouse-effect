import { showRunawayWarning } from '../../actions';
import { GRADUAL_UPDATE_INTERVAL } from '../../constants';
import {
  blinkEarthFluxes,
  pauseAnimation,
  setInSlider,
  setInThermometer,
  toggleAnimationPlaying,
  updateWaterVapor,
} from './helpers';

const dispatchToThermometer = (terms, dispatch, pauseAfterPlay, callback) => {
  toggleAnimationPlaying(dispatch, true);

  if (!terms.length) callback();

  for (let i = 0; i < terms.length; i += 1) {
    setTimeout(() => {
      blinkEarthFluxes(dispatch);
      setInThermometer(dispatch, terms[i]);
      if (i === terms.length - 1) {
        toggleAnimationPlaying(dispatch, false);
        if (pauseAfterPlay) pauseAnimation(dispatch);
        callback();
      }
    }, GRADUAL_UPDATE_INTERVAL * (i + 1));
  }
};

const dispatchFeedbackTerms = (terms, dispatch, runawayGHE, waterFeedback) => {
  toggleAnimationPlaying(dispatch, true);

  for (let i = 0; i < terms.length; i += 1) {
    setTimeout(() => {
      blinkEarthFluxes(dispatch);
      if (i !== terms.length - 1) {
        setInThermometer(dispatch, terms[i], waterFeedback);
        updateWaterVapor(dispatch, waterFeedback);
        setInSlider(dispatch, terms[i + 1]);
      }
      if (i === terms.length - 1) {
        setInThermometer(dispatch, terms[i]);
        toggleAnimationPlaying(dispatch, false);
        pauseAnimation(dispatch);
        if (runawayGHE) dispatch(showRunawayWarning(true));
      }
    }, GRADUAL_UPDATE_INTERVAL * (i + 1));
  }
};

export { dispatchToThermometer, dispatchFeedbackTerms };
