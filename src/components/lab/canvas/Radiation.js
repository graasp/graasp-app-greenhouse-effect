import React from 'react';
import PropTypes from 'prop-types';
import { Group } from 'react-konva';
import { useSelector } from 'react-redux';
import { RADIATION_MODES } from '../../../constants';
import Fluxes from './fluxes/Fluxes';
import Waves from './waves/Waves';
import FluxesWavesProvider from '../../contexts/fluxes-waves/FluxesWavesProvider';
import NetFlux from './fluxes/NetFlux';
import { computeEarthEnergies, computeSunEnergies } from '../../../utils';

const Radiation = ({ cursorBecomesDefault }) => {
  const {
    radiationMode,
    showNetFlux,
    sliders,
    simulationMode,
    thermometer,
  } = useSelector(({ lab }) => lab);
  const { temperature } = thermometer;
  const { albedo, greenhouseEffect } = sliders;
  const { totalAlbedo, cloudAlbedo } = albedo;

  const sunEnergies = computeSunEnergies(
    cloudAlbedo,
    totalAlbedo,
    simulationMode,
  );
  const earthEnergies = computeEarthEnergies(temperature, greenhouseEffect);

  return (
    <FluxesWavesProvider>
      <Group onMouseEnter={cursorBecomesDefault}>
        {radiationMode === RADIATION_MODES.FLUXES && (
          <Fluxes sunEnergies={sunEnergies} earthEnergies={earthEnergies} />
        )}
        {radiationMode === RADIATION_MODES.WAVES && (
          <Waves sunEnergies={sunEnergies} earthEnergies={earthEnergies} />
        )}
        {showNetFlux && (
          <NetFlux sunEnergies={sunEnergies} earthEnergies={earthEnergies} />
        )}
      </Group>
    </FluxesWavesProvider>
  );
};

Radiation.propTypes = {
  cursorBecomesDefault: PropTypes.func.isRequired,
};

export default Radiation;
