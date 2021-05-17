import React from 'react';
import PropTypes from 'prop-types';
import IceCapRow from './IceCapRow';
import {
  ICE_CAP_BASE,
  ICE_CAP_HEIGHT,
  ICE_CAP_ROW_INDENTS,
  NUMBER_OF_ICE_CAP_ROWS,
  X_DISTANCE_BETWEEN_ICE_CAPS,
  Y_DISTANCE_BETWEEN_ICE_CAPS,
} from '../../../config/constants';

const IceCaps = ({ seaHeight, seaWidth, seaBeginsY }) => {
  // **TODO**: Add some explanations of how this component works
  const iceCapBaseWidth = seaWidth * ICE_CAP_BASE;
  const iceCapHeight = seaHeight * ICE_CAP_HEIGHT;

  const xDistanceBetweenIceCapsInRow = X_DISTANCE_BETWEEN_ICE_CAPS * seaWidth;
  const yDistanceBetweenIceCapsInRow = Y_DISTANCE_BETWEEN_ICE_CAPS * seaHeight;

  const iceCapRows = new Array(NUMBER_OF_ICE_CAP_ROWS)
    .fill()
    .map((emptyElement, index) => {
      const iceCapRowIndents = ICE_CAP_ROW_INDENTS[index];
      const iceCapRowBeginsX = iceCapRowIndents.x * seaWidth;
      const iceCapRowBeginsY = seaBeginsY + iceCapRowIndents.y * seaHeight;

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
          numberOfIceCaps={3}
        />
      );
    });

  return <>{iceCapRows}</>;
};

IceCaps.propTypes = {
  seaHeight: PropTypes.number.isRequired,
  seaWidth: PropTypes.number.isRequired,
  seaBeginsY: PropTypes.number.isRequired,
};

export default IceCaps;
