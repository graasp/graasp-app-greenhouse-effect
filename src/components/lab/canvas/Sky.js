import React from 'react';
import PropTypes from 'prop-types';
import { Group } from 'react-konva';
import { ATMOSPHERE, SKY } from '../../../config/constants';
import Cloud from './sky/cloud/Cloud';
import SkyBackground from './sky/SkyBackground';
import Thermometer from './sky/thermometer/Thermometer';

const Sky = ({
  stageHeight,
  stageWidth,
  cursorBecomesZoomIn,
  cursorBecomesDefault,
}) => {
  // sky dimensions in /constants.js are stated as a percentage of canvas dimensions
  const { height: skyHeightPercentage, width: skyWidthPercentage } = SKY;

  // pixel dimensions of sky
  const skyHeight = stageHeight * skyHeightPercentage;
  const skyWidth = stageWidth * skyWidthPercentage;

  // atmosphere height is required to begin the sky where the atmosphere ends
  const { height: atmosphereHeightPercentage } = ATMOSPHERE;
  const atmosphereHeight = stageHeight * atmosphereHeightPercentage;
  const skyBeginsX = 0;
  const skyBeginsY = atmosphereHeight;

  return (
    // Some notes on getting the mouse cursor to behave correcly when moving from/to zoom-in/zoom-out views:
    // (1) The desired behavior: When in zoomed out view, only show a zoom-in lens when hovering over the sky,
    // (This is because the various molecules, which we want to zoom in on, are scattered in the sky)
    // (2) When in zoomed in view, show a zoom-out lens (to return to the main/macro view)
    // (3) Problem: the Konva mouse handler events (onMouseMove or onMouseEnter) require the mouse to *move* before updating the cursor,
    // This can cause the ugly situation: A user hovers over the sky and clicks zoom in... and the cursor remains the zoom-in lens
    // (4) This motivates the approach used: (I) The cursor is styled as zoom-in/zoom-out depending on state in Lab.js,
    // (II) The various components of the Canvas have onMouseEnter/onMouseLeave events to update the cursor as it enters/leaves them
    <Group onMouseEnter={cursorBecomesZoomIn}>
      <SkyBackground
        skyHeight={skyHeight}
        skyWidth={skyWidth}
        skyBeginsX={skyBeginsX}
        skyBeginsY={skyBeginsY}
      />
      <Cloud
        skyHeight={skyHeight}
        skyWidth={skyWidth}
        skyBeginsY={skyBeginsY}
        cursorBecomesZoomIn={cursorBecomesZoomIn}
        cursorBecomesDefault={cursorBecomesDefault}
      />
      <Thermometer
        skyHeight={skyHeight}
        skyWidth={skyWidth}
        skyBeginsX={skyBeginsX}
        skyBeginsY={skyBeginsY}
        cursorBecomesZoomIn={cursorBecomesZoomIn}
        cursorBecomesDefault={cursorBecomesDefault}
      />
    </Group>
  );
};

Sky.propTypes = {
  stageHeight: PropTypes.number.isRequired,
  stageWidth: PropTypes.number.isRequired,
  cursorBecomesZoomIn: PropTypes.func.isRequired,
  cursorBecomesDefault: PropTypes.func.isRequired,
};

export default Sky;
