import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetFluxesFills,
  setIsPaused,
  setIceFeedback,
  toggleIceFeedback,
} from '../../../actions';
import SwitchWithLabel from './shared-components/SwitchWithLabel';
import {
  blinkFluxes,
  stopFluxesBlinking,
  computeIceCover,
  kelvinToCelsius,
  computeOutputs,
} from '../../../utils';
import {
  EARTH_FLUXES,
  FIRST_EPSILON,
  GROUND_TO_ATMOSPHERE,
} from '../../../constants';

const IceFeedback = ({ disabled, slidersUnchanged }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { iceFeedback, thermometer, simulationMode } = useSelector(
    ({ lab }) => lab,
  );
  const { temperature: thermoTemp, iceCover: initialIceCover } = thermometer;

  const projectedIceCover = computeIceCover(kelvinToCelsius(thermoTemp));
  const { temperature } = computeOutputs(
    {
      ...thermometer,
      iceCover: projectedIceCover,
    },
    simulationMode,
  );
  const largeTempChange = Math.abs(temperature - thermoTemp) > FIRST_EPSILON;

  useEffect(() => {
    if (iceFeedback && (largeTempChange || !slidersUnchanged)) {
      blinkFluxes([...EARTH_FLUXES, GROUND_TO_ATMOSPHERE], dispatch);
    }
    if (!iceFeedback && !slidersUnchanged) {
      blinkFluxes(EARTH_FLUXES, dispatch);
    }
  }, [iceFeedback]);

  const onToggle = (checked) => {
    dispatch(toggleIceFeedback(checked));
    dispatch(setIsPaused(true));
    stopFluxesBlinking();
    dispatch(resetFluxesFills());

    if (largeTempChange) {
      if (checked) {
        dispatch(setIceFeedback({ iceCover: projectedIceCover, checked }));
      } else {
        dispatch(setIceFeedback({ iceCover: initialIceCover, checked }));
      }
    }
  };

  return (
    <SwitchWithLabel
      switchLabel={t('Ice and Snow')}
      onToggle={onToggle}
      isChecked={iceFeedback}
      disabled={disabled}
    />
  );
};

IceFeedback.propTypes = {
  disabled: PropTypes.bool.isRequired,
  slidersUnchanged: PropTypes.bool.isRequired,
};

export default IceFeedback;
