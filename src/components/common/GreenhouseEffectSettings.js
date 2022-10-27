import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import SliderWithLabel from './SliderWithLabel';
import {
  setIceCover,
  setCloudCover,
  setCarbonDioxide,
  setMethane,
  setWaterVapor,
} from '../../actions';
import {
  GREENHOUSE_TOTAL_EFFECT_MAX_VALUE,
  WATER_CONCENTRATION_MAX_VALUE,
  METHANE_CONCENTRATION_MAX_VALUE,
  CARBON_DIOXIDE_CONCENTRATION_MAX_VALUE_DEFAULT,
  ALBEDO_MAX_VALUE,
  RADIATION_MODES,
  WATER_CONCENTRATION_MIN_VALUE_DEFAULT,
  METHANE_CONCENTRATION_MIN_VALUE,
  CARBON_DIOXIDE_CONCENTRATION_MIN_VALUE,
  ICE_COVER_MAX_VALUE,
  CLOUD_COVER_MAX_VALUE,
  SIMULATION_MODES,
  CARBON_DIOXIDE_CONCENTRATION_MAX_VALUE_ON_MARS_OR_VENUS,
  WATER_CONCENTRATION_MIN_VALUE_ON_MARS_OR_VENUS,
  ON_STRING,
  AUTO_STRING,
  CLOUD_COVER_MIN_VALUE,
  METHANE_SLIDER_STEP,
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

const GreenhouseEffectSettings = ({
  componentCarbonDioxide,
  setComponentCarbonDioxide,
  componentMethane,
  setComponentMethane,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const classes = useStyles();
  const {
    radiationMode,
    isPaused,
    carbonDioxide,
    methane,
    cTerm,
    waterVapor,
    iceCover,
    cloudCover,
    simulationMode,
    fluxesBlinking,
  } = useSelector(({ lab }) => lab);

  const totalEffectValue =
    computeGreenhouseEffect(carbonDioxide, methane, cTerm, simulationMode) *
    100;

  const { totalAlbedo } = computeAlbedo(iceCover, cloudCover, simulationMode);

  const isMarsOrVenus =
    simulationMode === SIMULATION_MODES.MARS.name ||
    simulationMode === SIMULATION_MODES.VENUS.name;

  // greenhouse effect settings should only affect the simulation on flux mode
  const disabled =
    !isPaused || radiationMode !== RADIATION_MODES.FLUXES || isMarsOrVenus;

  // adjust CO2 and H2O concentration sliders max/min points if planet other than earth is selected
  const CARBON_DIOXIDE_CONCENTRATION_MAX_VALUE = isMarsOrVenus
    ? CARBON_DIOXIDE_CONCENTRATION_MAX_VALUE_ON_MARS_OR_VENUS
    : CARBON_DIOXIDE_CONCENTRATION_MAX_VALUE_DEFAULT;

  const WATER_CONCENTRATION_MIN_VALUE = isMarsOrVenus
    ? WATER_CONCENTRATION_MIN_VALUE_ON_MARS_OR_VENUS
    : WATER_CONCENTRATION_MIN_VALUE_DEFAULT;

  // transform the label on the CO2 slider when either Mars or Venus are selected
  // by default '965000' would be shown; this adds a comma separator so that it's 965,000
  const formatCarbonDioxideLabel = (num) => {
    const numString = num.toString();
    if (isMarsOrVenus) {
      return `${numString.slice(0, 3)},${numString.slice(3)}`;
    }
    return num;
  };

  return (
    <>
      <SliderWithLabel
        text={t('Albedo (%)')}
        max={ALBEDO_MAX_VALUE}
        value={parseFloat((totalAlbedo * 100).toFixed(1))}
        labelClassName={classes.title}
        valueLabelDisplay={ON_STRING}
        disabled
      />
      <SliderWithLabel
        text={t('Ice and Snow Cover (%)')}
        max={ICE_COVER_MAX_VALUE}
        value={iceCover}
        onChange={(e, v) => dispatch(setIceCover(v))}
        indent
        disabled={disabled}
      />
      <SliderWithLabel
        text={t('Cloud Cover (%)')}
        min={CLOUD_COVER_MIN_VALUE}
        max={CLOUD_COVER_MAX_VALUE}
        value={cloudCover}
        onChange={(e, v) => dispatch(setCloudCover(v))}
        indent
        disabled={disabled}
      />
      <SliderWithLabel
        disabled
        text={t('Greenhouse Effect (%)')}
        max={GREENHOUSE_TOTAL_EFFECT_MAX_VALUE}
        value={+totalEffectValue.toFixed(1)}
        valueLabelDisplay={ON_STRING}
        labelClassName={classes.title}
      />
      <SliderWithLabel
        text={t('CO_2 (ppm)', { escapeInterpolation: true })}
        max={CARBON_DIOXIDE_CONCENTRATION_MAX_VALUE}
        min={CARBON_DIOXIDE_CONCENTRATION_MIN_VALUE}
        value={componentCarbonDioxide}
        onChange={(e, v) => {
          setComponentCarbonDioxide(v);
          if (!fluxesBlinking) {
            dispatch(setCarbonDioxide(v));
          }
        }}
        indent
        disabled={disabled}
        valueLabelDisplay={isMarsOrVenus ? ON_STRING : AUTO_STRING}
        bigLabel={isMarsOrVenus}
        valueLabelFormat={formatCarbonDioxideLabel}
      />
      <SliderWithLabel
        text={t('CH_4 (ppm)', { escapeInterpolation: true })}
        max={METHANE_CONCENTRATION_MAX_VALUE}
        min={METHANE_CONCENTRATION_MIN_VALUE}
        value={componentMethane}
        onChange={(e, v) => {
          setComponentMethane(v);
          if (!fluxesBlinking) {
            dispatch(setMethane(v));
          }
        }}
        step={METHANE_SLIDER_STEP}
        indent
        disabled={disabled}
        valueLabelDisplay={isMarsOrVenus ? ON_STRING : AUTO_STRING}
      />
      <SliderWithLabel
        disabled
        text={t('H_2O (ppm)', { escapeInterpolation: true })}
        max={WATER_CONCENTRATION_MAX_VALUE}
        min={WATER_CONCENTRATION_MIN_VALUE}
        value={waterVapor}
        onChange={(e, v) => dispatch(setWaterVapor(v))}
        indent
        valueLabelDisplay={ON_STRING}
      />
    </>
  );
};

GreenhouseEffectSettings.propTypes = {
  componentCarbonDioxide: PropTypes.number.isRequired,
  setComponentCarbonDioxide: PropTypes.func.isRequired,
  componentMethane: PropTypes.number.isRequired,
  setComponentMethane: PropTypes.func.isRequired,
};

export default GreenhouseEffectSettings;
