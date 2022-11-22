import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import SliderWithLabel from '../shared-components/SliderWithLabel';
import {
  setTemporaryCarbonDioxide,
  setFinalCloudCover,
  setFinalIceCover,
  toggleFluxesFills,
  resetFluxesFills,
} from '../../../../actions';
import {
  CARBON_DIOXIDE_CONCENTRATION_MAX_VALUE_DEFAULT,
  CARBON_DIOXIDE_CONCENTRATION_MIN_VALUE,
  SIMULATION_MODES,
  CARBON_DIOXIDE_CONCENTRATION_MAX_VALUE_ON_MARS_OR_VENUS,
  ON_STRING,
  AUTO_STRING,
  GROUND_TO_SKY,
  SKY_TO_GROUND,
} from '../../../../config/constants';
import { stopFluxesBlinking } from '../../../../utils/canvas';

const CarbonDioxideSlider = ({ disabled }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    temporaryIceCover,
    temporaryCloudCover,
    simulationMode,
    temporaryCarbonDioxide,
  } = useSelector(({ lab }) => lab);

  const isMarsOrVenus =
    simulationMode === SIMULATION_MODES.MARS.name ||
    simulationMode === SIMULATION_MODES.VENUS.name;

  // adjust CO2 and H2O concentration sliders max/min points if planet other than earth is selected
  const CARBON_DIOXIDE_CONCENTRATION_MAX_VALUE = isMarsOrVenus
    ? CARBON_DIOXIDE_CONCENTRATION_MAX_VALUE_ON_MARS_OR_VENUS
    : CARBON_DIOXIDE_CONCENTRATION_MAX_VALUE_DEFAULT;

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
    dispatch(toggleFluxesFills([GROUND_TO_SKY, SKY_TO_GROUND]));

    // to make sure fluxes are being calculated based on latest albedo values
    // covers the case where: user adjusts cloud/ice cover, then adjusts CO2 before clicking play
    // in such a case, earth fluxes need to be calculated taking into account adjusted ice/cloud cover
    dispatch(setFinalCloudCover(temporaryCloudCover));
    dispatch(setFinalIceCover(temporaryIceCover));

    dispatch(setTemporaryCarbonDioxide(value));
  };

  const onMouseUp = () => {
    dispatch(resetFluxesFills());
  };

  return (
    <SliderWithLabel
      text={t('CO_2 (ppm)', { escapeInterpolation: true })}
      max={CARBON_DIOXIDE_CONCENTRATION_MAX_VALUE}
      min={CARBON_DIOXIDE_CONCENTRATION_MIN_VALUE}
      value={temporaryCarbonDioxide}
      onChange={onChange}
      onMouseUp={onMouseUp}
      disabled={disabled}
      valueLabelDisplay={isMarsOrVenus ? ON_STRING : AUTO_STRING}
      bigLabel={isMarsOrVenus}
      valueLabelFormat={formatCarbonDioxideLabel}
    />
  );
};

CarbonDioxideSlider.propTypes = {
  disabled: PropTypes.bool.isRequired,
};

export default CarbonDioxideSlider;