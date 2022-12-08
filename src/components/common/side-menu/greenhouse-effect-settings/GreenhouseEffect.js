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
    finalCarbonDioxide,
    finalMethane,
    cTerm,
    simulationMode,
    temporaryIceCover,
    temporaryCloudCover,
    finalIceCover,
    finalCloudCover,
    feedback,
  } = useSelector(({ lab }) => lab);
  const { waterVaporFeedbackOn } = feedback;

  let adjustedCTerm = cTerm;

  // to handle case where water vapor feedback is toggled on and we want to compute GHE based on cTerm as a function of (new) displayed temperature
  // to check if there is a new displayed temperature, check that all slider values are equal to the final values
  // if not all are equal, it means displayed temperature has not been updated
  if (
    waterVaporFeedbackOn &&
    finalCarbonDioxide === temporaryCarbonDioxide &&
    finalMethane === temporaryMethane &&
    finalIceCover === temporaryIceCover &&
    finalCloudCover === temporaryCloudCover
  ) {
    const newGreenhouseEffect = computeGreenhouseEffect(
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

    const newTemperature = computeTemperature(
      newGreenhouseEffect,
      totalAlbedo,
      simulationMode,
    );

    adjustedCTerm = computeCTerm(kelvinToCelsius(newTemperature));
  }

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
