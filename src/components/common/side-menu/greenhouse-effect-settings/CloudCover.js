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
  MAX_CLOUD_COVER,
  MIN_CLOUD_COVER,
  GROUND_TO_ATMOSPHERE,
  CLOUD_TO_ATMOSPHERE,
  CLOUD_TO_GROUND,
  SLIDERS,
  EARTH_FLUXES,
} from '../../../../constants';
import { blinkFluxes, stopFluxesBlinking } from '../../../../utils';

const CloudCover = ({ disabled, settingsUnchanged }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { sliders, thermometer } = useSelector(({ lab }) => lab);
  const { cloudCover: sliderCloudCover } = sliders;
  const { cloudCover: thermometerCloudCover } = thermometer;

  const onChange = (event, value) => {
    dispatch(
      toggleFluxesFills([
        CLOUD_TO_GROUND,
        CLOUD_TO_ATMOSPHERE,
        GROUND_TO_ATMOSPHERE,
      ]),
    );
    dispatch(setVariable([{ cloudCover: value }, SLIDERS]));
  };

  const onRelease = () => {
    dispatch(resetFluxesFills());
    if (sliderCloudCover !== thermometerCloudCover) {
      blinkFluxes(EARTH_FLUXES, dispatch);
    }
    if (settingsUnchanged) {
      stopFluxesBlinking();
    }
  };

  return (
    <SliderWithLabel
      text={t('Cloud (%)')}
      min={MIN_CLOUD_COVER}
      max={MAX_CLOUD_COVER}
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
