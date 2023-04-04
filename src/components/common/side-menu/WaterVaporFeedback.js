import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import SwitchWithLabel from './shared-components/SwitchWithLabel';
import {
  setFeedbackValues,
  setIsPaused,
  resetFluxesFills,
  setValuesTemporarily,
} from '../../../actions';
import {
  keepFluxesBlinking,
  stopFluxesBlinking,
  computeCTerm,
  computeGreenhouseEffect,
  computeTemperature,
  kelvinToCelsius,
} from '../../../utils';
import {
  FEEDBACK_EFFECTS_DEFAULT_EPSILON,
  GROUND_TO_SKY,
  SKY_TO_ATMOSPHERE,
  SKY_TO_GROUND,
} from '../../../constants';

const WaterVaporFeedback = ({ disabled }) => {
  const { t } = useTranslation();
  const { feedback, simulationMode, sliders, thermometer } = useSelector(
    ({ lab }) => lab,
  );
  const { waterVaporFeedbackOn } = feedback;
  const dispatch = useDispatch();

  const {
    iceCover: sliderIceCover,
    cloudCover: sliderCloudCover,
    methane: sliderMethane,
    carbonDioxide: sliderCarbonDioxide,
    cTerm: initialCTerm,
  } = sliders;

  const {
    iceCover: thermometerIceCover,
    cloudCover: thermometerCloudCover,
    methane: thermometerMethane,
    carbonDioxide: thermometerCarbonDioxide,
    temperature: thermometerTemperature,
    albedo: thermometerAlbedo,
  } = thermometer;

  // under water vapor feedback, the 'c' term in the equation determining greenhouse effect becomes a function of temperature
  // first, we compute the c term as a function of current temperature
  const projectedCTerm = computeCTerm(kelvinToCelsius(thermometerTemperature));
  // then we compute greenhouse effect and temperature based on this new c term
  const projectedGreenhouseEffect = computeGreenhouseEffect(
    thermometerCarbonDioxide,
    thermometerMethane,
    projectedCTerm,
    simulationMode,
  );
  const projectedTemperature = computeTemperature(
    projectedGreenhouseEffect,
    thermometerAlbedo.totalAlbedo,
    simulationMode,
  );
  // if there is a difference (> epsilon) between the current and projected temperatures, it means we should expect a feedback effect
  // we use this fact to (1) blink the relevant fluxes, indicating to the user which fluxes they should make predictions on,
  // (2) to update the reflected infrared fluxes and the level of water vapor
  const significantTemperatureChangeProjected =
    Math.abs(projectedTemperature - thermometerTemperature) >
    FEEDBACK_EFFECTS_DEFAULT_EPSILON;

  const onToggle = (checked) => {
    dispatch(setFeedbackValues({ waterVaporFeedbackOn: checked }));
    if (checked) {
      dispatch(setIsPaused(true));
      if (significantTemperatureChangeProjected) {
        keepFluxesBlinking(
          [GROUND_TO_SKY, SKY_TO_GROUND, SKY_TO_ATMOSPHERE],
          dispatch,
        );
        dispatch(setValuesTemporarily({ cTerm: projectedCTerm, checked }));
      }
    } else {
      if (significantTemperatureChangeProjected) {
        dispatch(setValuesTemporarily({ cTerm: initialCTerm, checked }));
      }
      // if all slider values are equal to corresponding thermometer values, it means we are at equilibrium, so no fluxes should blink
      // on the other hand, if e.g. sliderCO2 !== thermometerCO2, it means the user has changed CO2 without clicking play
      // so when they toggle water vapor feedback off, the fluxes *should* continue blinking
      if (
        sliderCarbonDioxide === thermometerCarbonDioxide &&
        sliderMethane === thermometerMethane &&
        sliderIceCover === thermometerIceCover &&
        sliderCloudCover === thermometerCloudCover
      ) {
        stopFluxesBlinking();
        dispatch(resetFluxesFills());
      }
    }
  };

  return (
    <SwitchWithLabel
      switchLabel={t('Water Vapor')}
      isChecked={waterVaporFeedbackOn}
      onToggle={onToggle}
      disabled={disabled}
    />
  );
};

WaterVaporFeedback.propTypes = {
  disabled: PropTypes.bool.isRequired,
};

export default WaterVaporFeedback;
