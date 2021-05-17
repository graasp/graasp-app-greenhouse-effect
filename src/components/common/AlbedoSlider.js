import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setAlbedo } from '../../actions';
import { ALBEDO_MAX_VALUE } from '../../config/constants';
import SliderWithLabel from './SliderWithLabel';

const AlbedoSlider = () => {
  const { t } = useTranslation();
  const albedo = useSelector(({ lab }) => lab.albedo);
  const dispatch = useDispatch();

  const onChange = (e, v) => {
    dispatch(setAlbedo(v));
  };

  return (
    <SliderWithLabel
      text={t('Albedo (%)')}
      max={ALBEDO_MAX_VALUE}
      value={albedo}
      onChange={onChange}
    />
  );
};

export default AlbedoSlider;
