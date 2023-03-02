import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import SliderWithLabel from '../shared-components/SliderWithLabel';
import {
  toggleFluxesFills,
  resetFluxesFills,
  setSliderCloudCover,
} from '../../../../actions';
import {
  CLOUD_COVER_MAX_VALUE,
  CLOUD_COVER_MIN_VALUE,
  GROUND_TO_ATMOSPHERE,
  CLOUD_TO_ATMOSPHERE,
  CLOUD_TO_GROUND,
  GROUND_TO_SKY,
  SKY_TO_GROUND,
  SKY_TO_ATMOSPHERE,
} from '../../../../constants';
import { keepFluxesBlinking, stopFluxesBlinking } from '../../../../utils';

const CloudCover = ({ disabled, settingsUnchanged }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { sliderCloudCover, thermometerCloudCover } = useSelector(
    ({ lab }) => lab,
  );

  const onChange = (event, value) => {
    dispatch(
      toggleFluxesFills([
        CLOUD_TO_GROUND,
        CLOUD_TO_ATMOSPHERE,
        GROUND_TO_ATMOSPHERE,
      ]),
    );
    dispatch(setSliderCloudCover(value));
  };

  const onRelease = () => {
    dispatch(resetFluxesFills());
    if (sliderCloudCover !== thermometerCloudCover) {
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
      text={t('Cloud Cover (%)')}
      min={CLOUD_COVER_MIN_VALUE}
      max={CLOUD_COVER_MAX_VALUE}
      value={sliderCloudCover}
      onChange={onChange}
      onRelease={onRelease}
      disabled={disabled}
    />
  );
};

CloudCover.propTypes = {
  disabled: PropTypes.bool.isRequired,
  settingsUnchanged: PropTypes.bool.isRequired,
};

export default CloudCover;
