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
import {
  computeAlbedo,
  computeCTerm,
  computeGreenhouseEffect,
  computeTemperature,
  kelvinToCelsius,
} from '../../../../utils/greenhouseEffect';
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
  const {
    temporaryCarbonDioxide,
    temporaryMethane,
    cTerm,
    simulationMode,
    temporaryIceCover,
    temporaryCloudCover,
    feedback,
  } = useSelector(({ lab }) => lab);
  const { waterVapor: waterVaporFeedbackOn } = feedback;

  const greenhouseEffect = computeGreenhouseEffect(
    temporaryCarbonDioxide,
    temporaryMethane,
    cTerm,
    simulationMode,
  );

  const { totalAlbedo } = computeAlbedo(
    temporaryIceCover,
    temporaryCloudCover,
    simulationMode,
  );

  const newTemperature = kelvinToCelsius(
    computeTemperature(greenhouseEffect, totalAlbedo, simulationMode),
  );

  const adjustedCTerm = waterVaporFeedbackOn
    ? computeCTerm(newTemperature)
    : cTerm;

  const totalEffectValue =
    computeGreenhouseEffect(
      temporaryCarbonDioxide,
      temporaryMethane,
      adjustedCTerm,
      simulationMode,
    ) * 100;

  return (
    <>
      <SliderWithLabel
        disabled
        text={t('Greenhouse Effect (%)')}
        max={GREENHOUSE_TOTAL_EFFECT_MAX_VALUE}
        value={+totalEffectValue.toFixed(1)}
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
