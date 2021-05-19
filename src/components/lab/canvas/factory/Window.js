import React from 'react';
import PropTypes from 'prop-types';
import { Rect, Line, Group } from 'react-konva';
import {
  FACTORY_WINDOW_FILL,
  WINDOW_LINES_COLOR,
  WINDOW_LINES_WIDTH,
} from '../../../../config/constants';

const Window = ({ x, y, windowWidth, windowHeight }) => {
  return (
    <Group>
      <Rect
        x={x}
        y={y}
        width={windowWidth}
        height={windowHeight}
        fill={FACTORY_WINDOW_FILL}
      />
      <Line
        x={x + windowWidth / 2}
        y={y}
        points={[0, 0, 0, windowHeight]}
        stroke={WINDOW_LINES_COLOR}
        strokeWidth={WINDOW_LINES_WIDTH}
      />
      <Line
        x={x}
        y={y + windowHeight / 2}
        points={[0, 0, windowWidth, 0]}
        stroke={WINDOW_LINES_COLOR}
        strokeWidth={WINDOW_LINES_WIDTH}
      />
    </Group>
  );
};

Window.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  windowWidth: PropTypes.number.isRequired,
  windowHeight: PropTypes.number.isRequired,
};

export default Window;
