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

  const newGreenhouseEffect = computeGreenhouseEffect(
    temporaryCarbonDioxide,
    temporaryMethane,
    cTerm,
    simulationMode,
  );

  const { totalAlbedo: oldAlbedo } = computeAlbedo(
    finalIceCover,
    finalCloudCover,
    simulationMode,
  );

  const { totalAlbedo: newAlbedo } = computeAlbedo(
    temporaryIceCover,
    temporaryCloudCover,
    simulationMode,
  );

  const oldTemperature = computeTemperature(
    oldGreenhouseEffect,
    oldAlbedo,
    simulationMode,
  );

  const newTemperature = computeTemperature(
    newGreenhouseEffect,
    newAlbedo,
    simulationMode,
  );

  const adjustedCTerm = computeCTerm(kelvinToCelsius(newTemperature));

  const adjustedGreenhouseEffect = computeGreenhouseEffect(
    temporaryCarbonDioxide,
    temporaryMethane,
    adjustedCTerm,
  );

  return (
    <Group>
      <SunFluxes />
      <EarthFluxes
        oldTemperature={oldTemperature}
        greenhouseEffect={
          waterVaporFeedbackOn ? adjustedGreenhouseEffect : newGreenhouseEffect
        }
      />
    </Group>
  );
};

export default Fluxes;
