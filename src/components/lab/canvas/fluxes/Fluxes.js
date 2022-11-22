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
  } = useSelector(({ lab }) => lab);

  const greenhouseEffect = computeGreenhouseEffect(
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
    greenhouseEffect,
    totalAlbedo,
    simulationMode,
  );

  return (
    <Group>
      <SunFluxes />
      <EarthFluxes
        temperature={temperature}
        greenhouseEffect={greenhouseEffect}
      />
    </Group>
  );
};

export default Fluxes;
