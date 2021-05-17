import { Typography } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import SliderWithLabel from './SliderWithLabel';
import { setGreenhouseGasesValues } from '../../actions';
import {
  GREENHOUSE_TOTAL_EFFECT_MAX_VALUE,
  WATER_CONCENTRATION_MAX_VALUE,
  METHANE_CONCENTRATION_MAX_VALUE,
  CARBON_DIOXIDE_CONCENTRATION_MAX_VALUE,
} from '../../config/constants';

const GreenhouseEffectSettings = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const values = useSelector(({ lab }) => lab.greenhouseGasesValues);
  const { methane, carbonDioxide, water } = values;

  const onChange = (value, key) => {
    dispatch(setGreenhouseGasesValues({ [key]: value }));
  };

  return (
    <>
      <Typography variant="h6">{t('Greenhouse Effect')}</Typography>
      <SliderWithLabel
        text={t('CO_2 (ppm)', { escapeInterpolation: true })}
        max={CARBON_DIOXIDE_CONCENTRATION_MAX_VALUE}
        value={carbonDioxide}
        onChange={(e, v) => onChange(v, 'carbonDioxide')}
      />
      <SliderWithLabel
        text={t('CH_4 (ppm)', { escapeInterpolation: true })}
        max={METHANE_CONCENTRATION_MAX_VALUE}
        value={methane}
        onChange={(e, v) => onChange(v, 'methane')}
      />
      <SliderWithLabel
        disabled
        text={t('H_2O (ppm)', { escapeInterpolation: true })}
        max={WATER_CONCENTRATION_MAX_VALUE}
        value={water}
        onChange={(e, v) => onChange(v, 'water')}
      />
      <SliderWithLabel
        disabled
        text={t('= Total Effect (%)')}
        max={GREENHOUSE_TOTAL_EFFECT_MAX_VALUE}
        value={50}
      />
    </>
  );
};

export default GreenhouseEffectSettings;
