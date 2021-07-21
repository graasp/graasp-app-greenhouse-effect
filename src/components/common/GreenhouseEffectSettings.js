import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import SliderWithLabel from './SliderWithLabel';
import { setGreenhouseGasesValues, setAlbedo } from '../../actions';
import {
  GREENHOUSE_TOTAL_EFFECT_MAX_VALUE,
  WATER_CONCENTRATION_MAX_VALUE,
  METHANE_CONCENTRATION_MAX_VALUE,
  CARBON_DIOXIDE_CONCENTRATION_MAX_VALUE,
  ALBEDO_MAX_VALUE,
} from '../../config/constants';
import { computeGreenhouseEffect } from '../../utils/greenhouseEffect';

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
  const albedo = useSelector(({ lab }) => lab.albedo);
  const isPaused = useSelector(({ lab }) => lab.isPaused);
  const values = useSelector(({ lab }) => lab.greenhouseGasesValues);
  const { methane, carbonDioxide, water } = values;

  const onChange = (value, key) => {
    dispatch(setGreenhouseGasesValues({ [key]: value }));
  };

  const onAlbedoChange = (e, v) => {
    dispatch(setAlbedo(v));
  };
  const totalEffectValue =
    computeGreenhouseEffect({ methane, carbonDioxide }) * 100;

  const disabled = !isPaused;

  return (
    <>
      <SliderWithLabel
        text={t('Albedo (%)')}
        max={ALBEDO_MAX_VALUE}
        value={albedo}
        onChange={onAlbedoChange}
        labelClassName={classes.title}
        disabled={disabled}
      />
      <SliderWithLabel
        disabled
        text={t('Greenhouse Effect (%)')}
        max={GREENHOUSE_TOTAL_EFFECT_MAX_VALUE}
        value={totalEffectValue.toFixed(1)}
        valueLabelDisplay="on"
        labelClassname={classes.title}
      />
      <SliderWithLabel
        text={t('CO_2 (ppm)', { escapeInterpolation: true })}
        max={CARBON_DIOXIDE_CONCENTRATION_MAX_VALUE}
        value={carbonDioxide}
        onChange={(e, v) => onChange(v, 'carbonDioxide')}
        indent
        disabled={disabled}
      />
      <SliderWithLabel
        text={t('CH_4 (ppm)', { escapeInterpolation: true })}
        max={METHANE_CONCENTRATION_MAX_VALUE}
        value={methane}
        onChange={(e, v) => onChange(v, 'methane')}
        indent
        disabled={disabled}
      />
      <SliderWithLabel
        disabled
        text={t('H_2O (ppm)', { escapeInterpolation: true })}
        max={WATER_CONCENTRATION_MAX_VALUE}
        value={water}
        onChange={(e, v) => onChange(v, 'water')}
        indent
      />
    </>
  );
};

export default GreenhouseEffectSettings;
