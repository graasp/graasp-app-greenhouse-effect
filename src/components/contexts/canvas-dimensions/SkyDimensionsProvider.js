import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
  ATMOSPHERE,
  CLOUD_CENTRAL_CIRCLE_RADIUS,
  CLOUD_COVER_PERCENTAGE_LIMIT,
  CLOUD_RESPONSIVE_ADJUSTMENT_FACTOR,
  FIRST_CLOUD_CENTRAL_CIRCLE_X,
  FIRST_CLOUD_CENTRAL_CIRCLE_Y,
  SECOND_CLOUD_CENTRAL_CIRCLE_X,
  SECOND_CLOUD_CENTRAL_CIRCLE_Y,
  SKY,
} from '../../../config/constants';

export const SkyDimensionsContext = createContext();

const SkyDimensionsProvider = ({ children, stageHeight, stageWidth }) => {
  const { temporaryCloudCover } = useSelector(({ lab }) => lab);

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

  // first cloud coordinates
  const firstCloudCentralCircleX = FIRST_CLOUD_CENTRAL_CIRCLE_X * skyWidth;
  const firstCloudCentralCircleY =
    skyBeginsY + FIRST_CLOUD_CENTRAL_CIRCLE_Y * skyHeight;

  // second cloud coordinates
  const secondCloudCentralCircleX = SECOND_CLOUD_CENTRAL_CIRCLE_X * skyWidth;
  const secondCloudCentralCircleY =
    skyBeginsY + SECOND_CLOUD_CENTRAL_CIRCLE_Y * skyHeight;

  // first cloud radiuses
  const firstCloudCentralCircleRadiusX =
    CLOUD_CENTRAL_CIRCLE_RADIUS *
    (skyHeight + skyWidth) *
    (temporaryCloudCover / 100);
  const firstCloudCentralCircleRadiusY =
    CLOUD_CENTRAL_CIRCLE_RADIUS *
    ((skyHeight + skyWidth) / CLOUD_RESPONSIVE_ADJUSTMENT_FACTOR) *
    (temporaryCloudCover / 100);

  // second cloud radiuses
  const modifiedCloudCover =
    temporaryCloudCover >= CLOUD_COVER_PERCENTAGE_LIMIT &&
    (temporaryCloudCover - CLOUD_COVER_PERCENTAGE_LIMIT) * 2;
  const secondCloudCentralCircleRadiusX =
    CLOUD_CENTRAL_CIRCLE_RADIUS *
    (skyHeight + skyWidth) *
    (modifiedCloudCover / 100);
  const secondCloudCentralCircleRadiusY =
    CLOUD_CENTRAL_CIRCLE_RADIUS *
    ((skyHeight + skyWidth) / CLOUD_RESPONSIVE_ADJUSTMENT_FACTOR) *
    (modifiedCloudCover / 100);

  return (
    <SkyDimensionsContext.Provider
      value={{
        skyHeight,
        skyWidth,
        skyBeginsX,
        skyBeginsY,
        firstCloudCentralCircleX,
        firstCloudCentralCircleY,
        secondCloudCentralCircleX,
        secondCloudCentralCircleY,
        firstCloudCentralCircleRadiusX,
        firstCloudCentralCircleRadiusY,
        secondCloudCentralCircleRadiusX,
        secondCloudCentralCircleRadiusY,
      }}
    >
      {children}
    </SkyDimensionsContext.Provider>
  );
};

SkyDimensionsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  stageHeight: PropTypes.number.isRequired,
  stageWidth: PropTypes.number.isRequired,
};

export default SkyDimensionsProvider;
