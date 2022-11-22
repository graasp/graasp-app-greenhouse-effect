import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Group } from 'react-konva';
import GroundToSkyWave from './GroundToSkyWave';
import SkyToAtmosphereWave from './SkyToAtmosphereWave';
import SkyToGroundWave from './SkyToGroundWave';
import { FluxesWavesContext } from '../../../../contexts/fluxes-waves/FluxesWavesProvider';
import { computeGreenhouseEffect } from '../../../../../utils/greenhouseEffect';

const EarthWaves = () => {
  const { isMars } = useContext(FluxesWavesContext);
  const {
    finalCarbonDioxide,
    finalMethane,
    cTerm,
    simulationMode,
  } = useSelector(({ lab }) => lab);

  const greenhouseEffect = computeGreenhouseEffect(
    finalCarbonDioxide,
    finalMethane,
    cTerm,
    simulationMode,
  );

  return (
    <Group>
      <GroundToSkyWave />
      {!isMars && <SkyToAtmosphereWave greenhouseEffect={greenhouseEffect} />}
      {!isMars && <SkyToGroundWave greenhouseEffect={greenhouseEffect} />}
    </Group>
  );
};

export default EarthWaves;
