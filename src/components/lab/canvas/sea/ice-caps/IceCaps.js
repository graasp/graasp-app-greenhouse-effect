import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import IceCapRow from './IceCapRow';
import {
  ICE_CAP_BASE,
  ICE_CAP_HEIGHT,
  ICE_CAP_ROWS_BEGIN,
  X_DISTANCE_BETWEEN_ICE_CAPS,
  Y_DISTANCE_BETWEEN_ICE_CAPS,
} from '../../../../../config/constants';
import {
  computeNumIceCaps,
  distributeIceCaps,
} from '../../../../../utils/canvas';

const IceCaps = ({ seaHeight, seaWidth, seaBeginsY }) => {
  const iceCover = useSelector(({ lab }) => lab.albedo.iceCover);
  // ice cap dimensions
  const iceCapBaseWidth = seaWidth * ICE_CAP_BASE;
  const iceCapHeight = seaHeight * ICE_CAP_HEIGHT;

  // horizontal and vertical spacing between ice caps within a row
  const xDistanceBetweenIceCapsInRow = X_DISTANCE_BETWEEN_ICE_CAPS * seaWidth;
  const yDistanceBetweenIceCapsInRow = Y_DISTANCE_BETWEEN_ICE_CAPS * seaHeight;

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
        iceCapBaseWidth={iceCapBaseWidth}
        iceCapHeight={iceCapHeight}
        xDistanceBetweenIceCaps={xDistanceBetweenIceCapsInRow}
        yDistanceBetweenIceCaps={yDistanceBetweenIceCapsInRow}
        numberOfIceCaps={numIceCapsInRow}
      />
    );
  });

  return iceCapRows;
};

IceCaps.propTypes = {
  seaHeight: PropTypes.number.isRequired,
  seaWidth: PropTypes.number.isRequired,
  seaBeginsY: PropTypes.number.isRequired,
};

export default IceCaps;
