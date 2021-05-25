import React from 'react';
import PropTypes from 'prop-types';
import { Rect } from 'react-konva';
import { GROUND } from '../../../../config/constants';

const GroundBackground = ({
  groundHeight,
  groundWidth,
  groundBeginsX,
  groundBeginsY,
}) => {
  const { colorRange: groundColorRange } = GROUND;

  return (
    <Rect
      x={groundBeginsX}
      y={groundBeginsY}
      height={groundHeight}
      width={groundWidth}
      fillLinearGradientStartPoint={{
        x: 0,
        y: 0,
      }}
      fillLinearGradientEndPoint={{ x: 0, y: groundHeight }}
      fillLinearGradientColorStops={groundColorRange}
    />
  );
};

GroundBackground.propTypes = {
  groundHeight: PropTypes.number.isRequired,
  groundWidth: PropTypes.number.isRequired,
  groundBeginsX: PropTypes.number.isRequired,
  groundBeginsY: PropTypes.number.isRequired,
};

export default GroundBackground;
