import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setRadationMode } from '../../actions/lab';
import { RADIATION_MODES } from '../../config/constants';
import SwitchWithTwoLabels from './SwitchWithTwoLabels';

const RadiationModeSwitch = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const radiationMode = useSelector(({ lab }) => lab.radiationMode);

  const rightLabel = (
    <div
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: t('Flux [W/m^2]', { escapeInterpolation: true }),
      }}
    />
  );

  const onToggle = (e) => {
    const { checked } = e.target;
    const mode = checked ? RADIATION_MODES.FLUX : RADIATION_MODES.WAVES;
    dispatch(setRadationMode(mode));
  };

  return (
    <SwitchWithTwoLabels
      leftLabel={t('Waves')}
      rightLabel={rightLabel}
      onSwitchToggle={onToggle}
      isChecked={radiationMode === RADIATION_MODES.FLUX}
    />
  );
};

export default RadiationModeSwitch;
