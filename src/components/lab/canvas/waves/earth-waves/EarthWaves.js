import React from 'react';
import PropTypes from 'prop-types';
import { Group } from 'react-konva';
import GroundToSkyWave from './GroundToSkyWave';
import SkyToAtmosphereWave from './SkyToAtmosphereWave';
import SkyToGroundWave from './SkyToGroundWave';

const EarthWaves = ({ greenhouseEffect }) => {
  return (
    <Group>
      <GroundToSkyWave />
      <SkyToAtmosphereWave greenhouseEffect={greenhouseEffect} />
      <SkyToGroundWave greenhouseEffect={greenhouseEffect} />
    </Group>
  );
};

EarthWaves.propTypes = {
  greenhouseEffect: PropTypes.number.isRequired,
};

export default EarthWaves;
