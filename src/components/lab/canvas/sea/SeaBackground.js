import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Line } from 'react-konva';
import { SEA } from '../../../../config/constants';
import { generateSeaPoints } from '../../../../utils/canvas';

const SeaBackground = ({
  seaHeight,
  seaWidth,
  seaIndent,
  seaBeginsX,
  seaBeginsY,
}) => {
  const isPaused = useSelector(({ lab }) => lab.isPaused);

  const { colorRange, colorRangePaused } = SEA;

  return (
    <Line
      x={seaBeginsX}
      y={seaBeginsY}
      points={generateSeaPoints(seaWidth, seaHeight, seaIndent)}
      fillLinearGradientStartPoint={{ x: 0, y: 0 }}
      fillLinearGradientEndPoint={{
        x: 0,
        y: seaHeight,
      }}
      fillLinearGradientColorStops={isPaused ? colorRangePaused : colorRange}
      closed
    />
  );
};

SeaBackground.propTypes = {
  seaHeight: PropTypes.number.isRequired,
  seaWidth: PropTypes.number.isRequired,
  seaIndent: PropTypes.number.isRequired,
  seaBeginsX: PropTypes.number.isRequired,
  seaBeginsY: PropTypes.number.isRequired,
};

export default SeaBackground;
