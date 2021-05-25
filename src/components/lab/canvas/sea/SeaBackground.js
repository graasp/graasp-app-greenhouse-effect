import React from 'react';
import PropTypes from 'prop-types';
import { Rect } from 'react-konva';
import { SEA } from '../../../../config/constants';

const SeaBackground = ({ seaHeight, seaWidth, seaBeginsX, seaBeginsY }) => {
  const { colorRange: seaColorRange } = SEA;

  return (
    <Rect
      x={seaBeginsX}
      y={seaBeginsY}
      height={seaHeight}
      width={seaWidth}
      fillLinearGradientStartPoint={{ x: 0, y: 0 }}
      fillLinearGradientEndPoint={{
        x: 0,
        y: seaHeight,
      }}
      fillLinearGradientColorStops={seaColorRange}
    />
  );
};

SeaBackground.propTypes = {
  seaHeight: PropTypes.number.isRequired,
  seaWidth: PropTypes.number.isRequired,
  seaBeginsX: PropTypes.number.isRequired,
  seaBeginsY: PropTypes.number.isRequired,
};

export default SeaBackground;
