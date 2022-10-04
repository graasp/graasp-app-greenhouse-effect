import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Group } from 'react-konva';
import Atmosphere from './Atmosphere';
import Ground from './Ground';
import Sea from './Sea';
import Sky from './Sky';
import { SIMULATION_MODES } from '../../../config/constants';

const CanvasLayout = ({ cursorBecomesDefault, cursorBecomesZoomIn }) => {
  const { height: stageHeight, width: stageWidth } = useSelector(
    ({ layout }) => layout.lab.stageDimensions,
  );
  const { simulationMode } = useSelector(({ lab }) => lab);
  const isEarth =
    simulationMode !== SIMULATION_MODES.MARS.name &&
    simulationMode !== SIMULATION_MODES.VENUS.name;

  return (
    <Group>
      <Atmosphere
        stageHeight={stageHeight}
        stageWidth={stageWidth}
        cursorBecomesDefault={cursorBecomesDefault}
      />
      <Sky
        stageHeight={stageHeight}
        stageWidth={stageWidth}
        cursorBecomesZoomIn={cursorBecomesZoomIn}
        cursorBecomesDefault={cursorBecomesDefault}
      />
      <Ground
        stageHeight={stageHeight}
        stageWidth={stageWidth}
        cursorBecomesDefault={cursorBecomesDefault}
        isEarth={isEarth}
      />
      {isEarth && (
        <Sea
          stageHeight={stageHeight}
          stageWidth={stageWidth}
          cursorBecomesDefault={cursorBecomesDefault}
        />
      )}
    </Group>
  );
};

CanvasLayout.propTypes = {
  cursorBecomesDefault: PropTypes.func.isRequired,
  cursorBecomesZoomIn: PropTypes.func.isRequired,
};

export default CanvasLayout;
