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
  MAX_CARBON_DIOXIDE_DEFAULT,
  SIMULATION_MODES,
  MAX_CARBON_DIOXIDE_MARS_VENUS,
  ON_STRING,
  AUTO_STRING,
  SKY_TO_ATMOSPHERE,
  SKY_TO_GROUND,
  SLIDERS,
  EARTH_FLUXES,
} from '../../../../constants';
import { blinkFluxes, stopFluxesBlinking } from '../../../../utils';

const CarbonDioxideSlider = ({ disabled, slidersUnchanged }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { simulationMode, sliders, thermometer } = useSelector(
    ({ lab }) => lab,
  );
  const { carbonDioxide: sliderCarbonDioxide } = sliders;
  const { carbonDioxide: thermometerCarbonDioxide } = thermometer;

  const isMarsOrVenus =
    simulationMode === SIMULATION_MODES.MARS.name ||
    simulationMode === SIMULATION_MODES.VENUS.name;

  const MAX_CARBON_DIOXIDE = isMarsOrVenus
    ? MAX_CARBON_DIOXIDE_MARS_VENUS
    : MAX_CARBON_DIOXIDE_DEFAULT;

  // transform the label on the CO2 slider when either Mars or Venus are selected
  // by default '965000' would be shown; this adds a comma separator so that it's 965,000
  const formatCarbonDioxideLabel = (num) => {
    const numString = num.toString();
    if (isMarsOrVenus) {
      return `${numString.slice(0, 3)},${numString.slice(3)}`;
    }
    return num;
  };

  const onChange = (event, value) => {
    stopFluxesBlinking();
    dispatch(toggleFluxesFills([SKY_TO_ATMOSPHERE, SKY_TO_GROUND]));
    dispatch(setVariable([{ carbonDioxide: value }, SLIDERS]));
  };

  const onRelease = () => {
    dispatch(resetFluxesFills());
    if (sliderCarbonDioxide !== thermometerCarbonDioxide) {
      blinkFluxes(EARTH_FLUXES, dispatch);
    }
    if (slidersUnchanged) {
      stopFluxesBlinking();
    }
  };

  return (
    <SliderWithLabel
      text={t('CO_2 (ppm)', { escapeInterpolation: true })}
      max={MAX_CARBON_DIOXIDE}
      value={sliderCarbonDioxide}
      onChange={onChange}
      onRelease={onRelease}
      disabled={disabled}
      valueLabelDisplay={isMarsOrVenus ? ON_STRING : AUTO_STRING}
      bigLabel={isMarsOrVenus}
      valueLabelFormat={formatCarbonDioxideLabel}
    />
  );
};

CarbonDioxideSlider.propTypes = {
  disabled: PropTypes.bool.isRequired,
  slidersUnchanged: PropTypes.bool.isRequired,
};

export default CarbonDioxideSlider;
