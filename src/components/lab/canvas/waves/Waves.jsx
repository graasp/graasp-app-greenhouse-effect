import React from 'react';
import PropTypes from 'prop-types';
import { Group } from 'react-konva';
import EarthWaves from './earth-waves/EarthWaves';
import SunWaves from './sun-waves/SunWaves';

const Waves = ({ sunEnergies, earthEnergies }) => {
  return (
    <Group>
      <SunWaves sunEnergies={sunEnergies} />
      <EarthWaves earthEnergies={earthEnergies} />
    </Group>
  );
};

Waves.propTypes = {
  sunEnergies: PropTypes.objectOf(PropTypes.number).isRequired,
  earthEnergies: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default Waves;
