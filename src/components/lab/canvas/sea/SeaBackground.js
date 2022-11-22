import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Line } from 'react-konva';
import { SEA } from '../../../../config/constants';
import { generateSeaPoints } from '../../../../utils/canvas';
import { SeaDimensionsContext } from '../../../contexts/canvas-dimensions/SeaDimensionsProvider';

const SeaBackground = () => {
  const { seaWidth, seaHeight, seaIndent, seaBeginsX, seaBeginsY } = useContext(
    SeaDimensionsContext,
  );

  const { isPaused, temporaryIceCover } = useSelector(({ lab }) => lab);

  const { colorRange, colorRangePaused, colorRangeFrozen } = SEA;

  const determineSeaColor = () => {
    // if ice cover is 100%, ocean should freeze
    if (temporaryIceCover === 100) {
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
