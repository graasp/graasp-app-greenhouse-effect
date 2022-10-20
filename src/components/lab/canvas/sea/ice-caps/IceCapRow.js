import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import IceCap from './IceCap';
import { generateIceCapPoints } from '../../../../../utils/canvas';
import { SeaDimensionsContext } from '../../../../contexts/canvas-dimensions/SeaDimensionsProvider';

const IceCapRow = ({ iceCapRowBeginsX, iceCapRowBeginsY, numberOfIceCaps }) => {
  const {
    iceCapBaseWidth,
    iceCapHeight,
    xDistanceBetweenIceCaps,
    yDistanceBetweenIceCaps,
  } = useContext(SeaDimensionsContext);

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
  iceCapRowBeginsX: PropTypes.number.isRequired,
  iceCapRowBeginsY: PropTypes.number.isRequired,
  numberOfIceCaps: PropTypes.number.isRequired,
};

export default IceCapRow;
