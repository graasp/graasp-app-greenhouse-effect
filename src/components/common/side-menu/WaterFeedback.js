import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import SwitchWithLabel from './shared-components/SwitchWithLabel';
import {
  setIsPaused,
  resetFluxesFills,
  setWaterFeedback,
  toggleWaterFeedback,
} from '../../../actions';
import {
  blinkFluxes,
  stopFluxesBlinking,
  computeCTerm,
  kelvinToCelsius,
  computeOutputs,
} from '../../../utils';
import { EARTH_FLUXES, FIRST_EPSILON } from '../../../constants';

const WaterFeedback = ({ settingsUnchanged, disabled }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { waterFeedback, simulationMode, thermometer } = useSelector(
    ({ lab }) => lab,
  );
  const { temperature: thermoTemp, cTerm: initialCTerm } = thermometer;

  const projectedCTerm = computeCTerm(kelvinToCelsius(thermoTemp));
  const { temperature } = computeOutputs(
    {
      ...thermometer,
      cTerm: projectedCTerm,
    },
    simulationMode,
  );
  const largeTempChange = Math.abs(temperature - thermoTemp) > FIRST_EPSILON;

  useEffect(() => {
    if (!settingsUnchanged || (waterFeedback && largeTempChange)) {
      blinkFluxes(EARTH_FLUXES, dispatch);
    }
  }, [waterFeedback]);

  const onToggle = (checked) => {
    dispatch(toggleWaterFeedback(checked));
    dispatch(setIsPaused(true));
    stopFluxesBlinking();
    dispatch(resetFluxesFills());

    if (largeTempChange) {
      if (checked) {
        dispatch(setWaterFeedback({ cTerm: projectedCTerm, checked }));
      } else {
        dispatch(setWaterFeedback({ cTerm: initialCTerm, checked }));
      }
    }
  };

  return (
    <SwitchWithLabel
      switchLabel={t('Water Vapor')}
      isChecked={waterFeedback}
      onToggle={onToggle}
      disabled={disabled}
    />
  );
};

WaterFeedback.propTypes = {
  disabled: PropTypes.bool.isRequired,
  settingsUnchanged: PropTypes.bool.isRequired,
};

export default WaterFeedback;
