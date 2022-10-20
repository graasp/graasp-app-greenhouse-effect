import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Rect } from 'react-konva';
import { SIMULATION_MODES, SKY } from '../../../../config/constants';
import { toggleZoom } from '../../../../actions';
import { SkyDimensionsContext } from '../../../contexts/canvas-dimensions/SkyDimensionsProvider';

const SkyBackground = () => {
  const dispatch = useDispatch();
  const { skyHeight, skyWidth, skyBeginsX, skyBeginsY } = useContext(
    SkyDimensionsContext,
  );
  const { isPaused, simulationMode } = useSelector(({ lab }) => lab);
  const {
    colorRange: allColorRanges,
    colorRangePaused: allPausedColorRanges,
  } = SKY;

  let colorRange;
  if (simulationMode === SIMULATION_MODES.VENUS.name) {
    colorRange = allColorRanges.venus;
  } else if (simulationMode === SIMULATION_MODES.MARS.name) {
    colorRange = allColorRanges.mars;
  } else {
    colorRange = allColorRanges.earth;
  }

  let colorRangePaused;
  if (simulationMode === SIMULATION_MODES.VENUS.name) {
    colorRangePaused = allPausedColorRanges.venus;
  } else if (simulationMode === SIMULATION_MODES.MARS.name) {
    colorRangePaused = allPausedColorRanges.mars;
  } else {
    colorRangePaused = allPausedColorRanges.earth;
  }

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
        dispatch(toggleZoom(true));
      }}
    />
  );
};

export default SkyBackground;
