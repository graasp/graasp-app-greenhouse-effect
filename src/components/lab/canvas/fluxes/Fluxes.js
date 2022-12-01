import React from 'react';
import { useSelector } from 'react-redux';
import { Group } from 'react-konva';
import EarthFluxes from './earth-fluxes/EarthFluxes';
import SunFluxes from './sun-fluxes/SunFluxes';
import {
  computeAlbedo,
  computeGreenhouseEffect,
  computeTemperature,
} from '../../../../utils/greenhouseEffect';

const Fluxes = () => {
  const {
    temporaryCarbonDioxide,
    temporaryMethane,
    cTerm,
    simulationMode,
    finalIceCover,
    finalCloudCover,
    finalCarbonDioxide,
    finalMethane,
  } = useSelector(({ lab }) => lab);

  const oldGreenhouseEffect = computeGreenhouseEffect(
    finalCarbonDioxide,
    finalMethane,
    cTerm,
    simulationMode,
  );

  const newGreenhouseEffect = computeGreenhouseEffect(
    temporaryCarbonDioxide,
    temporaryMethane,
    cTerm,
    simulationMode,
  );

  const { totalAlbedo } = computeAlbedo(
    finalIceCover,
    finalCloudCover,
    simulationMode,
  );

  const temperature = computeTemperature(
    oldGreenhouseEffect,
    totalAlbedo,
    simulationMode,
  );

  return (
    <Group>
      <SunFluxes />
      <EarthFluxes
        temperature={temperature}
        greenhouseEffect={newGreenhouseEffect}
      />
    </Group>
  );
};

export default Fluxes;
