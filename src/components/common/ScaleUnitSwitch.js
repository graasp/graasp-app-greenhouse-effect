import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setNextState, setScaleUnit } from '../../actions/lab';
import { SCALE_UNITS } from '../../config/constants';
import SwitchWithTwoLabels from './SwitchWithTwoLabels';

const ScaleUnitSwitch = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const scaleUnit = useSelector(({ lab }) => lab.scaleUnit);

  const onToggle = (e) => {
    const { checked } = e.target;
    const unit = checked ? SCALE_UNITS.CELSIUS : SCALE_UNITS.KELVIN;
    dispatch(setScaleUnit(unit));
    dispatch(setNextState());
  };

  return (
    <SwitchWithTwoLabels
      leftLabel={t('Kelvin')}
      rightLabel={t('Celsius')}
      onSwitchToggle={onToggle}
      isChecked={scaleUnit === SCALE_UNITS.CELSIUS}
    />
  );
};

export default ScaleUnitSwitch;
