import React from 'react';
import { useSelector } from 'react-redux';
import { Group } from 'react-konva';
import EarthFluxes from './earth-fluxes/EarthFluxes';
import SunFluxes from './sun-fluxes/SunFluxes';
import {
  computeAlbedo,
  computeCTerm,
  computeGreenhouseEffect,
  computeTemperature,
  kelvinToCelsius,
} from '../../../../utils/greenhouseEffect';

const Fluxes = () => {
  const {
    temporaryCarbonDioxide,
    temporaryMethane,
    temporaryIceCover,
    temporaryCloudCover,
    cTerm,
    simulationMode,
    finalIceCover,
    finalCloudCover,
    finalCarbonDioxide,
    finalMethane,
    feedback,
  } = useSelector(({ lab }) => lab);
  const { waterVapor: waterVaporFeedbackOn } = feedback;

  const oldGreenhouseEffect = computeGreenhouseEffect(
    finalCarbonDioxide,
    finalMethane,
    cTerm,
    simulationMode,
  );

  const { totalAlbedo: oldAlbedo } = computeAlbedo(
    finalIceCover,
    finalCloudCover,
    simulationMode,
  );

  const oldTemperature = computeTemperature(
    oldGreenhouseEffect,
    oldAlbedo,
    simulationMode,
  );

  let adjustedCTerm = cTerm;

  if (
    waterVaporFeedbackOn &&
    finalCarbonDioxide === temporaryCarbonDioxide &&
    finalMethane === temporaryMethane &&
    finalIceCover === temporaryIceCover &&
    finalCloudCover === temporaryCloudCover
  ) {
    const newGreenhouseEffect = computeGreenhouseEffect(
      temporaryCarbonDioxide,
      temporaryMethane,
      cTerm,
      simulationMode,
    );

    const { totalAlbedo } = computeAlbedo(
      temporaryIceCover,
      temporaryCloudCover,
      simulationMode,
    );

    const newTemperature = computeTemperature(
      newGreenhouseEffect,
      totalAlbedo,
      simulationMode,
    );

    adjustedCTerm = computeCTerm(kelvinToCelsius(newTemperature));
  }

  const finalGreenhouseEffect = computeGreenhouseEffect(
    temporaryCarbonDioxide,
    temporaryMethane,
    adjustedCTerm,
    simulationMode,
  );

  return (
    <Group>
      <SunFluxes />
      <EarthFluxes
        temperature={oldTemperature}
        greenhouseEffect={finalGreenhouseEffect}
      />
    </Group>
  );
};

export default Fluxes;
