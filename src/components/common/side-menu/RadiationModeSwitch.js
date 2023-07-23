import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { reset, setRadiationMode } from '../../../actions';
import { RADIATION_MODES, SIMULATION_MODES } from '../../../constants';
import SwitchWithTwoLabels from './shared-components/SwitchWithTwoLabels';

const RadiationModeSwitch = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { animationPlaying, radiationMode, simulationMode } = useSelector(
    ({ lab }) => lab,
  );

  const rightLabel = (
    <span
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: t('Fluxes [W/m^2]', { escapeInterpolation: true }),
      }}
    />
  );

  const onToggle = (e) => {
    const originalMode = Object.values(SIMULATION_MODES).find(
      ({ name }) => name === simulationMode,
    );
    dispatch(reset(originalMode));
    const { checked } = e.target;
    const mode = checked ? RADIATION_MODES.FLUXES : RADIATION_MODES.WAVES;
    dispatch(setRadiationMode(mode));
  };

  return (
    <SwitchWithTwoLabels
      leftLabel={t('Waves')}
      rightLabel={rightLabel}
      onSwitchToggle={onToggle}
      isChecked={radiationMode === RADIATION_MODES.FLUXES}
      disabled={animationPlaying}
      radiationModeSwitch
    />
  );
};

export default RadiationModeSwitch;
