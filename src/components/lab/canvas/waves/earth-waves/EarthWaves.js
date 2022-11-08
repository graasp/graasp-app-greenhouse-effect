import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Group } from 'react-konva';
import GroundToSkyWave from './GroundToSkyWave';
import SkyToAtmosphereWave from './SkyToAtmosphereWave';
import SkyToGroundWave from './SkyToGroundWave';
import { FluxesWavesContext } from '../../../../contexts/fluxes-waves/FluxesWavesProvider';

const EarthWaves = ({ greenhouseEffect }) => {
  const { isMars } = useContext(FluxesWavesContext);

  return (
    <Group>
      <GroundToSkyWave />
      {!isMars && <SkyToAtmosphereWave greenhouseEffect={greenhouseEffect} />}
      {!isMars && <SkyToGroundWave greenhouseEffect={greenhouseEffect} />}
    </Group>
  );
};

EarthWaves.propTypes = {
  greenhouseEffect: PropTypes.number.isRequired,
};

export default EarthWaves;
