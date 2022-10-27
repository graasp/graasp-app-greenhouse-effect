import React from 'react';
import PropTypes from 'prop-types';
import { Group } from 'react-konva';
import {
  DEFAULT_FILL,
  EARTH_FLUXES_DARKENED_COLOR,
  EARTH_FLUXES_DEFAULT_COLOR,
  STEFAN_BOLTZMANN_CONSTANT,
} from '../../../../../config/constants';
import GroundToSkyFlux from './GroundToSkyFlux';
import SkyToAtmosphereFlux from './SkyToAtmosphereFlux';
import SkyToGroundFlux from './SkyToGroundFlux';

const EarthFluxes = ({ temperature, greenhouseEffect, fluxFill }) => {
  const groundToSkyFlux = Math.round(
    STEFAN_BOLTZMANN_CONSTANT * temperature ** 4,
  );
  const skyToGroundFlux = greenhouseEffect * groundToSkyFlux;
  const skyToAtmosphereFlux = groundToSkyFlux - skyToGroundFlux;

  const fill =
    fluxFill === DEFAULT_FILL
      ? EARTH_FLUXES_DEFAULT_COLOR
      : EARTH_FLUXES_DARKENED_COLOR;

  return (
    <Group>
      <GroundToSkyFlux flux={groundToSkyFlux} fill={fill} />
      <SkyToGroundFlux flux={skyToGroundFlux} fill={fill} />
      <SkyToAtmosphereFlux flux={skyToAtmosphereFlux} fill={fill} />
    </Group>
  );
};

EarthFluxes.propTypes = {
  temperature: PropTypes.number.isRequired,
  greenhouseEffect: PropTypes.number.isRequired,
  fluxFill: PropTypes.string.isRequired,
};

export default EarthFluxes;
