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
  computeIceCoverFeedbackTerms,
  computeIncrements,
  computeWaterVaporFeedbackCTerms,
  graduallyDispatchTerms,
} from './feedback-effects';

export const handleWaterVaporFeedback = (
  sliders,
  targetTemperature,
  dispatch,
  simulationMode,
) => {
  const { carbonDioxide, methane, albedo } = sliders;
  const fluxesToBlink = [GROUND_TO_SKY, SKY_TO_GROUND, SKY_TO_ATMOSPHERE];
  dispatch(setPreviousSettings({ fluxesToBlink }));

  const { cTerms, runawayGreenhouseEffect } = computeWaterVaporFeedbackCTerms(
    carbonDioxide,
    methane,
    albedo.totalAlbedo,
    targetTemperature,
    simulationMode,
  );

  graduallyDispatchTerms(
    cTerms,
    dispatch,
    [SLIDERS, THERMOMETER],
    fluxesToBlink,
    () => {},
    runawayGreenhouseEffect,
    true,
  );
};

export const handleIceCoverFeedback = (
  sliders,
  targetTemperature,
  dispatch,
  simulationMode,
) => {
  const { greenhouseEffect, cloudCover } = sliders;
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
    targetTemperature,
    greenhouseEffect,
    cloudCover,
    simulationMode,
  );

  graduallyDispatchTerms(
    iceCoverTerms,
    dispatch,
    [SLIDERS, THERMOMETER],
    fluxesToBlink,
    () => {},
    runawayGreenhouseEffect,
  );
};

export const handleStandardCase = (
  sliders,
  thermometer,
  dispatch,
  callback = () => {},
) => {
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
    callback,
  );
};
