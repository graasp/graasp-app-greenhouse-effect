import React from 'react';
import { useSelector } from 'react-redux';
import Albedo from './greenhouse-effect-settings/Albedo';
import GreenhouseEffect from './greenhouse-effect-settings/GreenhouseEffect';

const GreenhouseEffectSettings = () => {
  const {
    sliderIceCover,
    thermometerIceCover,
    sliderCloudCover,
    thermometerCloudCover,
    sliderCarbonDioxide,
    thermometerCarbonDioxide,
    sliderMethane,
    thermometerMethane,
  } = useSelector(({ lab }) => lab);

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
