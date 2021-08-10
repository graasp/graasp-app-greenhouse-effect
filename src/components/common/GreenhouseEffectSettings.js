import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import SliderWithLabel from './SliderWithLabel';
import { setGreenhouseGasesValues, setAlbedoValues } from '../../actions';
import {
  GREENHOUSE_TOTAL_EFFECT_MAX_VALUE,
  WATER_CONCENTRATION_MAX_VALUE,
  METHANE_CONCENTRATION_MAX_VALUE,
  CARBON_DIOXIDE_CONCENTRATION_MAX_VALUE,
  ALBEDO_MAX_VALUE,
  RADIATION_MODES,
  WATER_CONCENTRATION_MIN_VALUE,
  METHANE_CONCENTRATION_MIN_VALUE,
  CARBON_DIOXIDE_CONCENTRATION_MIN_VALUE,
} from '../../config/constants';
import {
  computeAlbedo,
  computeGreenhouseEffect,
} from '../../utils/greenhouseEffect';

const useStyles = makeStyles(() => ({
  title: {
    fontWeight: 'bold',
    color: 'black',
  },
}));

const GreenhouseEffectSettings = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const classes = useStyles();
  const radiationMode = useSelector(({ lab }) => lab.radiationMode);
  const albedoValues = useSelector(({ lab }) => lab.albedo);
  const isPaused = useSelector(({ lab }) => lab.isPaused);
  const values = useSelector(({ lab }) => lab.greenhouseGasesValues);
  const { methane, carbonDioxide, water } = values;

  const onChange = (value, key) => {
    dispatch(setGreenhouseGasesValues({ [key]: value }));
  };
  const onAlbedoChange = (value, key) => {
    dispatch(setAlbedoValues({ [key]: value }));
  };
  const totalEffectValue =
    computeGreenhouseEffect({ methane, carbonDioxide }) * 100;

  const albedo = computeAlbedo(albedoValues).albedo * 100;

  // greenhouse effect settings should only affect the simulation on flux mode
  const disabled = !isPaused || radiationMode !== RADIATION_MODES.FLUXES;

  return (
    <>
      <SliderWithLabel
        text={t('Albedo (%)')}
        max={ALBEDO_MAX_VALUE}
        value={albedo.toFixed(1)}
        labelClassName={classes.title}
        valueLabelDisplay="on"
        disabled
      />
      <SliderWithLabel
        text={t('Ice Cover (%)')}
        max={100}
        value={albedoValues.iceCover}
        onChange={(e, v) => onAlbedoChange(v, 'iceCover')}
        indent
        disabled={disabled}
      />
      <SliderWithLabel
        text={t('Cloud Cover (%)')}
        max={100}
        value={albedoValues.cloudCover}
        onChange={(e, v) => onAlbedoChange(v, 'cloudCover')}
        indent
        disabled={disabled}
      />
      <SliderWithLabel
        disabled
        text={t('Greenhouse Effect (%)')}
        max={GREENHOUSE_TOTAL_EFFECT_MAX_VALUE}
        value={totalEffectValue.toFixed(1)}
        valueLabelDisplay="on"
        labelClassName={classes.title}
      />
      <SliderWithLabel
        text={t('CO_2 (ppm)', { escapeInterpolation: true })}
        max={CARBON_DIOXIDE_CONCENTRATION_MAX_VALUE}
        min={CARBON_DIOXIDE_CONCENTRATION_MIN_VALUE}
        value={carbonDioxide}
        onChange={(e, v) => onChange(v, 'carbonDioxide')}
        indent
        disabled={disabled}
      />
      <SliderWithLabel
        text={t('CH_4 (ppm)', { escapeInterpolation: true })}
        max={METHANE_CONCENTRATION_MAX_VALUE}
        min={METHANE_CONCENTRATION_MIN_VALUE}
        value={methane}
        onChange={(e, v) => onChange(v, 'methane')}
        step={0.1}
        indent
        disabled={disabled}
      />
      <SliderWithLabel
        disabled
        text={t('H_2O (ppm)', { escapeInterpolation: true })}
        max={WATER_CONCENTRATION_MAX_VALUE}
        min={WATER_CONCENTRATION_MIN_VALUE}
        value={water}
        onChange={(e, v) => onChange(v, 'water')}
        indent
        valueLabelDisplay="on"
      />
    </>
  );
};

export default GreenhouseEffectSettings;
