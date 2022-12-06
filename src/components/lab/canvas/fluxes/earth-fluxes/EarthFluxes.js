import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Group } from 'react-konva';
import { STEFAN_BOLTZMANN_CONSTANT } from '../../../../../config/constants';
import GroundToSkyFlux from './GroundToSkyFlux';
import SkyToAtmosphereFlux from './SkyToAtmosphereFlux';
import SkyToGroundFlux from './SkyToGroundFlux';
import { FluxesWavesContext } from '../../../../contexts/fluxes-waves/FluxesWavesProvider';

const EarthFluxes = ({ oldTemperature, greenhouseEffect }) => {
  const { isMars } = useContext(FluxesWavesContext);
  const { fluxesFills } = useSelector(({ lab }) => lab);
  const { groundToSky, skyToAtmosphere, skyToGround } = fluxesFills;

  const groundToSkyFlux = Math.round(
    STEFAN_BOLTZMANN_CONSTANT * oldTemperature ** 4,
  );
  const skyToGroundFlux = greenhouseEffect * groundToSkyFlux;
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

EarthFluxes.propTypes = {
  oldTemperature: PropTypes.number.isRequired,
  greenhouseEffect: PropTypes.number.isRequired,
};

export default EarthFluxes;
