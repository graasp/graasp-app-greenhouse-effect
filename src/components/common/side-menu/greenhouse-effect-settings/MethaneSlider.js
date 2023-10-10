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
  MAX_METHANE,
  SIMULATION_MODES,
  ON_STRING,
  AUTO_STRING,
  METHANE_SLIDER_STEP,
  SKY_TO_GROUND,
  SKY_TO_ATMOSPHERE,
  SLIDERS,
  EARTH_FLUXES,
} from '../../../../constants';
import { blinkFluxes, stopFluxesBlinking } from '../../../../utils';

const MethaneSlider = ({ disabled, slidersUnchanged }) => {
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
      blinkFluxes(EARTH_FLUXES, dispatch);
    }
    if (slidersUnchanged) {
      stopFluxesBlinking();
    }
  };

  return (
    <SliderWithLabel
      text={t('CH_4 (ppm)', { escapeInterpolation: true })}
      max={MAX_METHANE}
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
  slidersUnchanged: PropTypes.bool.isRequired,
};

export default MethaneSlider;
