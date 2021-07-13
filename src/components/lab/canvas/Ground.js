import React from 'react';
import PropTypes from 'prop-types';
import { Group } from 'react-konva';
import { ATMOSPHERE, SKY, SEA, GROUND } from '../../../config/constants';
import GroundBackground from './ground/GroundBackground';
import Road from './ground/road/Road';
import HouseRow from './ground/houses/HouseRow';
import FactoryRow from './ground/factories/FactoryRow';
import MountainRange from './ground/mountains/MountainRange';
import Permafrost from './ground/permafrost/Permafrost';

const Ground = ({ stageHeight, stageWidth }) => {
  // ground dimensions in /constants.js are stated as a percentage of canvas dimensions
  const {
    height: groundHeightPercentage,
    width: groundWidthPercentage,
  } = GROUND;

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
  const groundBeginsX = seaWidth;
  const groundBeginsY = atmosphereAndSkyHeight;

  return (
    <Group
      onMouseEnter={(event) => {
        const container = event.target.getStage().container();
        container.style.cursor = 'default';
      }}
    >
      <Permafrost
        groundHeight={groundHeight}
        groundWidth={groundWidth}
        groundBeginsX={groundBeginsX}
        groundBeginsY={groundBeginsY}
      />
      <MountainRange
        groundHeight={groundHeight}
        groundWidth={groundWidth}
        groundBeginsY={groundBeginsY}
        stageWidth={stageWidth}
      />
      <GroundBackground
        groundHeight={groundHeight}
        groundWidth={groundWidth}
        groundBeginsX={groundBeginsX}
        groundBeginsY={groundBeginsY}
      />
      <Road
        groundHeight={groundHeight}
        groundWidth={groundWidth}
        groundBeginsX={groundBeginsX}
        groundBeginsY={groundBeginsY}
      />
      <FactoryRow
        groundHeight={groundHeight}
        groundWidth={groundWidth}
        groundBeginsX={groundBeginsX}
        groundBeginsY={groundBeginsY}
      />
      <HouseRow
        groundHeight={groundHeight}
        groundWidth={groundWidth}
        groundBeginsX={groundBeginsX}
        groundBeginsY={groundBeginsY}
      />
    </Group>
  );
};

Ground.propTypes = {
  stageHeight: PropTypes.number.isRequired,
  stageWidth: PropTypes.number.isRequired,
};

export default Ground;
