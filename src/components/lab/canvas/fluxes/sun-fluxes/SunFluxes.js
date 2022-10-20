import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Group } from 'react-konva';
import CloudToAtmosphereFlux from './CloudToAtmosphereFlux';
import SunToCloudFlux from './SunToCloudFlux';
import CloudToGroundFlux from './CloudToGroundFlux';
import GroundToAtmosphereFlux from './GroundToAtmosphereFlux';
import {
  DEFAULT_FILL,
  SOLAR_FLUXES,
  SUN_FLUXES_DARKENED_COLOR,
  SUN_FLUXES_DEFAULT_COLOR,
} from '../../../../../config/constants';
import { computeAlbedo } from '../../../../../utils/greenhouseEffect';

const SunFluxes = ({ fluxFill }) => {
  const { simulationMode } = useSelector(({ lab }) => lab);
  const { iceCover, cloudCover } = useSelector(({ lab }) => lab.albedo);

  const { albedo: generalAlbedo, cloud: cloudAlbedo } = computeAlbedo({
    iceCover,
    cloudCover,
    simulationMode,
  });

  const sunToCloudFlux = SOLAR_FLUXES[simulationMode];
  const cloudToAtmosphereFlux = cloudAlbedo * sunToCloudFlux;
  const cloudToGroundFlux = sunToCloudFlux - cloudToAtmosphereFlux;
  const groundToAtmosphereFlux = sunToCloudFlux * (generalAlbedo - cloudAlbedo);

  const fill =
    fluxFill === DEFAULT_FILL
      ? SUN_FLUXES_DEFAULT_COLOR
      : SUN_FLUXES_DARKENED_COLOR;

  return (
    <Group>
      <SunToCloudFlux flux={sunToCloudFlux} fill={fill} />
      <CloudToAtmosphereFlux flux={cloudToAtmosphereFlux} fill={fill} />
      <CloudToGroundFlux flux={cloudToGroundFlux} fill={fill} />
      <GroundToAtmosphereFlux flux={groundToAtmosphereFlux} fill={fill} />
    </Group>
  );
};

SunFluxes.propTypes = {
  fluxFill: PropTypes.string.isRequired,
};

export default SunFluxes;
