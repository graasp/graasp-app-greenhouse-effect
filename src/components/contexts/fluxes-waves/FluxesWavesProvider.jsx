import React, { createContext, useContext } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { AtmosphereDimensionsContext } from '../canvas-dimensions/AtmosphereDimensionsProvider';
import { SkyDimensionsContext } from '../canvas-dimensions/SkyDimensionsProvider';
import { SeaDimensionsContext } from '../canvas-dimensions/SeaDimensionsProvider';
import { GroundDimensionsContext } from '../canvas-dimensions/GroundDimensionsProvider';
import {
  GROUND_TO_SKY_EARTH_FLUX_ADJUSTMENT,
  SIMULATION_MODES,
  SKY_TO_ATMOSPHERE_EARTH_FLUX_ADJUSTMENT,
  SKY_TO_GROUND_EARTH_FLUX_ADJUSTMENT,
  TOTAL_INTERVALS_TO_COMPLETE_FLUX,
  Y_SHIFT_PER_INTERVAL,
} from '../../../constants';

export const FluxesWavesContext = createContext();

const FluxesWavesProvider = ({ children }) => {
  const { width: stageWidth } = useSelector(
    ({ layout }) => layout.lab.stageDimensions,
  );
  const { simulationMode } = useSelector(({ lab }) => lab);
  const isMars = simulationMode === SIMULATION_MODES.MARS.name;
  const isVenus = simulationMode === SIMULATION_MODES.VENUS.name;

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
    iceCapHeight,
    iceCapBaseWidth,
    seaWidth,
  } = useContext(SeaDimensionsContext);
  const { groundBeginsY, fullMountainHeight } = useContext(
    GroundDimensionsContext,
  );
  const sunBottomY = sunCenterY + sunRaysOuterRadius;
  const cloudBottomY =
    firstCloudCentralCircleY + firstCloudCentralCircleRadiusY;

  const sunToCloud = {
    beginsX: sunCenterX,
    beginsY: sunBottomY,
    endsY: isMars
      ? groundBeginsY
      : firstCloudCentralCircleY - firstCloudCentralCircleRadiusY,
    height: isMars
      ? 0.75 * (groundBeginsY - sunBottomY)
      : firstCloudCentralCircleY - sunBottomY,
    startsAfterInterval: { flux: 0, wave: 0 },
  };

  const cloudToGround = {
    beginsX: sunCenterX,
    beginsY: cloudBottomY,
    endsY: groundBeginsY - iceCapHeight,
    height: skyBeginsY + skyHeight - cloudBottomY - 2 * iceCapHeight,
    startsAfterInterval: {
      flux: TOTAL_INTERVALS_TO_COMPLETE_FLUX,
      wave:
        Math.abs(sunToCloud.endsY - sunToCloud.beginsY) / Y_SHIFT_PER_INTERVAL,
    },
  };

  const cloudToAtmosphere = {
    beginsX: firstCloudCentralCircleX - firstCloudCentralCircleRadiusX,
    beginsY: firstCloudCentralCircleY,
    endsY: -20,
    height: firstCloudCentralCircleY - sunCenterY,
    startsAfterInterval: {
      flux: TOTAL_INTERVALS_TO_COMPLETE_FLUX,
      wave:
        Math.abs(sunToCloud.endsY - sunToCloud.beginsY) / Y_SHIFT_PER_INTERVAL,
    },
  };

  const groundToAtmosphere = {
    beginsX: firstIceCapRowBeginsX + iceCapBaseWidth * 2,
    beginsY: groundBeginsY,
    endsY: -35,
    height: skyHeight + iceCapHeight * 1.5,
    startsAfterInterval: {
      flux: isMars
        ? TOTAL_INTERVALS_TO_COMPLETE_FLUX
        : TOTAL_INTERVALS_TO_COMPLETE_FLUX * 2,
      wave: isMars
        ? cloudToGround.startsAfterInterval.wave
        : cloudToGround.startsAfterInterval.wave +
          Math.abs(cloudToGround.endsY - cloudToGround.beginsY) /
            Y_SHIFT_PER_INTERVAL,
    },
  };

  const groundToSky = {
    beginsX: GROUND_TO_SKY_EARTH_FLUX_ADJUSTMENT * (stageWidth - seaWidth),
    beginsY: groundBeginsY,
    endsY: isMars ? 0 : groundBeginsY - skyHeight / 2,
    height: isMars ? skyHeight + iceCapHeight * 1.5 : skyHeight / 2,
    startsAfterInterval: {
      flux: isMars
        ? TOTAL_INTERVALS_TO_COMPLETE_FLUX
        : TOTAL_INTERVALS_TO_COMPLETE_FLUX * 2,
      wave: isMars
        ? cloudToGround.startsAfterInterval.wave
        : groundToAtmosphere.startsAfterInterval.wave,
    },
    endsAfterInterval: {
      flux: TOTAL_INTERVALS_TO_COMPLETE_FLUX * 4,
      wave:
        cloudToGround.startsAfterInterval.wave +
        Math.abs(groundBeginsY - (groundBeginsY - skyHeight)) /
          Y_SHIFT_PER_INTERVAL,
    },
  };

  const skyToGround = {
    beginsX: SKY_TO_GROUND_EARTH_FLUX_ADJUSTMENT * (stageWidth - seaWidth),
    beginsY: cloudBottomY,
    endsY: groundBeginsY,
    height: isVenus
      ? groundBeginsY - cloudBottomY
      : groundBeginsY - fullMountainHeight - cloudBottomY,
    startsAfterInterval: {
      flux: TOTAL_INTERVALS_TO_COMPLETE_FLUX * 3,
      wave:
        groundToSky.startsAfterInterval.wave +
        Math.abs(groundToSky.endsY - groundToSky.beginsY) /
          Y_SHIFT_PER_INTERVAL,
    },
  };

  const skyToAtmosphere = {
    beginsX: SKY_TO_ATMOSPHERE_EARTH_FLUX_ADJUSTMENT * (stageWidth - seaWidth),
    beginsY: firstCloudCentralCircleY,
    endsY: -20,
    height: firstCloudCentralCircleY - sunCenterY,
    startsAfterInterval: {
      flux: TOTAL_INTERVALS_TO_COMPLETE_FLUX * 3,
      wave:
        groundToSky.startsAfterInterval.wave +
        Math.abs(groundToSky.endsY - groundToSky.beginsY) /
          Y_SHIFT_PER_INTERVAL,
    },
    endsAfterInterval: {
      flux: TOTAL_INTERVALS_TO_COMPLETE_FLUX * 4,
      wave:
        groundToSky.startsAfterInterval.wave +
        Math.abs(groundToSky.endsY - groundToSky.beginsY) /
          Y_SHIFT_PER_INTERVAL +
        Math.abs(-20 - firstCloudCentralCircleY) / Y_SHIFT_PER_INTERVAL,
    },
  };

  const netFlux = {
    beginsX:
      sunToCloud.beginsX + (skyToAtmosphere.beginsX - sunToCloud.beginsX) / 2,
    beginsY: skyBeginsY,
    startsAfterInterval: {
      flux: skyToAtmosphere.endsAfterInterval.flux - 1,
    },
  };

  return (
    <FluxesWavesContext.Provider
      value={{
        sunToCloud,
        cloudToGround,
        cloudToAtmosphere,
        groundToAtmosphere,
        groundToSky,
        skyToGround,
        skyToAtmosphere,
        netFlux,
        isMars,
        isVenus,
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
