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
  METHANE_CONCENTRATION_MAX_VALUE,
  SIMULATION_MODES,
  ON_STRING,
  AUTO_STRING,
  METHANE_SLIDER_STEP,
  GROUND_TO_SKY,
  SKY_TO_GROUND,
  SKY_TO_ATMOSPHERE,
  SLIDERS,
} from '../../../../constants';
import { keepFluxesBlinking, stopFluxesBlinking } from '../../../../utils';

const MethaneSlider = ({ disabled, settingsUnchanged }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { simulationMode, sliders, thermometer } = useSelector(
    ({ lab }) => lab,
  );
  const { methane: sliderMethane } = sliders;
  const { methane: thermometerMethane } = thermometer;

  const isMarsOrVenus =
    simulationMode === SIMULATION_MODES.MARS.name ||
    simulationMode === SIMULATION_MODES.VENUS.name;

  const onChange = (event, value) => {
    stopFluxesBlinking();
    dispatch(toggleFluxesFills([SKY_TO_ATMOSPHERE, SKY_TO_GROUND]));
    dispatch(setVariable([{ methane: value }, SLIDERS]));
  };

  const onRelease = () => {
    dispatch(resetFluxesFills());
    if (sliderMethane !== thermometerMethane) {
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
      text={t('CH_4 (ppm)', { escapeInterpolation: true })}
      max={METHANE_CONCENTRATION_MAX_VALUE}
      value={sliderMethane}
      onChange={onChange}
      onRelease={onRelease}
      step={METHANE_SLIDER_STEP}
      disabled={disabled}
      valueLabelDisplay={isMarsOrVenus ? ON_STRING : AUTO_STRING}
    />
  );
};

MethaneSlider.propTypes = {
  disabled: PropTypes.bool.isRequired,
  settingsUnchanged: PropTypes.bool.isRequired,
};

export default MethaneSlider;
