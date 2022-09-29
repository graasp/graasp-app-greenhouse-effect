import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Rect, Shape, Group } from 'react-konva';
import { GROUND, ICE_CAP_FILL, SEA } from '../../../../config/constants';
import { computeIcePercentage } from '../../../../utils/canvas';

const GroundBackground = ({
  stageWidth,
  groundHeight,
  groundWidth,
  groundBeginsX,
  groundBeginsY,
}) => {
  const isPaused = useSelector(({ lab }) => lab.isPaused);
  const { iceCover } = useSelector(({ lab }) => lab.albedo);
  const { colorRange, colorRangePaused } = GROUND;
  const icePercentage = computeIcePercentage(iceCover / 100);

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
            const { indent: seaIndentPercentage } = SEA;
            const seaIndent = stageWidth * seaIndentPercentage;

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

GroundBackground.propTypes = {
  groundHeight: PropTypes.number.isRequired,
  groundWidth: PropTypes.number.isRequired,
  groundBeginsX: PropTypes.number.isRequired,
  groundBeginsY: PropTypes.number.isRequired,
  stageWidth: PropTypes.number.isRequired,
};

export default GroundBackground;
