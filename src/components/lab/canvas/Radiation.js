import React from 'react';
import PropTypes from 'prop-types';
import { Group } from 'react-konva';
import { useSelector } from 'react-redux';
import { RADIATION_MODES } from '../../../constants';
import Fluxes from './fluxes/Fluxes';
import Waves from './waves/Waves';
import FluxesWavesProvider from '../../contexts/fluxes-waves/FluxesWavesProvider';

const Radiation = ({ cursorBecomesDefault }) => {
  const { radiationMode } = useSelector(({ lab }) => lab);

  return (
    <FluxesWavesProvider>
      <Group onMouseEnter={cursorBecomesDefault}>
        {radiationMode === RADIATION_MODES.FLUXES && <Fluxes />}
        {radiationMode === RADIATION_MODES.WAVES && <Waves />}
      </Group>
    </FluxesWavesProvider>
  );
};

Radiation.propTypes = {
  cursorBecomesDefault: PropTypes.func.isRequired,
};

export default Radiation;
