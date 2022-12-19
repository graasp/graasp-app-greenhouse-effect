import React from 'react';
import { useSelector } from 'react-redux';
import { RADIATION_MODES, SIMULATION_MODES } from '../../../config/constants';
import Albedo from './greenhouse-effect-settings/Albedo';
import GreenhouseEffect from './greenhouse-effect-settings/GreenhouseEffect';

const GreenhouseEffectSettings = () => {
  const { radiationMode, isPaused, simulationMode } = useSelector(
    ({ lab }) => lab,
  );

  const isMarsOrVenus =
    simulationMode === SIMULATION_MODES.MARS.name ||
    simulationMode === SIMULATION_MODES.VENUS.name;

  // greenhouse effect settings should only affect the simulation on flux mode
  const disabled =
    !isPaused || radiationMode !== RADIATION_MODES.FLUXES || isMarsOrVenus;

  return (
    <>
      <Albedo disabled={disabled} />
      <GreenhouseEffect disabled={disabled} />
    </>
  );
};

export default GreenhouseEffectSettings;
