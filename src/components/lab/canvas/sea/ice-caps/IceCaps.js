import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import IceCapRow from './IceCapRow';
import {
  DEFAULT_NUMBER_OF_ICE_CAPS_PER_ROW,
  ICE_CAP_BASE,
  ICE_CAP_HEIGHT,
  ICE_CAP_ROWS_BEGIN,
  NUMBER_OF_ICE_CAP_ROWS,
  X_DISTANCE_BETWEEN_ICE_CAPS,
  Y_DISTANCE_BETWEEN_ICE_CAPS,
} from '../../../../../config/constants';

const IceCaps = ({ seaHeight, seaWidth, seaBeginsY }) => {
  const iceCover = useSelector(({ lab }) => lab.albedo.iceCover);
  // ice cap dimensions
  const iceCapBaseWidth = seaWidth * ICE_CAP_BASE;
  const iceCapHeight = seaHeight * ICE_CAP_HEIGHT;

  // horizontal and vertical spacing between ice caps within a row
  const xDistanceBetweenIceCapsInRow = X_DISTANCE_BETWEEN_ICE_CAPS * seaWidth;
  const yDistanceBetweenIceCapsInRow = Y_DISTANCE_BETWEEN_ICE_CAPS * seaHeight;

  const iceCapRows = new Array(NUMBER_OF_ICE_CAP_ROWS)
    .fill()
    .map((emptyElement, index) => {
      const iceCapRowsBegin = ICE_CAP_ROWS_BEGIN[index];
      const iceCapRowBeginsX = iceCapRowsBegin.x * seaWidth;
      const iceCapRowBeginsY = seaBeginsY + iceCapRowsBegin.y * seaHeight;
      const numberOfIceCaps = Math.ceil(
        (DEFAULT_NUMBER_OF_ICE_CAPS_PER_ROW[index] * iceCover) / 100,
      );

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
          // TODO: numberOfIceCaps in a row will be determined in global state (Albedo)
          numberOfIceCaps={numberOfIceCaps}
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
