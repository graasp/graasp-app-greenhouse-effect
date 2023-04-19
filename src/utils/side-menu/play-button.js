import { setPreviousSettings } from '../../actions';
import {
  GROUND_TO_ATMOSPHERE,
  GROUND_TO_SKY,
  SKY_TO_ATMOSPHERE,
  SKY_TO_GROUND,
  SLIDERS,
  THERMOMETER,
} from '../../constants';
import {
  computeBothFeedbackTerms,
  computeIceCoverFeedbackTerms,
  computeIncrements,
  computeWaterVaporFeedbackCTerms,
  graduallyDispatchTerms,
} from './feedback-effects';

export const handleBothFeedbacks = (
  sliders,
  thermometer,
  dispatch,
  simulationMode,
) => {
  const { temperature } = thermometer;
  const { carbonDioxide, methane, cloudCover } = sliders;
  const fluxesToBlink = [
    GROUND_TO_SKY,
    SKY_TO_GROUND,
    SKY_TO_ATMOSPHERE,
    GROUND_TO_ATMOSPHERE,
  ];
  dispatch(setPreviousSettings({ fluxesToBlink }));

  const { feedbackTerms, runawayGreenhouseEffect } = computeBothFeedbackTerms(
    temperature,
    carbonDioxide,
    methane,
    cloudCover,
    simulationMode,
  );

  return graduallyDispatchTerms(
    feedbackTerms,
    dispatch,
    [SLIDERS, THERMOMETER],
    fluxesToBlink,
    runawayGreenhouseEffect,
  );
};

export const handleWaterVaporFeedback = (
  sliders,
  thermometer,
  dispatch,
  simulationMode,
) => {
  const { temperature } = thermometer;
  const { carbonDioxide, methane, albedo } = sliders;
  const fluxesToBlink = [GROUND_TO_SKY, SKY_TO_GROUND, SKY_TO_ATMOSPHERE];
  dispatch(setPreviousSettings({ fluxesToBlink }));

  const { cTerms, runawayGreenhouseEffect } = computeWaterVaporFeedbackCTerms(
    carbonDioxide,
    methane,
    albedo.totalAlbedo,
    temperature,
    simulationMode,
  );

  graduallyDispatchTerms(
    cTerms,
    dispatch,
    [SLIDERS, THERMOMETER],
    fluxesToBlink,
    runawayGreenhouseEffect,
    true,
  );
};

export const handleIceCoverFeedback = (sliders, dispatch, simulationMode) => {
  const { temperature, greenhouseEffect, cloudCover } = sliders;
  const fluxesToBlink = [
    GROUND_TO_SKY,
    SKY_TO_GROUND,
    SKY_TO_ATMOSPHERE,
    GROUND_TO_ATMOSPHERE,
  ];
  dispatch(setPreviousSettings({ fluxesToBlink }));

  const {
    iceCoverTerms,
    runawayGreenhouseEffect,
  } = computeIceCoverFeedbackTerms(
    temperature,
    greenhouseEffect,
    cloudCover,
    simulationMode,
  );

  graduallyDispatchTerms(
    iceCoverTerms,
    dispatch,
    [SLIDERS, THERMOMETER],
    fluxesToBlink,
    runawayGreenhouseEffect,
  );
};

export const handleStandardCase = (sliders, thermometer, dispatch) => {
  const {
    iceCover: sliderIceCover,
    cloudCover: sliderCloudCover,
    methane: sliderMethane,
    carbonDioxide: sliderCarbonDioxide,
  } = sliders;
  const {
    iceCover: thermometerIceCover,
    cloudCover: thermometerCloudCover,
    methane: thermometerMethane,
    carbonDioxide: thermometerCarbonDioxide,
  } = thermometer;

  const fluxesToBlink = [GROUND_TO_SKY, SKY_TO_GROUND, SKY_TO_ATMOSPHERE];
  dispatch(setPreviousSettings({ fluxesToBlink }));

  const valuesToDispatch = computeIncrements(
    {
      sliderIceCover,
      sliderCloudCover,
      sliderMethane,
      sliderCarbonDioxide,
    },
    {
      thermometerIceCover,
      thermometerCloudCover,
      thermometerMethane,
      thermometerCarbonDioxide,
    },
  );

  graduallyDispatchTerms(
    valuesToDispatch,
    dispatch,
    [THERMOMETER],
    fluxesToBlink,
  );
};
