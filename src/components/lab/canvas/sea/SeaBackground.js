import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Line } from 'react-konva';
import { MAX_ICE_COVER_POSSIBLE, SEA } from '../../../../config/constants';
import { generateSeaPoints } from '../../../../utils/canvas';
import { SeaDimensionsContext } from '../../../contexts/canvas-dimensions/SeaDimensionsProvider';

const SeaBackground = () => {
  const { seaWidth, seaHeight, seaIndent, seaBeginsX, seaBeginsY } = useContext(
    SeaDimensionsContext,
  );

  const { isPaused, sliderIceCover } = useSelector(({ lab }) => lab);

  const { colorRange, colorRangePaused, colorRangeFrozen } = SEA;

  const determineSeaColor = () => {
    if (sliderIceCover >= MAX_ICE_COVER_POSSIBLE) {
      return colorRangeFrozen;
    }
    if (isPaused) {
      return colorRangePaused;
    }
    return colorRange;
  };

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
      fillLinearGradientColorStops={determineSeaColor()}
      closed
    />
  );
};

export default SeaBackground;
