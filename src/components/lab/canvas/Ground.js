import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Group } from 'react-konva';
import GroundBackground from './ground/GroundBackground';
import Road from './ground/road/Road';
import HouseRow from './ground/houses/HouseRow';
import FactoryRow from './ground/factories/FactoryRow';
import MountainRange from './ground/mountains/MountainRange';
import Permafrost from './ground/permafrost/Permafrost';
import { GroundDimensionsContext } from '../../contexts/canvas-dimensions/GroundDimensionsProvider';

const Ground = ({ cursorBecomesDefault }) => {
  const { isEarth, isIceAge } = useContext(GroundDimensionsContext);

  return (
    <Group onMouseEnter={cursorBecomesDefault}>
      {isEarth && <Permafrost />}
      {isEarth && <MountainRange />}
      <GroundBackground />
      {!isIceAge && isEarth && <Road />}
      {!isIceAge && isEarth && <FactoryRow />}
      {!isIceAge && isEarth && <HouseRow />}
    </Group>
  );
};

Ground.propTypes = {
  cursorBecomesDefault: PropTypes.func.isRequired,
};

export default Ground;
