import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import SwitchWithLabel from './shared-components/SwitchWithLabel';
import {
  resetFluxesFills,
  setFeedbackValues,
  setIsPaused,
} from '../../../actions';
import { keepFluxesBlinking, stopFluxesBlinking } from '../../../utils/canvas';
import {
  GROUND_TO_SKY,
  SKY_TO_ATMOSPHERE,
  SKY_TO_GROUND,
} from '../../../config/constants';

const WaterVaporFeedback = ({
  disabled,
  atInitialState,
  someSliderValueChanged,
}) => {
  const { t } = useTranslation();
  const { isPaused, feedback } = useSelector(({ lab }) => lab);
  const { waterVaporFeedbackOn } = feedback;
  const dispatch = useDispatch();

  const onToggle = (checked) => {
    dispatch(setFeedbackValues({ waterVaporFeedbackOn: checked }));
    // if the user toggles water vapor feedback on, only blink IR fluxes if some slider variable has changed
    if (checked && !atInitialState) {
      keepFluxesBlinking(
        [GROUND_TO_SKY, SKY_TO_GROUND, SKY_TO_ATMOSPHERE],
        dispatch,
      );
    }
    // if the user toggles water vapor feedback off and no slider variable has changed, we don't want IR fluxes to blink
    if (!checked && !someSliderValueChanged) {
      stopFluxesBlinking();
      dispatch(resetFluxesFills());
    }
    if (!isPaused && checked) {
      dispatch(setIsPaused(true));
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
  atInitialState: PropTypes.bool.isRequired,
  someSliderValueChanged: PropTypes.bool.isRequired,
};

export default WaterVaporFeedback;
