import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Group } from 'react-konva';
import Atmosphere from './Atmosphere';
import Ground from './Ground';
import Sea from './Sea';
import Sky from './Sky';
import { SIMULATION_MODES } from '../../../constants';
import CanvasDimensionsProvider from '../../contexts/canvas-dimensions/CanvasDimensionsProvider';
import Radiation from './Radiation';

const CanvasLayout = ({ cursorBecomesDefault, cursorBecomesZoomIn }) => {
  const { simulationMode } = useSelector(({ lab }) => lab);
  const isEarth =
    simulationMode !== SIMULATION_MODES.MARS.name &&
    simulationMode !== SIMULATION_MODES.VENUS.name;

  return (
    <Group>
      <CanvasDimensionsProvider>
        <Atmosphere cursorBecomesDefault={cursorBecomesDefault} />
        <Sky
          cursorBecomesZoomIn={cursorBecomesZoomIn}
          cursorBecomesDefault={cursorBecomesDefault}
        />
        <Radiation cursorBecomesDefault={cursorBecomesDefault} />
        <Ground cursorBecomesDefault={cursorBecomesDefault} />
        {isEarth && <Sea cursorBecomesDefault={cursorBecomesDefault} />}
      </CanvasDimensionsProvider>
    </Group>
  );
};

CanvasLayout.propTypes = {
  cursorBecomesDefault: PropTypes.func.isRequired,
  cursorBecomesZoomIn: PropTypes.func.isRequired,
};

export default CanvasLayout;
