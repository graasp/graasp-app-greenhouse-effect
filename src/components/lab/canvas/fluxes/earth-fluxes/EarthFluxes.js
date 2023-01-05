import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Group } from 'react-konva';
import { STEFAN_BOLTZMANN_CONSTANT } from '../../../../../constants';
import GroundToSkyFlux from './GroundToSkyFlux';
import SkyToAtmosphereFlux from './SkyToAtmosphereFlux';
import SkyToGroundFlux from './SkyToGroundFlux';
import { FluxesWavesContext } from '../../../../contexts/fluxes-waves/FluxesWavesProvider';

const EarthFluxes = () => {
  const { isMars } = useContext(FluxesWavesContext);
  const {
    fluxesFills,
    impliedGreenhouseEffect,
    thermometerTemperature,
  } = useSelector(({ lab }) => lab);
  const { groundToSky, skyToAtmosphere, skyToGround } = fluxesFills;

  const groundToSkyFlux = Math.round(
    STEFAN_BOLTZMANN_CONSTANT * thermometerTemperature ** 4,
  );
  const skyToGroundFlux = impliedGreenhouseEffect * groundToSkyFlux;
  const skyToAtmosphereFlux = groundToSkyFlux - skyToGroundFlux;

  return (
    <Group>
      <GroundToSkyFlux flux={groundToSkyFlux} fill={groundToSky} />
      {!isMars && <SkyToGroundFlux flux={skyToGroundFlux} fill={skyToGround} />}
      {!isMars && (
        <SkyToAtmosphereFlux
          flux={skyToAtmosphereFlux}
          fill={skyToAtmosphere}
        />
      )}
    </Group>
  );
};

export default EarthFluxes;
