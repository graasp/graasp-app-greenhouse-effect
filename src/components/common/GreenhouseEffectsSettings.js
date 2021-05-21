import { Typography } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import SliderWithLabel from './SliderWithLabel';
import { setGreenhouseGasesValues } from '../../actions';

const GreenhouseEffectsSettings = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const values = useSelector(({ lab }) => lab.greenhouseGasesValues);
  const { ch4, co2, h2o } = values;

  const onChange = (value, key) => {
    dispatch(setGreenhouseGasesValues({ [key]: value }));
  };

  return (
    <>
      <Typography variant="h6">{t('Greenhouse Effects')}</Typography>
      <SliderWithLabel
        text={t('CH_4 (ppm)', { escapeInterpolation: true })}
        max={10}
        value={ch4}
        onChange={(e, v) => onChange(v, 'ch4')}
      />
      <SliderWithLabel
        text={t('H_2O (ppm)', { escapeInterpolation: true })}
        max={100}
        value={h2o}
        onChange={(e, v) => onChange(v, 'h2o')}
      />
      <SliderWithLabel
        text={t('CO_2 (ppm)', { escapeInterpolation: true })}
        max={1000}
        value={co2}
        onChange={(e, v) => onChange(v, 'co2')}
      />
      <SliderWithLabel
        text={t('Total Effect')}
        max={100}
        finalMarkText="100%"
        value={50}
      />
    </>
  );
};

export default GreenhouseEffectsSettings;
