import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import IceCapRow from './IceCapRow';
import { ICE_CAP_ROWS_BEGIN } from '../../../../../config/constants';
import {
  computeNumIceCaps,
  distributeIceCaps,
} from '../../../../../utils/canvas';
import { SeaDimensionsContext } from '../../../../contexts/canvas-dimensions/SeaDimensionsProvider';

const IceCaps = () => {
  const { seaWidth, seaHeight, seaBeginsY } = useContext(SeaDimensionsContext);
  const { iceCover } = useSelector(({ lab }) => lab);

  // number of ice caps computed based on iceCover
  // iceCapDist is array of the form [x, y], where array[i] is # of ice caps in row i
  const numIceCaps = computeNumIceCaps(iceCover);
  const iceCapDist = distributeIceCaps(numIceCaps);

  const iceCapRows = iceCapDist.map((numIceCapsInRow, index) => {
    const iceCapRowsBegin = ICE_CAP_ROWS_BEGIN[index];
    const iceCapRowBeginsX = iceCapRowsBegin.x * seaWidth;
    const iceCapRowBeginsY = seaBeginsY + iceCapRowsBegin.y * seaHeight;
    return (
      <IceCapRow
        // eslint-disable-next-line react/no-array-index-key
        key={index}
        iceCapRowBeginsX={iceCapRowBeginsX}
        iceCapRowBeginsY={iceCapRowBeginsY}
        numberOfIceCaps={numIceCapsInRow}
      />
    );
  });

  return iceCapRows;
};

export default IceCaps;
