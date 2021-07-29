import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Cloud from './Cloud';
import {
  CLOUD_CENTRAL_CIRCLE_X,
  CLOUD_CENTRAL_CIRCLE_Y,
} from '../../../../../config/constants';

const Clouds = ({
  skyHeight,
  skyWidth,
  skyBeginsY,
  cursorBecomesDefault,
  cursorBecomesZoomIn,
}) => {
  const { cloudCover } = useSelector(({ lab }) => lab.albedo);

  return (
    <>
      <Cloud
        skyHeight={skyHeight}
        skyWidth={skyWidth}
        skyBeginsY={skyBeginsY}
        cursorBecomesDefault={cursorBecomesDefault}
        cursorBecomesZoomIn={cursorBecomesZoomIn}
        offsetY={CLOUD_CENTRAL_CIRCLE_Y * skyHeight}
        offsetX={CLOUD_CENTRAL_CIRCLE_X * skyWidth}
        cloudCover={cloudCover}
      />
      <Cloud
        skyHeight={skyHeight}
        skyWidth={skyWidth}
        skyBeginsY={skyBeginsY}
        cursorBecomesDefault={cursorBecomesDefault}
        cursorBecomesZoomIn={cursorBecomesZoomIn}
        offsetY={(CLOUD_CENTRAL_CIRCLE_Y - 0.05) * skyHeight}
        offsetX={0.7 * skyWidth}
        cloudCover={cloudCover < 50 ? 0 : (cloudCover - 50) * 2}
      />
    </>
  );
};

Clouds.propTypes = {
  skyHeight: PropTypes.number.isRequired,
  skyWidth: PropTypes.number.isRequired,
  skyBeginsY: PropTypes.number.isRequired,
  cursorBecomesDefault: PropTypes.func.isRequired,
  cursorBecomesZoomIn: PropTypes.func.isRequired,
};

export default Clouds;
