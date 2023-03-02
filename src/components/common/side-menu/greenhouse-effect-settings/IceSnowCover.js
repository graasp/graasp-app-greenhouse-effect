import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import SliderWithLabel from '../shared-components/SliderWithLabel';
import {
  toggleFluxesFills,
  resetFluxesFills,
  setSliderIceCover,
} from '../../../../actions';
import {
  ICE_COVER_MAX_VALUE,
  GROUND_TO_ATMOSPHERE,
  GROUND_TO_SKY,
  SKY_TO_GROUND,
  SKY_TO_ATMOSPHERE,
  ON_STRING,
  AUTO_STRING,
} from '../../../../constants';
import { keepFluxesBlinking, stopFluxesBlinking } from '../../../../utils';

const IceSnowCover = ({ disabled, settingsUnchanged }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { sliderIceCover, thermometerIceCover, feedback } = useSelector(
    ({ lab }) => lab,
  );
  const { iceCoverFeedbackOn } = feedback;

  const onChange = (event, value) => {
    dispatch(toggleFluxesFills([GROUND_TO_ATMOSPHERE]));
    dispatch(setSliderIceCover(value));
  };

  const onRelease = () => {
    dispatch(resetFluxesFills());
    if (sliderIceCover !== thermometerIceCover) {
      keepFluxesBlinking(
        [GROUND_TO_SKY, SKY_TO_GROUND, SKY_TO_ATMOSPHERE],
        dispatch,
      );
    }
    if (settingsUnchanged) {
      stopFluxesBlinking();
    }
  };

  return (
    <SliderWithLabel
      text={t('Ice and Snow Cover (%)')}
      max={ICE_COVER_MAX_VALUE}
      value={Math.round(sliderIceCover)}
      onChange={onChange}
      onRelease={onRelease}
      disabled={disabled || iceCoverFeedbackOn}
      valueLabelDisplay={iceCoverFeedbackOn ? ON_STRING : AUTO_STRING}
    />
  );
};

IceSnowCover.propTypes = {
  disabled: PropTypes.bool.isRequired,
  settingsUnchanged: PropTypes.bool.isRequired,
};

export default IceSnowCover;
