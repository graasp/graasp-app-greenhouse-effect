import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import SliderWithLabel from '../shared-components/SliderWithLabel';
import {
  setTemporaryIceCover,
  toggleFluxesFills,
  resetFluxesFills,
} from '../../../../actions';
import {
  ICE_COVER_MAX_VALUE,
  GROUND_TO_ATMOSPHERE,
  GROUND_TO_SKY,
  SKY_TO_GROUND,
  SKY_TO_ATMOSPHERE,
} from '../../../../config/constants';
import { keepFluxesBlinking } from '../../../../utils/canvas';

const IceSnowCover = ({ disabled }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { temporaryIceCover } = useSelector(({ lab }) => lab);

  const onChange = (event, value) => {
    dispatch(toggleFluxesFills([GROUND_TO_ATMOSPHERE]));
    dispatch(setTemporaryIceCover(value));
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
      value={temporaryIceCover}
      onChange={onChange}
      onMouseUp={onMouseUp}
      disabled={disabled}
    />
  );
};

IceSnowCover.propTypes = {
  disabled: PropTypes.bool.isRequired,
};

export default IceSnowCover;
