import React, { useContext } from 'react';
import { Line, Group } from 'react-konva';
import { useSelector } from 'react-redux';
import {
  ROAD_BEGINS_X,
  ROAD_BEGINS_Y,
  ROAD_FILL,
  ROAD_HEIGHT,
  ROAD_INDENT,
  ROAD_LINE_COLOR,
  ROAD_LINE_DASH,
} from '../../../../../constants';
import Truck from './Truck';
import { GroundDimensionsContext } from '../../../../contexts/canvas-dimensions/GroundDimensionsProvider';
import { generateRoadPoints } from '../../../../../utils';

const Road = () => {
  const {
    groundHeight,
    groundWidth,
    groundBeginsX,
    groundBeginsY,
  } = useContext(GroundDimensionsContext);
  const { width: stageWidth } = useSelector(
    ({ layout }) => layout.lab.stageDimensions,
  );

  const roadBeginsX = groundBeginsX + ROAD_BEGINS_X * groundWidth;
  const roadBeginsY = groundBeginsY + ROAD_BEGINS_Y * groundHeight;
  const roadHeight = ROAD_HEIGHT * groundHeight;
  const roadWidth = groundWidth - (roadBeginsX - groundBeginsX);
  const roadIndent = ROAD_INDENT * stageWidth;

  // lineBeginsY is stated relative to roadBeginsY given that they are grouped and group is positioned
  // lineBeginsY = roadHeight / 2 => begin line in the middle of the road
  const lineBeginsY = roadHeight / 2;
  const lineWidth = roadWidth;

  return (
    <Group x={roadBeginsX} y={roadBeginsY}>
      <Line
        x={0}
        y={0}
        points={generateRoadPoints(roadWidth, roadHeight, roadIndent)}
        closed
        fill={ROAD_FILL}
      />
      <Line
        x={roadIndent}
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
