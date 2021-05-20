import React from 'react';
import PropTypes from 'prop-types';
import { Rect, Line, Group } from 'react-konva';
import {
  ROAD_BEGINS_X,
  ROAD_BEGINS_Y,
  ROAD_FILL,
  ROAD_HEIGHT,
  ROAD_LINE_COLOR,
  ROAD_LINE_DASH,
} from '../../../config/constants';

const Road = ({ groundHeight, groundWidth, groundBeginsX, groundBeginsY }) => {
  const roadBeginsX = groundBeginsX + ROAD_BEGINS_X * groundWidth;
  const roadBeginsY = groundBeginsY + ROAD_BEGINS_Y * groundHeight;
  const roadHeight = ROAD_HEIGHT * groundHeight;
  const roadWidth = groundWidth;

  // lineBeginsY is stated relative to roadBeginsY given that they are grouped and group is positioned
  // lineBeginsY = roadHeight / 2 => begin line in the middle of the road
  const lineBeginsY = roadHeight / 2;
  const lineWidth = groundWidth;

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
    </Group>
  );
};

Road.propTypes = {
  groundHeight: PropTypes.number.isRequired,
  groundWidth: PropTypes.number.isRequired,
  groundBeginsX: PropTypes.number.isRequired,
  groundBeginsY: PropTypes.number.isRequired,
};

export default Road;
