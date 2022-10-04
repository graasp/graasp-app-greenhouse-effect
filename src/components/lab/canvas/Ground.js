import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Group } from 'react-konva';
import {
  ATMOSPHERE,
  SKY,
  SEA,
  GROUND,
  SIMULATION_MODES,
} from '../../../config/constants';
import GroundBackground from './ground/GroundBackground';
import Road from './ground/road/Road';
import HouseRow from './ground/houses/HouseRow';
import FactoryRow from './ground/factories/FactoryRow';
import MountainRange from './ground/mountains/MountainRange';
import Permafrost from './ground/permafrost/Permafrost';

const Ground = ({ isEarth, stageHeight, stageWidth, cursorBecomesDefault }) => {
  // ground dimensions in /constants.js are stated as a percentage of canvas dimensions
  const { height: groundHeightPercentage, width } = GROUND;
  const { earth, nonEarth } = width;
  const groundWidthPercentage = isEarth ? earth : nonEarth;
  const { simulationMode } = useSelector(({ lab }) => lab);
  const isIceAge = simulationMode === SIMULATION_MODES.ICE_AGE.name;

  // pixel dimensions of ground
  const groundHeight = stageHeight * groundHeightPercentage;
  const groundWidth = stageWidth * groundWidthPercentage;

  // dimensions of other canvas elements required to position ground
  const { height: atmosphereHeightPercentage } = ATMOSPHERE;
  const { height: skyHeightPercentage } = SKY;
  const { width: seaWidthPercentage } = SEA;
  const atmosphereHeight = stageHeight * atmosphereHeightPercentage;
  const skyHeight = stageHeight * skyHeightPercentage;
  const atmosphereAndSkyHeight = atmosphereHeight + skyHeight;
  const seaWidth = stageWidth * seaWidthPercentage;
  const groundBeginsX = isEarth ? seaWidth : 0;
  const groundBeginsY = atmosphereAndSkyHeight;

  return (
    <Group onMouseEnter={cursorBecomesDefault}>
      {isEarth && (
        <Permafrost
          groundHeight={groundHeight}
          groundWidth={groundWidth}
          groundBeginsX={groundBeginsX}
          groundBeginsY={groundBeginsY}
        />
      )}
      {isEarth && (
        <MountainRange
          groundHeight={groundHeight}
          groundWidth={groundWidth}
          groundBeginsY={groundBeginsY}
          stageWidth={stageWidth}
        />
      )}
      <GroundBackground
        stageWidth={stageWidth}
        groundHeight={groundHeight}
        groundWidth={groundWidth}
        groundBeginsX={groundBeginsX}
        groundBeginsY={groundBeginsY}
        isEarth={isEarth}
      />
      {!isIceAge && isEarth && (
        <Road
          groundHeight={groundHeight}
          groundWidth={groundWidth}
          groundBeginsX={groundBeginsX}
          groundBeginsY={groundBeginsY}
        />
      )}
      {!isIceAge && isEarth && (
        <FactoryRow
          groundHeight={groundHeight}
          groundWidth={groundWidth}
          groundBeginsX={groundBeginsX}
          groundBeginsY={groundBeginsY}
        />
      )}
      {!isIceAge && isEarth && (
        <HouseRow
          groundHeight={groundHeight}
          groundWidth={groundWidth}
          groundBeginsX={groundBeginsX}
          groundBeginsY={groundBeginsY}
        />
      )}
    </Group>
  );
};

Ground.propTypes = {
  stageHeight: PropTypes.number.isRequired,
  stageWidth: PropTypes.number.isRequired,
  cursorBecomesDefault: PropTypes.func.isRequired,
  isEarth: PropTypes.bool.isRequired,
};

export default Ground;
