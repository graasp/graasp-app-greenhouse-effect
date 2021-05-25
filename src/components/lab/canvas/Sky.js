import React from 'react';
import PropTypes from 'prop-types';
import { Group } from 'react-konva';
import { ATMOSPHERE, SKY } from '../../../config/constants';
import Cloud from './sky/Cloud';
import SkyBackground from './sky/SkyBackground';

const Sky = ({ stageHeight, stageWidth }) => {
  // sky dimensions in /constants.js are stated as a percentage of canvas dimensions
  const { height: skyHeightPercentage, width: skyWidthPercentage } = SKY;

  // pixel dimensions of sky
  const skyHeight = stageHeight * skyHeightPercentage;
  const skyWidth = stageWidth * skyWidthPercentage;

  // atmosphere height is required to begin the sky where the atmosphere ends
  const { height: atmosphereHeightPercentage } = ATMOSPHERE;
  const atmosphereHeight = stageHeight * atmosphereHeightPercentage;
  const skyBeginsX = 0;
  const skyBeginsY = atmosphereHeight;

  return (
    <Group>
      <SkyBackground
        skyHeight={skyHeight}
        skyWidth={skyWidth}
        skyBeginsX={skyBeginsX}
        skyBeginsY={skyBeginsY}
      />
      <Cloud
        skyHeight={skyHeight}
        skyWidth={skyWidth}
        skyBeginsY={skyBeginsY}
      />
    </Group>
  );
};

Sky.propTypes = {
  stageHeight: PropTypes.number.isRequired,
  stageWidth: PropTypes.number.isRequired,
};

export default Sky;
