import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import SliderWithLabel from '../shared-components/SliderWithLabel';
import {
  setTemporaryMethane,
  toggleFluxesFills,
  resetFluxesFills,
} from '../../../../actions';
import {
  METHANE_CONCENTRATION_MAX_VALUE,
  METHANE_CONCENTRATION_MIN_VALUE,
  SIMULATION_MODES,
  ON_STRING,
  AUTO_STRING,
  METHANE_SLIDER_STEP,
  GROUND_TO_SKY,
  SKY_TO_GROUND,
  SKY_TO_ATMOSPHERE,
} from '../../../../config/constants';
import {
  keepFluxesBlinking,
  stopFluxesBlinking,
} from '../../../../utils/canvas';

const MethaneSlider = ({ disabled }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { simulationMode, temporaryMethane } = useSelector(({ lab }) => lab);

  const isMarsOrVenus =
    simulationMode === SIMULATION_MODES.MARS.name ||
    simulationMode === SIMULATION_MODES.VENUS.name;

  const onChange = (event, value) => {
    stopFluxesBlinking();
    dispatch(toggleFluxesFills([SKY_TO_ATMOSPHERE, SKY_TO_GROUND]));
    dispatch(setTemporaryMethane(value));
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
      text={t('CH_4 (ppm)', { escapeInterpolation: true })}
      max={METHANE_CONCENTRATION_MAX_VALUE}
      min={METHANE_CONCENTRATION_MIN_VALUE}
      value={temporaryMethane}
      onChange={onChange}
      onMouseUp={onMouseUp}
      step={METHANE_SLIDER_STEP}
      disabled={disabled}
      valueLabelDisplay={isMarsOrVenus ? ON_STRING : AUTO_STRING}
    />
  );
};

MethaneSlider.propTypes = {
  disabled: PropTypes.bool.isRequired,
};

export default MethaneSlider;
