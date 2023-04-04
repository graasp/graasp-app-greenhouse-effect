import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Line } from 'react-konva';
import { ICE_COVER_MAX_VALUE, SEA } from '../../../../constants';
import { generateSeaPoints } from '../../../../utils';
import { SeaDimensionsContext } from '../../../contexts/canvas-dimensions/SeaDimensionsProvider';

const SeaBackground = () => {
  const { seaWidth, seaHeight, seaIndent, seaBeginsX, seaBeginsY } = useContext(
    SeaDimensionsContext,
  );

  const { isPaused, sliders } = useSelector(({ lab }) => lab);
  const { iceCover } = sliders;

  const { colorRange, colorRangePaused, colorRangeFrozen } = SEA;

  const determineSeaColor = () => {
    if (iceCover >= ICE_COVER_MAX_VALUE) {
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
