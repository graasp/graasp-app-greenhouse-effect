import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setScaleUnit } from '../../../actions/lab';
import { SCALE_UNITS } from '../../../config/constants';
import SwitchWithTwoLabels from './shared-components/SwitchWithTwoLabels';

const ScaleUnitSwitch = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { scaleUnit } = useSelector(({ lab }) => lab);
  const scaleName = scaleUnit.name;

  const onToggle = (e) => {
    const { checked } = e.target;
    const unit = checked ? SCALE_UNITS.CELSIUS : SCALE_UNITS.KELVIN;
    dispatch(setScaleUnit(unit));
  };

  return (
    <SwitchWithTwoLabels
      leftLabel={t('Kelvin')}
      rightLabel={t('Celsius')}
      onSwitchToggle={onToggle}
      isChecked={scaleName === SCALE_UNITS.CELSIUS.name}
    />
  );
};

export default ScaleUnitSwitch;
