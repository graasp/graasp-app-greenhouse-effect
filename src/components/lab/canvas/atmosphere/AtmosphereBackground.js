import React from 'react';
import PropTypes from 'prop-types';
import { Rect } from 'react-konva';
import { ATMOSPHERE } from '../../../../config/constants';

const AtmosphereBackground = ({
  atmosphereHeight,
  atmosphereWidth,
  atmosphereBeginsX,
  atmosphereBeginsY,
}) => {
  const { colorRange: atmosphereColorRange } = ATMOSPHERE;

  return (
    <Rect
      x={atmosphereBeginsX}
      y={atmosphereBeginsY}
      height={atmosphereHeight}
      width={atmosphereWidth}
      fillLinearGradientStartPoint={{ x: 0, y: 0 }}
      fillLinearGradientEndPoint={{
        x: 0,
        y: atmosphereHeight,
      }}
      fillLinearGradientColorStops={atmosphereColorRange}
    />
  );
};

AtmosphereBackground.propTypes = {
  atmosphereHeight: PropTypes.number.isRequired,
  atmosphereWidth: PropTypes.number.isRequired,
  atmosphereBeginsX: PropTypes.number.isRequired,
  atmosphereBeginsY: PropTypes.number.isRequired,
};

export default AtmosphereBackground;
