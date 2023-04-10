import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Group } from 'react-konva';
import GroundToSkyWave from './GroundToSkyWave';
import SkyToAtmosphereWave from './SkyToAtmosphereWave';
import SkyToGroundWave from './SkyToGroundWave';
import { FluxesWavesContext } from '../../../../contexts/fluxes-waves/FluxesWavesProvider';
import { computeEarthEnergies } from '../../../../../utils';

const EarthWaves = () => {
  const { isMars } = useContext(FluxesWavesContext);
  const { sliders, thermometer } = useSelector(({ lab }) => lab);
  const { temperature: thermometerTemperature } = thermometer;
  const { greenhouseEffect: impliedGreenhouseEffect } = sliders;

  const { groundToSky, skyToAtmosphere, skyToGround } = computeEarthEnergies(
    thermometerTemperature,
    impliedGreenhouseEffect,
  );

  return (
    <Group>
      <GroundToSkyWave energy={groundToSky} />
      {!isMars && <SkyToAtmosphereWave energy={skyToAtmosphere} />}
      {!isMars && <SkyToGroundWave energy={skyToGround} />}
    </Group>
  );
};

export default EarthWaves;
