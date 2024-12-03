import React from 'react';
import PropTypes from 'prop-types';
import { Rect, Line, Group } from 'react-konva';
import {
  FACTORY_WINDOW_FILL,
  WINDOW_LINES_COLOR,
  WINDOW_LINES_WIDTH,
} from '../../../../../constants';

const Window = ({ windowWidth, windowHeight, windowX, windowY }) => {
  return (
    <Group>
      <Rect
        x={windowX}
        y={windowY}
        width={windowWidth}
        height={windowHeight}
        fill={FACTORY_WINDOW_FILL}
      />
      {/* Line from top to bottom */}
      <Line
        x={windowX + windowWidth / 2}
        y={windowY}
        points={[0, 0, 0, windowHeight]}
        stroke={WINDOW_LINES_COLOR}
        strokeWidth={WINDOW_LINES_WIDTH}
      />
      {/* Line from left to right */}
      <Line
        x={windowX}
        y={windowY + windowHeight / 2}
        points={[0, 0, windowWidth, 0]}
        stroke={WINDOW_LINES_COLOR}
        strokeWidth={WINDOW_LINES_WIDTH}
      />
    </Group>
  );
};

Window.propTypes = {
  windowWidth: PropTypes.number.isRequired,
  windowHeight: PropTypes.number.isRequired,
  windowX: PropTypes.number.isRequired,
  windowY: PropTypes.number.isRequired,
};

export default Window;
