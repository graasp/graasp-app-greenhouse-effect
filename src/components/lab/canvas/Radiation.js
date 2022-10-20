import React from 'react';
import PropTypes from 'prop-types';
import { Group } from 'react-konva';
import { useSelector } from 'react-redux';
import { RADIATION_MODES } from '../../../config/constants';
import Fluxes from './fluxes/Fluxes';
import Waves from './waves/Waves';
import FluxesWavesProvider from '../../contexts/fluxes-waves/FluxesWavesProvider';

const Radiation = ({ temperature, greenhouseEffect, cursorBecomesDefault }) => {
  const { radiationMode } = useSelector(({ lab }) => lab);

  return (
    <FluxesWavesProvider>
      <Group onMouseEnter={cursorBecomesDefault}>
        {radiationMode === RADIATION_MODES.FLUXES && (
          <Fluxes
            temperature={temperature}
            greenhouseEffect={greenhouseEffect}
          />
        )}
        {radiationMode === RADIATION_MODES.WAVES && (
          <Waves greenhouseEffect={greenhouseEffect} />
        )}
      </Group>
    </FluxesWavesProvider>
  );
};

Radiation.propTypes = {
  temperature: PropTypes.number.isRequired,
  greenhouseEffect: PropTypes.number.isRequired,
  cursorBecomesDefault: PropTypes.func.isRequired,
};

export default Radiation;
