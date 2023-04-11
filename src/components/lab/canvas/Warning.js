import React from 'react';
import PropTypes from 'prop-types';
import { Group } from 'react-konva';
import { useSelector } from 'react-redux';
import {
  WARNING_BORDER,
  WARNING_HEIGHT,
  WARNING_WIDTH,
} from '../../../constants/canvas/warning';
import CloseWarning from './warning/CloseWarning';
import OuterRectangle from './warning/OuterRectangle';
import InnerRectangle from './warning/InnerRectangle';
import WarningText from './warning/WarningText';

const Warning = ({ cursorBecomesDefault }) => {
  const { width: stageWidth, height: stageHeight } = useSelector(
    ({ layout }) => layout.lab.stageDimensions,
  );

  const outerRectangleWidth = WARNING_WIDTH * stageWidth;
  const outerRectangleHeight = WARNING_HEIGHT * stageHeight;
  const midPointX = stageWidth / 2 - outerRectangleWidth / 2;
  const midPointY = stageHeight / 2 - outerRectangleHeight / 2;
  const border = WARNING_BORDER * outerRectangleWidth;
  const innerRectangleWidth = outerRectangleWidth - border;
  const innerRectangleHeight = outerRectangleHeight - border;
  const innerRectangleXOffset = border / 2;
  const innerRectangleYOffset = border / 2;

  return (
    <Group x={midPointX} y={midPointY} onMouseEnter={cursorBecomesDefault}>
      <OuterRectangle
        width={outerRectangleWidth}
        height={outerRectangleHeight}
      />
      <InnerRectangle
        x={innerRectangleXOffset}
        y={innerRectangleYOffset}
        width={innerRectangleWidth}
        height={innerRectangleHeight}
      />
      <WarningText
        x={innerRectangleXOffset}
        y={innerRectangleYOffset}
        width={innerRectangleWidth}
        height={innerRectangleHeight}
      />
      <CloseWarning
        x={innerRectangleWidth}
        cursorBecomesDefault={cursorBecomesDefault}
      />
    </Group>
  );
};

Warning.propTypes = {
  cursorBecomesDefault: PropTypes.func.isRequired,
};

export default Warning;
