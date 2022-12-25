import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import SliderWithLabel from '../shared-components/SliderWithLabel';
import {
  GREENHOUSE_TOTAL_EFFECT_MAX_VALUE,
  ON_STRING,
} from '../../../../config/constants';
import CarbonDioxideSlider from './CarbonDioxideSlider';
import MethaneSlider from './MethaneSlider';
import WaterVapor from './WaterVapor';

const useStyles = makeStyles(() => ({
  title: {
    fontWeight: 'bold',
    color: 'black',
  },
}));

const GreenhouseEffect = ({ disabled }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { impliedGreenhouseEffect } = useSelector(({ lab }) => lab);

  return (
    <>
      <SliderWithLabel
        disabled
        text={t('Greenhouse Effect (%)')}
        max={GREENHOUSE_TOTAL_EFFECT_MAX_VALUE}
        value={+(impliedGreenhouseEffect * 100).toFixed(1)}
        valueLabelDisplay={ON_STRING}
        labelClassName={classes.title}
      />
      <CarbonDioxideSlider disabled={disabled} />
      <MethaneSlider disabled={disabled} />
      <WaterVapor />
    </>
  );
};

GreenhouseEffect.propTypes = {
  disabled: PropTypes.bool.isRequired,
};

export default GreenhouseEffect;
