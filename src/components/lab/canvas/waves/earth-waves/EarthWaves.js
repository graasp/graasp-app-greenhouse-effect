import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Group } from 'react-konva';
import GroundToSkyWave from './GroundToSkyWave';
import SkyToAtmosphereWave from './SkyToAtmosphereWave';
import SkyToGroundWave from './SkyToGroundWave';
import { FluxesWavesContext } from '../../../../contexts/fluxes-waves/FluxesWavesProvider';
import { computeEarthEnergies } from '../../../../../utils';
import {
  INITIAL_GREENHOUSE_EFFECT,
  INITIAL_TEMPERATURE,
} from '../../../../../constants';

const EarthWaves = ({ earthEnergies }) => {
  const { isMars, isVenus } = useContext(FluxesWavesContext);
  const { groundToSky, skyToAtmosphere, skyToGround } = earthEnergies;

  const {
    groundToSky: groundToSkyInitial,
    skyToAtmosphere: skyToAtmosphereInitial,
    skyToGround: skyToGroundInitial,
  } = computeEarthEnergies(INITIAL_TEMPERATURE, INITIAL_GREENHOUSE_EFFECT);

  return (
    <Group>
      <GroundToSkyWave
        energy={groundToSky}
        initial={groundToSkyInitial}
        amplify={!isVenus}
      />
      {!isMars && (
        <SkyToAtmosphereWave
          energy={skyToAtmosphere}
          initial={skyToAtmosphereInitial}
          amplify={!isVenus}
        />
      )}
      {!isMars && (
        <SkyToGroundWave
          energy={skyToGround}
          initial={skyToGroundInitial}
          amplify={!isVenus}
        />
      )}
    </Group>
  );
};

EarthWaves.propTypes = {
  earthEnergies: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default EarthWaves;
