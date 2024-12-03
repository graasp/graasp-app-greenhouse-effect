import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import SliderWithLabel from '../shared-components/SliderWithLabel';
import {
  MAX_WATER,
  MIN_WATER_DEFAULT,
  SIMULATION_MODES,
  MIN_WATER_MARS_VENUS,
  ON_STRING,
} from '../../../../constants';
import { roundToNearestHundred } from '../../../../utils';

const WaterVapor = () => {
  const { t } = useTranslation();
  const { simulationMode, sliders } = useSelector(({ lab }) => lab);
  const { waterVapor } = sliders;

  const isMarsOrVenus =
    simulationMode === SIMULATION_MODES.MARS.name ||
    simulationMode === SIMULATION_MODES.VENUS.name;

  const MIN_WATER = isMarsOrVenus ? MIN_WATER_MARS_VENUS : MIN_WATER_DEFAULT;

  return (
    <SliderWithLabel
      disabled
      text={t('H_2O (ppm)', { escapeInterpolation: true })}
      max={MAX_WATER}
      min={MIN_WATER}
      value={roundToNearestHundred(waterVapor)}
      valueLabelDisplay={ON_STRING}
    />
  );
};

export default WaterVapor;
