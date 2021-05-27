import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-konva';
import {
  THERMOMETER_BORDER_COLOR,
  THERMOMETER_GRADATION_STROKE,
  THERMOMETER_GRADATION_WIDTH,
  THERMOMETER_NUMBER_OF_GRADATIONS,
} from '../../../../../config/constants';
import { determineThermometerScalePoints } from '../../../../../utils/canvas';

const ThermometerScale = ({
  thermometerBeginsX,
  thermometerBeginsY,
  thermometerBodyHeight,
  thermometerBaseWidth,
}) => {
  const gradationWidth = thermometerBaseWidth * THERMOMETER_GRADATION_WIDTH;

  const thermometerScalePoints = determineThermometerScalePoints(
    thermometerBeginsY,
    thermometerBodyHeight,
    THERMOMETER_NUMBER_OF_GRADATIONS,
  );

  const thermometerScale = thermometerScalePoints.map((yPoint, index) => (
    <Line
      x={thermometerBeginsX}
      y={yPoint}
      points={[0, 0, gradationWidth, 0]}
      stroke={THERMOMETER_BORDER_COLOR}
      strokeWidth={THERMOMETER_GRADATION_STROKE}
      // eslint-disable-next-line react/no-array-index-key
      key={index}
    />
  ));

  return thermometerScale;
};

ThermometerScale.propTypes = {
  thermometerBeginsX: PropTypes.number.isRequired,
  thermometerBeginsY: PropTypes.number.isRequired,
  thermometerBodyHeight: PropTypes.number.isRequired,
  thermometerBaseWidth: PropTypes.number.isRequired,
};

export default ThermometerScale;
