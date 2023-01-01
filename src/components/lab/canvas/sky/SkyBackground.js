import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Rect } from 'react-konva';
import {
  SKY_COLOR_RANGES,
  SKY_PAUSED_COLOR_RANGES,
} from '../../../../config/constants';
import { setIsPaused, toggleZoom } from '../../../../actions';
import { SkyDimensionsContext } from '../../../contexts/canvas-dimensions/SkyDimensionsProvider';

const SkyBackground = () => {
  const dispatch = useDispatch();
  const { skyHeight, skyWidth, skyBeginsX, skyBeginsY } = useContext(
    SkyDimensionsContext,
  );
  const { isPaused, simulationMode } = useSelector(({ lab }) => lab);
  const colorRange = SKY_COLOR_RANGES[simulationMode];
  const colorRangePaused = SKY_PAUSED_COLOR_RANGES[simulationMode];

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
      fillLinearGradientColorStops={isPaused ? colorRangePaused : colorRange}
      onClick={() => {
        dispatch(setIsPaused(true));
        dispatch(toggleZoom(true));
      }}
    />
  );
};

export default SkyBackground;
