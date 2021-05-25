import React from 'react';
import PropTypes from 'prop-types';
import { Group } from 'react-konva';
import Sun from './atmosphere/Sun';
import AtmosphereBackground from './atmosphere/AtmosphereBackground';
import { ATMOSPHERE } from '../../../config/constants';

const Atmosphere = ({ stageHeight, stageWidth }) => {
  // atmosphere dimensions in /constants.js are stated as a percentage of canvas dimensions
  const {
    height: atmosphereHeightPercentage,
    width: atmosphereWidthPercentage,
  } = ATMOSPHERE;

  // pixel dimensions of atmosphere
  const atmosphereHeight = stageHeight * atmosphereHeightPercentage;
  const atmosphereWidth = stageWidth * atmosphereWidthPercentage;

  // atmosphere begins at top left of canvas
  const atmosphereBeginsX = 0;
  const atmosphereBeginsY = 0;

  return (
    <Group>
      <AtmosphereBackground
        atmosphereWidth={atmosphereWidth}
        atmosphereHeight={atmosphereHeight}
        atmosphereBeginsX={atmosphereBeginsX}
        atmosphereBeginsY={atmosphereBeginsY}
      />
      <Sun
        atmosphereWidth={atmosphereWidth}
        atmosphereHeight={atmosphereHeight}
      />
    </Group>
  );
};

Atmosphere.propTypes = {
  stageHeight: PropTypes.number.isRequired,
  stageWidth: PropTypes.number.isRequired,
};

export default Atmosphere;
