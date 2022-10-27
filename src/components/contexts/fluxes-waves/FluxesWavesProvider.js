import React, { createContext, useContext } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { AtmosphereDimensionsContext } from '../canvas-dimensions/AtmosphereDimensionsProvider';
import { SkyDimensionsContext } from '../canvas-dimensions/SkyDimensionsProvider';
import { SeaDimensionsContext } from '../canvas-dimensions/SeaDimensionsProvider';
import { GroundDimensionsContext } from '../canvas-dimensions/GroundDimensionsProvider';
import {
  GROUND_TO_SKY_EARTH_FLUX_ADJUSTMENT,
  SKY_TO_ATMOSPHERE_EARTH_FLUX_ADJUSTMENT,
  SKY_TO_GROUND_EARTH_FLUX_ADJUSTMENT,
  TOTAL_INTERVALS_TO_COMPLETE_FLUX,
  Y_SHIFT_PER_INTERVAL,
} from '../../../config/constants';

export const FluxesWavesContext = createContext();

const FluxesWavesProvider = ({ children }) => {
  const { width: stageWidth } = useSelector(
    ({ layout }) => layout.lab.stageDimensions,
  );

  // extract required dimensions from context objects
  const { sunRaysOuterRadius, sunCenterX, sunCenterY } = useContext(
    AtmosphereDimensionsContext,
  );
  const {
    firstCloudCentralCircleX,
    firstCloudCentralCircleY,
    firstCloudCentralCircleRadiusX,
    firstCloudCentralCircleRadiusY,
    skyBeginsY,
    skyHeight,
  } = useContext(SkyDimensionsContext);
  const {
    firstIceCapRowBeginsX,
    firstIceCapRowBeginsY,
    iceCapHeight,
    iceCapBaseWidth,
    seaWidth,
  } = useContext(SeaDimensionsContext);
  const { groundBeginsY, fullMountainHeight } = useContext(
    GroundDimensionsContext,
  );

  // calculate custom dimensions using variables extracted above
  const sunBottomY = sunCenterY + sunRaysOuterRadius;
  const cloudBottomY =
    firstCloudCentralCircleY + firstCloudCentralCircleRadiusY;

  // sun flux dimensions, positions, starting/ending intervals
  const sunToCloudFluxBeginsX = sunCenterX;
  const sunToCloudFluxBeginsY = sunBottomY;
  const sunToCloudFluxHeight = firstCloudCentralCircleY - sunBottomY;
  const sunToCloudFluxStartsAfterInterval = 0;
  const sunToCloudFluxReachesEnd = TOTAL_INTERVALS_TO_COMPLETE_FLUX;

  const cloudToGroundFluxBeginsX = sunCenterX;
  const cloudToGroundFluxBeginsY = cloudBottomY;
  const cloudToGroundFluxHeight = skyBeginsY + skyHeight - cloudBottomY;
  const cloudToGroundFluxStartsAfterInterval = sunToCloudFluxReachesEnd;
  const cloudToGroundFluxReachesEnd =
    sunToCloudFluxReachesEnd + TOTAL_INTERVALS_TO_COMPLETE_FLUX;

  const cloudToAtmosphereFluxBeginsX =
    firstCloudCentralCircleX - firstCloudCentralCircleRadiusX;
  const cloudToAtmosphereFluxBeginsY = firstCloudCentralCircleY;
  const cloudToAtmosphereFluxHeight = firstCloudCentralCircleY - sunBottomY;
  const cloudToAtmosphereFluxStartsAfterInterval = sunToCloudFluxReachesEnd;

  const groundToAtmosphereFluxBeginsX =
    firstIceCapRowBeginsX + iceCapBaseWidth / 2;
  const groundToAtmosphereFluxBeginsY = firstIceCapRowBeginsY - iceCapHeight;
  const groundToAtmosphereFluxHeight = skyHeight;
  const groundToAtmosphereFluxStartsAfterInterval = cloudToGroundFluxReachesEnd;

  // earth flux dimensions, positions, starting/ending intervals
  const groundToSkyFluxBeginsX =
    GROUND_TO_SKY_EARTH_FLUX_ADJUSTMENT * (stageWidth - seaWidth);
  const groundToSkyFluxBeginsY = groundBeginsY;
  const groundToSkyFluxHeight = skyHeight / 2;
  const groundToSkyFluxStartsAfterInterval = cloudToGroundFluxReachesEnd;
  const groundToSkyFluxReachesEnd =
    cloudToGroundFluxReachesEnd + TOTAL_INTERVALS_TO_COMPLETE_FLUX;

  const skyToGroundFluxBeginsX =
    SKY_TO_GROUND_EARTH_FLUX_ADJUSTMENT * (stageWidth - seaWidth);
  const skyToGroundFluxBeginsY = cloudBottomY;
  const skyToGroundFluxHeight =
    groundBeginsY - fullMountainHeight - cloudBottomY;
  const skyToGroundFluxStartsAfterInterval = groundToSkyFluxReachesEnd;

  const skyToAtmosphereFluxBeginsX =
    SKY_TO_ATMOSPHERE_EARTH_FLUX_ADJUSTMENT * (stageWidth - seaWidth);
  const skyToAtmosphereFluxBeginsY = firstCloudCentralCircleY;
  const skyToAtmosphereFluxHeight = firstCloudCentralCircleY - sunBottomY;
  const skyToAtmosphereFluxStartsAfterInterval = groundToSkyFluxReachesEnd;

  // sun wave dimensions, positions, starting/ending intervals
  const sunToCloudWaveBeginsX = sunCenterX;
  const sunToCloudWaveBeginsY = sunBottomY;
  const sunToCloudWaveEndsY =
    firstCloudCentralCircleY - firstCloudCentralCircleRadiusY;
  const sunToCloudWaveStartsAfterInterval = 0;
  const sunToCloudWaveReachesEnd =
    Math.abs(sunToCloudWaveEndsY - sunToCloudWaveBeginsY) /
    Y_SHIFT_PER_INTERVAL;

  const cloudToGroundWaveBeginsX = sunCenterX;
  const cloudToGroundWaveBeginsY = cloudBottomY;
  const cloudToGroundWaveEndsY = groundBeginsY;
  const cloudToGroundWaveStartsAfterInterval = sunToCloudWaveReachesEnd;
  const cloudToGroundWaveReachesEnd =
    sunToCloudWaveReachesEnd +
    Math.abs(cloudToGroundWaveEndsY - cloudToGroundWaveBeginsY) /
      Y_SHIFT_PER_INTERVAL;

  const cloudToAtmosphereWaveBeginsX =
    firstCloudCentralCircleX - firstCloudCentralCircleRadiusX;
  const cloudToAtmosphereWaveBeginsY = firstCloudCentralCircleY;
  const cloudToAtmosphereWaveEndsY = sunBottomY;
  const cloudToAtmosphereWaveStartsAfterInterval = sunToCloudWaveReachesEnd;

  const groundToAtmosphereWaveBeginsX =
    firstIceCapRowBeginsX + iceCapBaseWidth / 2;
  const groundToAtmosphereWaveBeginsY = firstIceCapRowBeginsY - iceCapHeight;
  const groundToAtmosphereWaveEndsY =
    firstIceCapRowBeginsY - iceCapHeight - skyHeight;
  const groundToAtmosphereWaveStartsAfterInterval = cloudToGroundWaveReachesEnd;

  // earth wave dimensions, positions, starting/ending intervals
  const groundToSkyWaveBeginsX =
    GROUND_TO_SKY_EARTH_FLUX_ADJUSTMENT * (stageWidth - seaWidth);
  const groundToSkyWaveBeginsY = groundBeginsY;
  const groundToSkyWaveEndsY = groundBeginsY - skyHeight / 2;
  const groundToSkyWaveStartsAfterInterval = cloudToGroundWaveReachesEnd;
  const groundToSkyWaveReachesEnd =
    cloudToGroundWaveReachesEnd +
    Math.abs(groundToSkyWaveEndsY - groundToSkyWaveBeginsY) /
      Y_SHIFT_PER_INTERVAL;

  const skyToGroundWaveBeginsX =
    SKY_TO_GROUND_EARTH_FLUX_ADJUSTMENT * (stageWidth - seaWidth);
  const skyToGroundWaveBeginsY = cloudBottomY;
  const skyToGroundWaveEndsY = groundBeginsY;
  const skyToGroundWaveStartsAfterInterval = groundToSkyWaveReachesEnd;

  const skyToAtmosphereWaveBeginsX =
    SKY_TO_ATMOSPHERE_EARTH_FLUX_ADJUSTMENT * (stageWidth - seaWidth);
  const skyToAtmosphereWaveBeginsY = firstCloudCentralCircleY;
  const skyToAtmosphereWaveEndsY = sunBottomY;
  const skyToAtmosphereWaveStartsAfterInterval = groundToSkyWaveReachesEnd;

  return (
    <FluxesWavesContext.Provider
      value={{
        sunToCloudFlux: {
          beginsX: sunToCloudFluxBeginsX,
          beginsY: sunToCloudFluxBeginsY,
          height: sunToCloudFluxHeight,
          startsAfterInterval: sunToCloudFluxStartsAfterInterval,
        },
        cloudToGroundFlux: {
          beginsX: cloudToGroundFluxBeginsX,
          beginsY: cloudToGroundFluxBeginsY,
          height: cloudToGroundFluxHeight,
          startsAfterInterval: cloudToGroundFluxStartsAfterInterval,
        },
        cloudToAtmosphereFlux: {
          beginsX: cloudToAtmosphereFluxBeginsX,
          beginsY: cloudToAtmosphereFluxBeginsY,
          height: cloudToAtmosphereFluxHeight,
          startsAfterInterval: cloudToAtmosphereFluxStartsAfterInterval,
        },
        groundToAtmosphereFlux: {
          beginsX: groundToAtmosphereFluxBeginsX,
          beginsY: groundToAtmosphereFluxBeginsY,
          height: groundToAtmosphereFluxHeight,
          startsAfterInterval: groundToAtmosphereFluxStartsAfterInterval,
        },
        groundToSkyFlux: {
          beginsX: groundToSkyFluxBeginsX,
          beginsY: groundToSkyFluxBeginsY,
          height: groundToSkyFluxHeight,
          startsAfterInterval: groundToSkyFluxStartsAfterInterval,
        },
        skyToGroundFlux: {
          beginsX: skyToGroundFluxBeginsX,
          beginsY: skyToGroundFluxBeginsY,
          height: skyToGroundFluxHeight,
          startsAfterInterval: skyToGroundFluxStartsAfterInterval,
        },
        skyToAtmosphereFlux: {
          beginsX: skyToAtmosphereFluxBeginsX,
          beginsY: skyToAtmosphereFluxBeginsY,
          height: skyToAtmosphereFluxHeight,
          startsAfterInterval: skyToAtmosphereFluxStartsAfterInterval,
        },
        sunToCloudWave: {
          beginsX: sunToCloudWaveBeginsX,
          beginsY: sunToCloudWaveBeginsY,
          endsY: sunToCloudWaveEndsY,
          startsAfterInterval: sunToCloudWaveStartsAfterInterval,
        },
        cloudToGroundWave: {
          beginsX: cloudToGroundWaveBeginsX,
          beginsY: cloudToGroundWaveBeginsY,
          endsY: cloudToGroundWaveEndsY,
          startsAfterInterval: cloudToGroundWaveStartsAfterInterval,
        },
        cloudToAtmosphereWave: {
          beginsX: cloudToAtmosphereWaveBeginsX,
          beginsY: cloudToAtmosphereWaveBeginsY,
          endsY: cloudToAtmosphereWaveEndsY,
          startsAfterInterval: cloudToAtmosphereWaveStartsAfterInterval,
        },
        groundToAtmosphereWave: {
          beginsX: groundToAtmosphereWaveBeginsX,
          beginsY: groundToAtmosphereWaveBeginsY,
          endsY: groundToAtmosphereWaveEndsY,
          startsAfterInterval: groundToAtmosphereWaveStartsAfterInterval,
        },
        groundToSkyWave: {
          beginsX: groundToSkyWaveBeginsX,
          beginsY: groundToSkyWaveBeginsY,
          endsY: groundToSkyWaveEndsY,
          startsAfterInterval: groundToSkyWaveStartsAfterInterval,
        },
        skyToGroundWave: {
          beginsX: skyToGroundWaveBeginsX,
          beginsY: skyToGroundWaveBeginsY,
          endsY: skyToGroundWaveEndsY,
          startsAfterInterval: skyToGroundWaveStartsAfterInterval,
        },
        skyToAtmosphereWave: {
          beginsX: skyToAtmosphereWaveBeginsX,
          beginsY: skyToAtmosphereWaveBeginsY,
          endsY: skyToAtmosphereWaveEndsY,
          startsAfterInterval: skyToAtmosphereWaveStartsAfterInterval,
        },
      }}
    >
      {children}
    </FluxesWavesContext.Provider>
  );
};

FluxesWavesProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default FluxesWavesProvider;