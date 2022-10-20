import React from 'react';
import PropTypes from 'prop-types';
import { Group } from 'react-konva';
import EarthWaves from './earth-waves/EarthWaves';
import SunWaves from './sun-waves/SunWaves';

const Waves = ({ greenhouseEffect }) => {
  return (
    <Group>
      <SunWaves />
      <EarthWaves greenhouseEffect={greenhouseEffect} />
    </Group>
  );
};

Waves.propTypes = {
  greenhouseEffect: PropTypes.number.isRequired,
};

export default Waves;
