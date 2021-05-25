import React from 'react';
import PropTypes from 'prop-types';
import { Group } from 'react-konva';
import { ATMOSPHERE, SKY, SEA } from '../../../config/constants';
import IceCaps from './sea/ice-caps/IceCaps';
import SeaBackground from './sea/SeaBackground';

const Sea = ({ stageHeight, stageWidth }) => {
  // sea dimensions in /constants.js are stated as a percentage of canvas dimensions
  const { height: seaHeightPercentage, width: seaWidthPercentage } = SEA;

  // pixel dimensions of sea
  const seaWidth = stageWidth * seaWidthPercentage;
  const seaHeight = stageHeight * seaHeightPercentage;

  // dimensions of atmosphere and sky required to position sea
  const { height: atmosphereHeightPercentage } = ATMOSPHERE;
  const { height: skyHeightPercentage } = SKY;
  const atmosphereHeight = stageHeight * atmosphereHeightPercentage;
  const skyHeight = stageHeight * skyHeightPercentage;
  const atmosphereAndSkyHeight = atmosphereHeight + skyHeight;
  const seaBeginsX = 0;
  const seaBeginsY = atmosphereAndSkyHeight;

  return (
    <Group>
      <SeaBackground
        seaHeight={seaHeight}
        seaWidth={seaWidth}
        seaBeginsX={seaBeginsX}
        seaBeginsY={seaBeginsY}
      />
      <IceCaps
        seaHeight={seaHeight}
        seaWidth={seaWidth}
        seaBeginsY={seaBeginsY}
      />
    </Group>
  );
};

Sea.propTypes = {
  stageHeight: PropTypes.number.isRequired,
  stageWidth: PropTypes.number.isRequired,
};

export default Sea;
