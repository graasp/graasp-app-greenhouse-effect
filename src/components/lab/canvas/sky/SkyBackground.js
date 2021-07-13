import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Rect } from 'react-konva';
import { SKY } from '../../../../config/constants';
import { toggleZoom } from '../../../../actions';

const SkyBackground = ({ skyHeight, skyWidth, skyBeginsX, skyBeginsY }) => {
  const { colorRange: skyColorRange } = SKY;
  const dispatch = useDispatch();

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
      onClick={() => {
        dispatch(toggleZoom(true));
      }}
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
