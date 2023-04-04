import React from 'react';
import { useSelector } from 'react-redux';
import Albedo from './greenhouse-effect-settings/Albedo';
import GreenhouseEffect from './greenhouse-effect-settings/GreenhouseEffect';

const GreenhouseEffectSettings = () => {
  const { sliders, thermometer } = useSelector(({ lab }) => lab);

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

  const settingsUnchanged =
    sliderIceCover === thermometerIceCover &&
    sliderCloudCover === thermometerCloudCover &&
    sliderCarbonDioxide === thermometerCarbonDioxide &&
    sliderMethane === thermometerMethane;

  return (
    <>
      <Albedo settingsUnchanged={settingsUnchanged} />
      <GreenhouseEffect settingsUnchanged={settingsUnchanged} />
    </>
  );
};

export default GreenhouseEffectSettings;
