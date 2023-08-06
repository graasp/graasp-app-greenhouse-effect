import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Group } from 'react-konva';
import { useSelector } from 'react-redux';
import { computeSunEnergies } from '../../../../../utils';
import { FluxesWavesContext } from '../../../../contexts/fluxes-waves/FluxesWavesProvider';
import CloudToAtmosphereWave from './CloudToAtmosphereWave';
import CloudToGroundWave from './CloudToGroundWave';
import GroundToAtmosphereWave from './GroundToAtmosphereWave';
import SunToCloudWave from './SunToCloudWave';
import { INITIAL_ALBEDO } from '../../../../../constants';

const SunWaves = ({ sunEnergies }) => {
  const { isMars } = useContext(FluxesWavesContext);
  const { simulationMode } = useSelector(({ lab }) => lab);

  const {
    sunToCloud,
    cloudToAtmosphere,
    cloudToGround,
    groundToAtmosphere,
  } = sunEnergies;

  const {
    sunToCloud: sunToCloudInitial,
    cloudToAtmosphere: cloudToAtmosphereInitial,
    cloudToGround: cloudToGroundInitial,
    groundToAtmosphere: groundToAtmosphereInitial,
  } = computeSunEnergies(
    INITIAL_ALBEDO.cloudAlbedo,
    INITIAL_ALBEDO.totalAlbedo,
    simulationMode,
  );

  return (
    <Group>
      <SunToCloudWave energy={sunToCloud} initial={sunToCloudInitial} />
      {!isMars && (
        <CloudToGroundWave
          energy={cloudToGround}
          initial={cloudToGroundInitial}
        />
      )}
      {!isMars && (
        <CloudToAtmosphereWave
          energy={cloudToAtmosphere}
          initial={cloudToAtmosphereInitial}
        />
      )}
      <GroundToAtmosphereWave
        energy={groundToAtmosphere}
        initial={groundToAtmosphereInitial}
      />
    </Group>
  );
};

SunWaves.propTypes = {
  sunEnergies: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default SunWaves;
