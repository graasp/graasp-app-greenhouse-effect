import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Group } from 'react-konva';
import GroundBackground from './ground/GroundBackground';
import Road from './ground/road/Road';
import HouseRow from './ground/houses/HouseRow';
import FactoryRow from './ground/factories/FactoryRow';
import MountainRange from './ground/mountains/MountainRange';
import Permafrost from './ground/permafrost/Permafrost';
import { GroundDimensionsContext } from '../../contexts/canvas-dimensions/GroundDimensionsProvider';
import { SIMULATION_MODES } from '../../../constants';
import Trees from './ground/trees/Trees';

const Ground = ({ cursorBecomesDefault }) => {
  const { isEarth, isIceAge } = useContext(GroundDimensionsContext);
  const { simulationMode } = useSelector(({ lab }) => lab);
  const isToday = simulationMode === SIMULATION_MODES.TODAY.name;

  return (
    <Group onMouseEnter={cursorBecomesDefault}>
      {isEarth && <Permafrost />}
      {isEarth && <MountainRange />}
      <GroundBackground />
      {!isIceAge && isToday && <Road />}
      {!isIceAge && isToday && <FactoryRow />}
      {!isIceAge && isEarth && <HouseRow />}
      <Trees />
    </Group>
  );
};

Ground.propTypes = {
  cursorBecomesDefault: PropTypes.func.isRequired,
};

export default Ground;
