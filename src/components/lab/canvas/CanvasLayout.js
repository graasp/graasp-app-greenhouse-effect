import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Group } from 'react-konva';
import Atmosphere from './Atmosphere';
import Ground from './Ground';
import Sea from './Sea';
import Sky from './Sky';
import { SIMULATION_MODES } from '../../../config/constants';
import CanvasDimensionsProvider from '../../contexts/canvas-dimensions/CanvasDimensionsProvider';
import {
  computeAlbedo,
  computeCurrentTemperature,
  computeGreenhouseEffect,
} from '../../../utils/greenhouseEffect';
import Radiation from './Radiation';

const CanvasLayout = ({ cursorBecomesDefault, cursorBecomesZoomIn }) => {
  const {
    simulationMode,
    greenhouseGasesValues,
    albedo: albedoValues,
  } = useSelector(({ lab }) => lab);
  const isEarth =
    simulationMode !== SIMULATION_MODES.MARS.name &&
    simulationMode !== SIMULATION_MODES.VENUS.name;

  const { albedo } = computeAlbedo({ ...albedoValues, simulationMode });

  const greenhouseEffect = computeGreenhouseEffect({
    ...greenhouseGasesValues,
    simulationMode,
  });

  const temperature = computeCurrentTemperature({
    greenhouseEffect,
    albedo,
    simulationMode,
  });

  return (
    <Group>
      <CanvasDimensionsProvider>
        <Atmosphere cursorBecomesDefault={cursorBecomesDefault} />
        <Sky
          cursorBecomesZoomIn={cursorBecomesZoomIn}
          cursorBecomesDefault={cursorBecomesDefault}
          temperature={temperature}
        />
        <Radiation
          temperature={temperature}
          greenhouseEffect={greenhouseEffect}
          cursorBecomesDefault={cursorBecomesDefault}
        />
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
