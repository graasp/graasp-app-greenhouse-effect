import React, { createContext } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  ATMOSPHERE,
  GROUND,
  SEA,
  SKY,
  FULL_MOUNTAIN_WIDTH,
  FULL_MOUNTAIN_HEIGHT,
  HALF_MOUNTAIN_WIDTH,
  HALF_MOUNTAIN_HEIGHT,
  FULL_MOUNTAIN_X_INDENT,
  MOUNTAINS_INDENT_Y,
  SIMULATION_MODES,
} from '../../../constants';

export const GroundDimensionsContext = createContext();

const GroundDimensionsProvider = ({ children, stageHeight, stageWidth }) => {
  const { simulationMode } = useSelector(({ lab }) => lab);
  const isEarth =
    simulationMode !== SIMULATION_MODES.MARS.name &&
    simulationMode !== SIMULATION_MODES.VENUS.name;
  const isIceAge = simulationMode === SIMULATION_MODES.ICE_AGE.name;

  // ground dimensions in /constants.js are stated as a percentage of canvas dimensions
  const { height: groundHeightPercentage, width } = GROUND;
  const { earth: earthWidth, nonEarth: nonEarthWidth } = width;
  const groundWidthPercentage = isEarth ? earthWidth : nonEarthWidth;

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

  // mountains
  const fullMountainWidth = FULL_MOUNTAIN_WIDTH * groundWidth;
  const fullMountainHeight = FULL_MOUNTAIN_HEIGHT * groundHeight;
  const halfMountainWidth = HALF_MOUNTAIN_WIDTH * groundWidth;
  const halfMountainHeight = HALF_MOUNTAIN_HEIGHT * groundHeight;
  const fullMountainBeginsX =
    stageWidth - halfMountainWidth - FULL_MOUNTAIN_X_INDENT * fullMountainWidth;
  const halfMountainBeginsX =
    fullMountainBeginsX + FULL_MOUNTAIN_X_INDENT * fullMountainWidth;
  const mountainsBeginY = groundBeginsY + MOUNTAINS_INDENT_Y * groundHeight;

  return (
    <GroundDimensionsContext.Provider
      value={{
        isEarth,
        isIceAge,
        groundHeight,
        groundWidth,
        groundBeginsX,
        groundBeginsY,
        fullMountainWidth,
        fullMountainHeight,
        halfMountainWidth,
        halfMountainHeight,
        fullMountainBeginsX,
        halfMountainBeginsX,
        mountainsBeginY,
      }}
    >
      {children}
    </GroundDimensionsContext.Provider>
  );
};

GroundDimensionsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  stageHeight: PropTypes.number.isRequired,
  stageWidth: PropTypes.number.isRequired,
};

export default GroundDimensionsProvider;
