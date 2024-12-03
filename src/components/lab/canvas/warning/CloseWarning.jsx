import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Text } from 'react-konva';
import {
  CLOSE_BUTTON_ALIGN,
  CLOSE_BUTTON_COLOR,
  CLOSE_BUTTON_FONT_SIZE,
  CLOSE_BUTTON_WEIGHT,
  CLOSE_BUTTON_WIDTH,
  CLOSE_BUTTON_Y_OFFSET,
} from '../../../../constants/canvas/warning';
import { showRunawayWarning } from '../../../../actions';
import { POINTER_CURSOR } from '../../../../constants/strings';

const CloseWarning = ({ x, cursorBecomesDefault }) => {
  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(showRunawayWarning(false));
  };

  const cursorBecomesPointer = (event) => {
    const container = event.target.getStage().container();
    container.style.cursor = POINTER_CURSOR;
  };

  return (
    <Text
      text="×"
      x={x - CLOSE_BUTTON_WIDTH}
      y={CLOSE_BUTTON_Y_OFFSET}
      width={CLOSE_BUTTON_WIDTH}
      align={CLOSE_BUTTON_ALIGN}
      fill={CLOSE_BUTTON_COLOR}
      fontStyle={CLOSE_BUTTON_WEIGHT}
      fontSize={CLOSE_BUTTON_FONT_SIZE}
      onClick={onClose}
      onMouseEnter={cursorBecomesPointer}
      onMouseLeave={cursorBecomesDefault}
    />
  );
};

CloseWarning.propTypes = {
  x: PropTypes.number.isRequired,
  cursorBecomesDefault: PropTypes.func.isRequired,
};

export default CloseWarning;
