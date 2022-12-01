import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import SliderWithLabel from '../shared-components/SliderWithLabel';
import {
  WATER_CONCENTRATION_MAX_VALUE,
  WATER_CONCENTRATION_MIN_VALUE_DEFAULT,
  SIMULATION_MODES,
  WATER_CONCENTRATION_MIN_VALUE_ON_MARS_OR_VENUS,
  ON_STRING,
} from '../../../../config/constants';
import {
  computeAlbedo,
  computeGreenhouseEffect,
  computeTemperature,
  computeWaterVapor,
  kelvinToCelsius,
} from '../../../../utils/greenhouseEffect';

const WaterVapor = () => {
  const { t } = useTranslation();
  const {
    simulationMode,
    finalIceCover,
    finalCloudCover,
    finalCarbonDioxide,
    finalMethane,
    cTerm,
    waterVapor,
    feedback,
  } = useSelector(({ lab }) => lab);
  const { waterVapor: waterVaporFeedbackOn } = feedback;

  const isMarsOrVenus =
    simulationMode === SIMULATION_MODES.MARS.name ||
    simulationMode === SIMULATION_MODES.VENUS.name;

  const WATER_CONCENTRATION_MIN_VALUE = isMarsOrVenus
    ? WATER_CONCENTRATION_MIN_VALUE_ON_MARS_OR_VENUS
    : WATER_CONCENTRATION_MIN_VALUE_DEFAULT;

  const greenhouseEffect = computeGreenhouseEffect(
    finalCarbonDioxide,
    finalMethane,
    cTerm,
    simulationMode,
  );
  const { totalAlbedo } = computeAlbedo(
    finalIceCover,
    finalCloudCover,
    simulationMode,
  );

  const temperature = computeTemperature(
    greenhouseEffect,
    totalAlbedo,
    simulationMode,
  );

  return (
    <SliderWithLabel
      disabled
      text={t('H_2O (ppm)', { escapeInterpolation: true })}
      max={WATER_CONCENTRATION_MAX_VALUE}
      min={WATER_CONCENTRATION_MIN_VALUE}
      value={
        waterVaporFeedbackOn
          ? Math.round(computeWaterVapor(kelvinToCelsius(temperature)))
          : waterVapor
      }
      valueLabelDisplay={ON_STRING}
    />
  );
};

export default WaterVapor;
