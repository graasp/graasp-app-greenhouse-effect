import React from 'react';
import PropTypes from 'prop-types';
import { Group } from 'react-konva';
import {
  FACTORY_WINDOW_BEGINS_X,
  FACTORY_WINDOW_BEGINS_Y,
  FACTORY_WINDOW_LENGTH,
  FACTORY_WINDOW_WIDTH,
  X_DISTANCE_BETWEEN_FACTORY_WINDOWS,
} from '../../../../../constants';
import Window from './Window';

const Windows = ({
  buildingWidth,
  buildingHeight,
  windowsBeginX,
  windowsBeginY,
}) => {
  const windowWidth = FACTORY_WINDOW_WIDTH * buildingWidth;
  const windowHeight = FACTORY_WINDOW_LENGTH * buildingHeight;

  // first window coordinates
  const firstWindowX = windowsBeginX + FACTORY_WINDOW_BEGINS_X * buildingWidth;
  const firstWindowY = windowsBeginY - FACTORY_WINDOW_BEGINS_Y * buildingHeight;

  // second window coordinates
  const secondWindowX =
    windowsBeginX +
    FACTORY_WINDOW_BEGINS_X * buildingWidth +
    windowWidth +
    X_DISTANCE_BETWEEN_FACTORY_WINDOWS * buildingWidth;
  const secondWindowY = firstWindowY;

  return (
    <Group>
      <Window
        windowX={firstWindowX}
        windowY={firstWindowY}
        windowWidth={windowWidth}
        windowHeight={windowHeight}
      />
      <Window
        windowX={secondWindowX}
        windowY={secondWindowY}
        windowWidth={windowWidth}
        windowHeight={windowHeight}
      />
    </Group>
  );
};

Windows.propTypes = {
  windowsBeginX: PropTypes.number.isRequired,
  windowsBeginY: PropTypes.number.isRequired,
  buildingWidth: PropTypes.number.isRequired,
  buildingHeight: PropTypes.number.isRequired,
};

export default Windows;
