import React from 'react';
import PropTypes from 'prop-types';
import { Group, Ellipse } from 'react-konva';
import {
  CLOUD_BORDER_COLOR,
  CLOUD_BORDER_WIDTH,
  CLOUD_FILL,
} from '../../../../../config/constants';
import {
  computeCloudEllipseRadiuses,
  generateCloudCircles,
} from '../../../../../utils/canvas';

// a Cloud is five Konva circles, the central one being the largest, flanked on each side by two circles
// since the circles have borders, we draw an ellipse in the middle, with the same color as the cloud, to conceal parts of the borders
const Cloud = ({
  skyHeight,
  skyWidth,
  skyBeginsY,
  cursorBecomesDefault,
  cursorBecomesZoomIn,
  offsetX,
  offsetY,
  cloudCover,
}) => {
  const {
    cloudEllipseRadiusX,
    cloudEllipseRadiusY,
    centralCircleY,
    centralCircleX,
    centralCircleRadius,
  } = computeCloudEllipseRadiuses({
    cloudCover,
    skyHeight,
    skyWidth,
    skyBeginsY,
    offsetX,
    offsetY,
  });

  return (
    <Group
      onMouseEnter={cursorBecomesDefault}
      onMouseLeave={cursorBecomesZoomIn}
    >
      {generateCloudCircles(
        centralCircleRadius,
        centralCircleX,
        cloudCover,
      ).map(({ x, radiusX, radiusY }, index) => (
        <Ellipse
          x={x}
          y={centralCircleY}
          radiusX={radiusX}
          radiusY={radiusY}
          fill={CLOUD_FILL}
          stroke={CLOUD_BORDER_COLOR}
          strokeWidth={CLOUD_BORDER_WIDTH}
          // eslint-disable-next-line react/no-array-index-key
          key={index}
        />
      ))}
      <Ellipse
        x={centralCircleX}
        y={centralCircleY}
        radiusX={cloudEllipseRadiusX}
        radiusY={cloudEllipseRadiusY}
        fill={CLOUD_FILL}
      />
    </Group>
  );
};

Cloud.propTypes = {
  skyHeight: PropTypes.number.isRequired,
  skyWidth: PropTypes.number.isRequired,
  skyBeginsY: PropTypes.number.isRequired,
  cursorBecomesDefault: PropTypes.func.isRequired,
  cursorBecomesZoomIn: PropTypes.func.isRequired,
  offsetX: PropTypes.number.isRequired,
  offsetY: PropTypes.number.isRequired,
  cloudCover: PropTypes.number.isRequired,
};

export default Cloud;
