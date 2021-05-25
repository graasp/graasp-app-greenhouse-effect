import React from 'react';
import PropTypes from 'prop-types';
import { Rect } from 'react-konva';
import { SKY } from '../../../../config/constants';

const SkyBackground = ({ skyHeight, skyWidth, skyBeginsX, skyBeginsY }) => {
  const { colorRange: skyColorRange } = SKY;

  return (
    <Rect
      x={skyBeginsX}
      y={skyBeginsY}
      height={skyHeight}
      width={skyWidth}
      fillLinearGradientStartPoint={{ x: 0, y: 0 }}
      fillLinearGradientEndPoint={{
        x: 0,
        y: skyHeight,
      }}
      fillLinearGradientColorStops={skyColorRange}
    />
  );
};

SkyBackground.propTypes = {
  skyHeight: PropTypes.number.isRequired,
  skyWidth: PropTypes.number.isRequired,
  skyBeginsX: PropTypes.number.isRequired,
  skyBeginsY: PropTypes.number.isRequired,
};

export default SkyBackground;
