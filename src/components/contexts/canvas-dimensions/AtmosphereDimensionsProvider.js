import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import {
  ATMOSPHERE,
  SUN_CENTER_X,
  SUN_RADIUS,
  SUN_RAYS_RADIUS,
} from '../../../config/constants';

export const AtmosphereDimensionsContext = createContext();

const AtmosphereDimensionsProvider = ({
  children,
  stageHeight,
  stageWidth,
}) => {
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

  // sun dimensions/starting points
  const sunRaysOuterRadius = atmosphereHeight * SUN_RAYS_RADIUS;
  const sunRaysInnerRadius = sunRaysOuterRadius / 2;
  const sunRadius = atmosphereHeight * SUN_RADIUS;
  const sunCenterX = atmosphereWidth * SUN_CENTER_X;
  const sunCenterY = atmosphereHeight / 2;

  return (
    <AtmosphereDimensionsContext.Provider
      value={{
        atmosphereHeight,
        atmosphereWidth,
        atmosphereBeginsX,
        atmosphereBeginsY,
        sunRaysOuterRadius,
        sunRaysInnerRadius,
        sunRadius,
        sunCenterX,
        sunCenterY,
      }}
    >
      {children}
    </AtmosphereDimensionsContext.Provider>
  );
};

AtmosphereDimensionsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  stageHeight: PropTypes.number.isRequired,
  stageWidth: PropTypes.number.isRequired,
};

export default AtmosphereDimensionsProvider;
