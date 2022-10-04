import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Rect } from 'react-konva';
import { SIMULATION_MODES, SKY } from '../../../../config/constants';
import { toggleZoom } from '../../../../actions';

const SkyBackground = ({ skyHeight, skyWidth, skyBeginsX, skyBeginsY }) => {
  const { isPaused, simulationMode } = useSelector(({ lab }) => lab);
  const {
    colorRange: allColorRanges,
    colorRangePaused: allPausedColorRanges,
  } = SKY;
  const dispatch = useDispatch();

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

SkyBackground.propTypes = {
  skyHeight: PropTypes.number.isRequired,
  skyWidth: PropTypes.number.isRequired,
  skyBeginsX: PropTypes.number.isRequired,
  skyBeginsY: PropTypes.number.isRequired,
};

export default SkyBackground;
