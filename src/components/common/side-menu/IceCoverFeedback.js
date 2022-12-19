import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetFluxesFills,
  setFeedbackValues,
  setIsPaused,
  setTemporaryIceCover,
} from '../../../actions';
import SwitchWithLabel from './shared-components/SwitchWithLabel';
import { keepFluxesBlinking, stopFluxesBlinking } from '../../../utils/canvas';
import {
  GROUND_TO_ATMOSPHERE,
  GROUND_TO_SKY,
  SKY_TO_ATMOSPHERE,
  SKY_TO_GROUND,
} from '../../../config/constants';
import {
  computeAlbedo,
  computeGreenhouseEffect,
  computeIceCover,
  computeTemperature,
  kelvinToCelsius,
} from '../../../utils/greenhouseEffect';

const IceCoverFeedback = ({ disabled, atInitialState }) => {
  const { t } = useTranslation();
  const {
    isPaused,
    feedback,
    finalCarbonDioxide,
    finalMethane,
    finalIceCover,
    finalCloudCover,
    temporaryIceCover,
    cTerm,
    simulationMode,
  } = useSelector(({ lab }) => lab);
  const { iceCoverFeedbackOn } = feedback;
  const dispatch = useDispatch();

  const originalIceCover = useRef(temporaryIceCover);

  const greenhouseEffect = computeGreenhouseEffect(
    finalCarbonDioxide,
    finalMethane,
    cTerm,
    simulationMode,
  );

  const { totalAlbedo } = computeAlbedo(
    finalIceCover,
    finalCloudCover,
    simulationMode,
  );

  const temperature = computeTemperature(
    greenhouseEffect,
    totalAlbedo,
    simulationMode,
  );

  const bla = computeIceCover(kelvinToCelsius(temperature));

  const onToggle = (checked) => {
    dispatch(setFeedbackValues({ iceCoverFeedbackOn: checked }));
    // if the user toggles water vapor feedback on, only blink IR fluxes if some slider variable has changed
    if (checked && !atInitialState) {
      keepFluxesBlinking(
        [GROUND_TO_SKY, SKY_TO_GROUND, SKY_TO_ATMOSPHERE, GROUND_TO_ATMOSPHERE],
        dispatch,
      );
      dispatch(setTemporaryIceCover(bla));
    }
    if (!checked) {
      stopFluxesBlinking();
      dispatch(resetFluxesFills());
      dispatch(setTemporaryIceCover(originalIceCover.current));
    }
    if (!isPaused && checked) {
      dispatch(setIsPaused(true));
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
  atInitialState: PropTypes.bool.isRequired,
};

export default IceCoverFeedback;
