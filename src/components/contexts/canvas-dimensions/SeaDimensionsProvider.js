import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import {
  ATMOSPHERE,
  ICE_CAP_BASE,
  ICE_CAP_HEIGHT,
  ICE_CAP_ROWS_BEGIN,
  SEA,
  SKY,
  X_DISTANCE_BETWEEN_ICE_CAPS,
  Y_DISTANCE_BETWEEN_ICE_CAPS,
} from '../../../config/constants';

export const SeaDimensionsContext = createContext();

const SeaDimensionsProvider = ({ children, stageHeight, stageWidth }) => {
  // sea dimensions in /constants.js are stated as a percentage of canvas dimensions
  const {
    height: seaHeightPercentage,
    width: seaWidthPercentage,
    indent: seaIndentPercentage,
  } = SEA;

  // pixel dimensions of sea
  const seaWidth = stageWidth * seaWidthPercentage;
  const seaHeight = stageHeight * seaHeightPercentage;
  // 'seaIndent' = to make the see slanted
  const seaIndent = stageWidth * seaIndentPercentage;

  // dimensions of atmosphere and sky required to position sea
  const { height: atmosphereHeightPercentage } = ATMOSPHERE;
  const { height: skyHeightPercentage } = SKY;
  const atmosphereHeight = stageHeight * atmosphereHeightPercentage;
  const skyHeight = stageHeight * skyHeightPercentage;
  const atmosphereAndSkyHeight = atmosphereHeight + skyHeight;
  const seaBeginsX = 0;
  const seaBeginsY = atmosphereAndSkyHeight;

  //
  // ice cap dimensions
  const iceCapBaseWidth = seaWidth * ICE_CAP_BASE;
  const iceCapHeight = seaHeight * ICE_CAP_HEIGHT;

  // horizontal and vertical spacing between ice caps within a row
  const xDistanceBetweenIceCaps = X_DISTANCE_BETWEEN_ICE_CAPS * seaWidth;
  const yDistanceBetweenIceCaps = Y_DISTANCE_BETWEEN_ICE_CAPS * seaHeight;

  const firstIceCapRowBegins = ICE_CAP_ROWS_BEGIN[0];
  const firstIceCapRowBeginsX = firstIceCapRowBegins.x * seaWidth;
  const firstIceCapRowBeginsY = seaBeginsY + firstIceCapRowBegins.y * seaHeight;

  return (
    <SeaDimensionsContext.Provider
      value={{
        seaWidth,
        seaHeight,
        seaIndent,
        seaBeginsX,
        seaBeginsY,
        iceCapBaseWidth,
        iceCapHeight,
        xDistanceBetweenIceCaps,
        yDistanceBetweenIceCaps,
        firstIceCapRowBeginsX,
        firstIceCapRowBeginsY,
      }}
    >
      {children}
    </SeaDimensionsContext.Provider>
  );
};

SeaDimensionsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  stageHeight: PropTypes.number.isRequired,
  stageWidth: PropTypes.number.isRequired,
};

export default SeaDimensionsProvider;
