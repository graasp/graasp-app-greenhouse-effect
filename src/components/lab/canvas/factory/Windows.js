import React from 'react';
import PropTypes from 'prop-types';
import { Group } from 'react-konva';
import {
  FACTORY_WINDOW_BEGINS_X,
  FACTORY_WINDOW_BEGINS_Y,
  FACTORY_WINDOW_LENGTH,
  FACTORY_WINDOW_WIDTH,
  X_DISTANCE_BETWEEN_FACTORY_WINDOWS,
} from '../../../../config/constants';
import Window from './Window';

const Windows = ({ x, y, buildingWidth, buildingHeight }) => {
  const windowWidth = FACTORY_WINDOW_WIDTH * buildingWidth;
  const windowHeight = FACTORY_WINDOW_LENGTH * buildingHeight;

  // first window coordinates
  const firstWindowX = x + FACTORY_WINDOW_BEGINS_X * buildingWidth;
  const firstWindowY = y - FACTORY_WINDOW_BEGINS_Y * buildingHeight;

  // second window coordinates
  const secondWindowX =
    x +
    FACTORY_WINDOW_BEGINS_X * buildingWidth +
    windowWidth +
    X_DISTANCE_BETWEEN_FACTORY_WINDOWS * buildingWidth;
  const secondWindowY = firstWindowY;

  return (
    <Group>
      <Window
        x={firstWindowX}
        y={firstWindowY}
        windowWidth={windowWidth}
        windowHeight={windowHeight}
      />
      <Window
        x={secondWindowX}
        y={secondWindowY}
        windowWidth={windowWidth}
        windowHeight={windowHeight}
      />
    </Group>
  );
};

Windows.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  buildingWidth: PropTypes.number.isRequired,
  buildingHeight: PropTypes.number.isRequired,
};

export default Windows;
