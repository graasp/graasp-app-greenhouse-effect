import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Line } from 'react-konva';
import { MAX_ICE_COVER, SEA } from '../../../../constants';
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
    if (iceCover >= MAX_ICE_COVER) {
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
