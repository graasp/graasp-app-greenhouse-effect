import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetFluxesFills,
  setFeedbackValues,
  setIsPaused,
  setValuesTemporarilyViaIceCover,
} from '../../../actions';
import SwitchWithLabel from './shared-components/SwitchWithLabel';
import { keepFluxesBlinking, stopFluxesBlinking } from '../../../utils/canvas';
import {
  FEEDBACK_EFFECTS_DEFAULT_EPSILON,
  GROUND_TO_ATMOSPHERE,
  GROUND_TO_SKY,
  SKY_TO_ATMOSPHERE,
  SKY_TO_GROUND,
} from '../../../config/constants';
import {
  computeAlbedo,
  computeIceCover,
  computeTemperature,
  kelvinToCelsius,
} from '../../../utils/greenhouseEffect';

const IceCoverFeedback = ({ disabled }) => {
  const { t } = useTranslation();
  const {
    feedback,
    thermometerTemperature,
    sliderCarbonDioxide,
    thermometerCarbonDioxide,
    sliderMethane,
    thermometerMethane,
    sliderCloudCover,
    thermometerCloudCover,
    sliderIceCover,
    thermometerIceCover,
    thermometerGreenhouseEffect,
    simulationMode,
    thermometerIceCover: initialIceCover,
    impliedTemperature,
  } = useSelector(({ lab }) => lab);
  const { iceCoverFeedbackOn } = feedback;
  const dispatch = useDispatch();

  // under ice cover vapor feedback, ice cover becomes a function of temperature
  // first, we compute ice cover term as a function of current temperature
  const projectedIceCover = computeIceCover(
    kelvinToCelsius(thermometerTemperature),
  );
  // then we compute albedo and temperature based on this new ice cover
  const { totalAlbedo: projectedTotalAlbedo } = computeAlbedo(
    projectedIceCover,
    thermometerCloudCover,
    simulationMode,
  );
  const projectedTemperature = computeTemperature(
    thermometerGreenhouseEffect,
    projectedTotalAlbedo,
    simulationMode,
  );
  // if there is a difference (> epsilon) between the current and projected temperatures, it means we should expect a feedback effect
  // we use this fact to (1) blink the relevant fluxes, indicating to the user which fluxes they should make predictions on,
  // (2) to update the values on a number of fluxes, and the ice cover slider
  const significantTemperatureChangeProjected =
    Math.abs(projectedTemperature - thermometerTemperature) >
    FEEDBACK_EFFECTS_DEFAULT_EPSILON;

  const onToggle = (checked) => {
    dispatch(setFeedbackValues({ iceCoverFeedbackOn: checked }));
    if (checked) {
      dispatch(setIsPaused(true));
      if (
        significantTemperatureChangeProjected ||
        // even if !significantTemperatureChangeProjected, if we are out of equilibrium, we need to blink GROUND_TO_ATMOSPHERE flux
        sliderCarbonDioxide !== thermometerCarbonDioxide ||
        sliderMethane !== thermometerMethane ||
        sliderCloudCover !== thermometerCloudCover ||
        sliderIceCover !== thermometerIceCover
      ) {
        stopFluxesBlinking();
        dispatch(resetFluxesFills());
        keepFluxesBlinking(
          [
            GROUND_TO_SKY,
            SKY_TO_GROUND,
            SKY_TO_ATMOSPHERE,
            GROUND_TO_ATMOSPHERE,
          ],
          dispatch,
        );
        if (significantTemperatureChangeProjected) {
          dispatch(setValuesTemporarilyViaIceCover(projectedIceCover));
        }
      }
    }
    if (!checked) {
      if (significantTemperatureChangeProjected) {
        dispatch(setValuesTemporarilyViaIceCover(initialIceCover));
      }
      // if we are out of equilibrium, keep the infrared fluxes blinking after toggling off ice cover feedback
      if (impliedTemperature !== thermometerTemperature) {
        stopFluxesBlinking();
        dispatch(resetFluxesFills());
        keepFluxesBlinking(
          [GROUND_TO_SKY, SKY_TO_GROUND, SKY_TO_ATMOSPHERE],
          dispatch,
        );
      }
      // if we are at equilibrium, stop all fluxes from blinking
      if (
        sliderCarbonDioxide === thermometerCarbonDioxide &&
        sliderMethane === thermometerMethane &&
        sliderCloudCover === thermometerCloudCover
      ) {
        stopFluxesBlinking();
        dispatch(resetFluxesFills());
      }
    }
  };

  return (
    <SwitchWithLabel
      switchLabel={t('Ice and Snow Cover')}
      onToggle={onToggle}
      isChecked={iceCoverFeedbackOn}
      disabled={disabled}
    />
  );
};

IceCoverFeedback.propTypes = {
  disabled: PropTypes.bool.isRequired,
};

export default IceCoverFeedback;
