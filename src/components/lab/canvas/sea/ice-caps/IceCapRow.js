import React from 'react';
import PropTypes from 'prop-types';
import IceCap from './IceCap';
import { generateIceCapPoints } from '../../../../../utils/canvas';

const IceCapRow = ({
  iceCapBaseWidth,
  iceCapHeight,
  xDistanceBetweenIceCaps,
  yDistanceBetweenIceCaps,
  iceCapRowBeginsX,
  iceCapRowBeginsY,
  numberOfIceCaps,
}) => {
  // generateIceCapPoints creates a trapezium given a base and height
  // the trapezium is an array of points passed as a prop to a Konva Line (with a prop of closed={true})
  const iceCapPoints = generateIceCapPoints(iceCapBaseWidth, iceCapHeight);

  const iceCaps = new Array(numberOfIceCaps)
    .fill()
    .map((emptyElement, index) => {
      const x =
        iceCapRowBeginsX + index * (xDistanceBetweenIceCaps + iceCapBaseWidth);
      const y = iceCapRowBeginsY + (index + 1) * yDistanceBetweenIceCaps;
      // eslint-disable-next-line react/no-array-index-key
      return <IceCap x={x} y={y} iceCapPoints={iceCapPoints} key={index} />;
    });

  return iceCaps;
};

IceCapRow.propTypes = {
  iceCapBaseWidth: PropTypes.number.isRequired,
  iceCapHeight: PropTypes.number.isRequired,
  xDistanceBetweenIceCaps: PropTypes.number.isRequired,
  yDistanceBetweenIceCaps: PropTypes.number.isRequired,
  iceCapRowBeginsX: PropTypes.number.isRequired,
  iceCapRowBeginsY: PropTypes.number.isRequired,
  numberOfIceCaps: PropTypes.number.isRequired,
};

export default IceCapRow;
