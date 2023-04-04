import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Group } from 'react-konva';
import GroundToSkyFlux from './GroundToSkyFlux';
import SkyToAtmosphereFlux from './SkyToAtmosphereFlux';
import SkyToGroundFlux from './SkyToGroundFlux';
import { FluxesWavesContext } from '../../../../contexts/fluxes-waves/FluxesWavesProvider';
import { computeEarthEnergies } from '../../../../../utils';

const EarthFluxes = () => {
  const { isMars } = useContext(FluxesWavesContext);
  const { fluxesFills, sliders, thermometer } = useSelector(({ lab }) => lab);
  const { temperature: thermometerTemperature } = thermometer;
  const { greenhouseEffect: impliedGreenhouseEffect } = sliders;
  const { groundToSky, skyToAtmosphere, skyToGround } = fluxesFills;

  const {
    groundToSky: groundToSkyEnergy,
    skyToGround: skyToGroundEnergy,
    skyToAtmosphere: skyToAtmosphereEnergy,
  } = computeEarthEnergies(thermometerTemperature, impliedGreenhouseEffect);

  return (
    <Group>
      <GroundToSkyFlux energy={groundToSkyEnergy} fill={groundToSky} />
      {!isMars && (
        <SkyToGroundFlux energy={skyToGroundEnergy} fill={skyToGround} />
      )}
      {!isMars && (
        <SkyToAtmosphereFlux
          energy={skyToAtmosphereEnergy}
          fill={skyToAtmosphere}
        />
      )}
    </Group>
  );
};

export default EarthFluxes;
