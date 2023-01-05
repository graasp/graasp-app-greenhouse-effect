import React, { useContext } from 'react';
import { Rect, Line, Group } from 'react-konva';
import {
  ROAD_BEGINS_X,
  ROAD_BEGINS_Y,
  ROAD_FILL,
  ROAD_HEIGHT,
  ROAD_LINE_COLOR,
  ROAD_LINE_DASH,
} from '../../../../../constants';
import Truck from './Truck';
import { GroundDimensionsContext } from '../../../../contexts/canvas-dimensions/GroundDimensionsProvider';

const Road = () => {
  const {
    groundHeight,
    groundWidth,
    groundBeginsX,
    groundBeginsY,
  } = useContext(GroundDimensionsContext);

  const roadBeginsX = groundBeginsX + ROAD_BEGINS_X * groundWidth;
  const roadBeginsY = groundBeginsY + ROAD_BEGINS_Y * groundHeight;
  const roadHeight = ROAD_HEIGHT * groundHeight;
  const roadWidth = groundWidth - (roadBeginsX - groundBeginsX);

  // lineBeginsY is stated relative to roadBeginsY given that they are grouped and group is positioned
  // lineBeginsY = roadHeight / 2 => begin line in the middle of the road
  const lineBeginsY = roadHeight / 2;
  const lineWidth = roadWidth;

  return (
    <Group x={roadBeginsX} y={roadBeginsY}>
      <Rect
        x={0}
        y={0}
        height={roadHeight}
        width={roadWidth}
        fill={ROAD_FILL}
      />
      <Line
        x={0}
        y={lineBeginsY}
        stroke={ROAD_LINE_COLOR}
        points={[0, 0, lineWidth, 0]}
        dash={ROAD_LINE_DASH}
      />
      <Truck
        roadHeight={roadHeight}
        roadWidth={roadWidth}
        roadBeginsX={roadBeginsX}
        roadBeginsY={roadBeginsY}
      />
    </Group>
  );
};

export default Road;
