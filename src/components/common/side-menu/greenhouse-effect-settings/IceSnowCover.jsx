import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import SliderWithLabel from '../shared-components/SliderWithLabel';
import {
  toggleFluxesFills,
  resetFluxesFills,
  setVariable,
} from '../../../../actions';
import {
  MAX_ICE_COVER,
  GROUND_TO_ATMOSPHERE,
  ON_STRING,
  AUTO_STRING,
  SLIDERS,
  EARTH_FLUXES,
} from '../../../../constants';
import { blinkFluxes, stopFluxesBlinking } from '../../../../utils';

const IceSnowCover = ({ disabled, slidersUnchanged }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { sliders, thermometer, iceFeedback } = useSelector(({ lab }) => lab);
  const { iceCover: sliderIceCover } = sliders;
  const { iceCover: thermometerIceCover } = thermometer;

  const onChange = (event, value) => {
    dispatch(toggleFluxesFills([GROUND_TO_ATMOSPHERE]));
    dispatch(setVariable([{ iceCover: value }, SLIDERS]));
  };

  const onRelease = () => {
    dispatch(resetFluxesFills());
    if (sliderIceCover !== thermometerIceCover) {
      blinkFluxes(EARTH_FLUXES, dispatch);
    }
    if (slidersUnchanged) {
      stopFluxesBlinking();
    }
  };

  return (
    <SliderWithLabel
      text={t('Ice and Snow (%)')}
      max={MAX_ICE_COVER}
      value={Math.round(sliderIceCover)}
      onChange={onChange}
      onRelease={onRelease}
      disabled={disabled || iceFeedback}
      valueLabelDisplay={iceFeedback ? ON_STRING : AUTO_STRING}
    />
  );
};

IceSnowCover.propTypes = {
  disabled: PropTypes.bool.isRequired,
  slidersUnchanged: PropTypes.bool.isRequired,
};

export default IceSnowCover;
