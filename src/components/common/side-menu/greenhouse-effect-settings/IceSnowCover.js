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
import { keepFluxesBlinking } from '../../../../utils';

const IceSnowCover = ({ disabled }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { sliderIceCover, feedback } = useSelector(({ lab }) => lab);
  const { iceCoverFeedbackOn } = feedback;

  const onChange = (event, value) => {
    dispatch(toggleFluxesFills([GROUND_TO_ATMOSPHERE]));
    dispatch(setSliderIceCover(value));
  };

  const onMouseUp = () => {
    dispatch(resetFluxesFills());
    keepFluxesBlinking(
      [GROUND_TO_SKY, SKY_TO_GROUND, SKY_TO_ATMOSPHERE],
      dispatch,
    );
  };

  return (
    <SliderWithLabel
      text={t('Ice and Snow Cover (%)')}
      max={ICE_COVER_MAX_VALUE}
      value={Math.round(sliderIceCover)}
      onChange={onChange}
      onMouseUp={onMouseUp}
      disabled={disabled || iceCoverFeedbackOn}
      valueLabelDisplay={iceCoverFeedbackOn ? ON_STRING : AUTO_STRING}
    />
  );
};

IceSnowCover.propTypes = {
  disabled: PropTypes.bool.isRequired,
};

export default IceSnowCover;
