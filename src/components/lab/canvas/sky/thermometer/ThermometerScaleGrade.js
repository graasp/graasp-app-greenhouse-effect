import React from 'react';
import PropTypes from 'prop-types';
import { Group, Text, Line } from 'react-konva';
import {
  THERMOMETER_SCALE_LABEL_PADDING_RIGHT,
  THERMOMETER_SCALE_LABEL_WIDTH,
  THERMOMETER_SCALE_STROKE_COLOR,
  THERMOMETER_SCALE_STROKE_WIDTH,
  THERMOMETER_SCALE_GRADE_WIDTH,
} from '../../../../../config/constants';

const ThermometerScaleGrade = ({ label, y, step }) => {
  const labelX =
    -THERMOMETER_SCALE_LABEL_WIDTH - THERMOMETER_SCALE_LABEL_PADDING_RIGHT;
  const labelWidth = THERMOMETER_SCALE_LABEL_WIDTH;
  const labelHeight = step;
  const labelY = -labelHeight / 2;

  return (
    <Group y={y}>
      <Text
        text={Math.round(label)}
        x={labelX}
        width={labelWidth}
        align="right"
        height={labelHeight}
        verticalAlign="middle"
        y={labelY}
      />
      <Line
        points={[0, 0, THERMOMETER_SCALE_GRADE_WIDTH, 0]}
        stroke={THERMOMETER_SCALE_STROKE_COLOR}
        strokeWidth={THERMOMETER_SCALE_STROKE_WIDTH}
      />
    </Group>
  );
};

ThermometerScaleGrade.propTypes = {
  label: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
};

export default ThermometerScaleGrade;
