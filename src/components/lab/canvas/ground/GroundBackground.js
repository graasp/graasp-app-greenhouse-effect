import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Rect, Shape, Group } from 'react-konva';
import {
  GROUND,
  ICE_CAP_FILL,
  SIMULATION_MODES,
} from '../../../../config/constants';
import { computeIcePercentage } from '../../../../utils/canvas';
import { GroundDimensionsContext } from '../../../contexts/canvas-dimensions/GroundDimensionsProvider';
import { SeaDimensionsContext } from '../../../contexts/canvas-dimensions/SeaDimensionsProvider';

const GroundBackground = () => {
  const {
    groundHeight,
    groundWidth,
    groundBeginsX,
    groundBeginsY,
  } = useContext(GroundDimensionsContext);
  const { seaIndent } = useContext(SeaDimensionsContext);

  const { isPaused, simulationMode } = useSelector(({ lab }) => lab);
  const { iceCover } = useSelector(({ lab }) => lab);
  const {
    colorRange: allColorRanges,
    colorRangePaused: allPausedColorRanges,
  } = GROUND;
  const icePercentage = computeIcePercentage(iceCover / 100);

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
    <Group>
      <Rect
        x={groundBeginsX}
        y={groundBeginsY}
        height={groundHeight}
        width={groundWidth}
        fillLinearGradientStartPoint={{
          x: 0,
          y: 0,
        }}
        fillLinearGradientEndPoint={{ x: 0, y: groundHeight }}
        fillLinearGradientColorStops={isPaused ? colorRangePaused : colorRange}
      />
      {icePercentage > 0 && (
        <Shape
          sceneFunc={(context, shape) => {
            const width = groundWidth * icePercentage;

            context.beginPath();
            context.moveTo(0, 0);
            context.lineTo(0, groundHeight);
            context.lineTo(width + seaIndent, groundHeight);
            // snow curves
            context.bezierCurveTo(
              width - 10,
              groundHeight * 0.8,
              width + 90,
              groundHeight * 0.4,
              width,
              0,
            );

            context.closePath();

            // (!) Konva specific method, it is very important
            context.fillStrokeShape(shape);
          }}
          x={groundBeginsX}
          y={groundBeginsY}
          fill={ICE_CAP_FILL}
        />
      )}
    </Group>
  );
};

export default GroundBackground;
