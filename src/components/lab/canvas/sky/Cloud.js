import React from 'react';
import PropTypes from 'prop-types';
import { Group, Circle, Ellipse } from 'react-konva';
import {
  CLOUD_BORDER_COLOR,
  CLOUD_BORDER_WIDTH,
  CLOUD_CENTRAL_CIRCLE_RADIUS,
  CLOUD_CENTRAL_CIRCLE_X,
  CLOUD_CENTRAL_CIRCLE_Y,
  CLOUD_ELLIPSE_RADIUS_X,
  CLOUD_ELLIPSE_RADIUS_Y,
  CLOUD_FILL,
  CLOUD_RESPONSIVE_ADJUSTMENT_FACTOR,
} from '../../../../config/constants';
import { generateCloudCircles } from '../../../../utils/canvas';

// a Cloud is five Konva circles, the central one being the largest, flanked on each side by two circles
// since the circles have borders, we draw an ellipse in the middle, with the same color as the cloud, to conceal parts of the borders
const Cloud = ({ skyHeight, skyWidth, skyBeginsY }) => {
  // we determine the size of the circles of the cloud from a central circle we define (using generateCloudCircles below)
  const centralCircleRadius =
    CLOUD_CENTRAL_CIRCLE_RADIUS *
    // use some combination of skyHeight and skyWidth to determine cloud radius...
    // ...so that cloud is responsive to vertical and horizontal screen size changes
    ((skyHeight + skyWidth) / CLOUD_RESPONSIVE_ADJUSTMENT_FACTOR);
  const centralCircleX = CLOUD_CENTRAL_CIRCLE_X * skyWidth;
  const centralCircleY = skyBeginsY + CLOUD_CENTRAL_CIRCLE_Y * skyHeight;

  const cloudEllipseRadiusX = centralCircleRadius * CLOUD_ELLIPSE_RADIUS_X;
  const cloudEllipseRadiusY = centralCircleRadius * CLOUD_ELLIPSE_RADIUS_Y;

  return (
    <Group>
      {generateCloudCircles(centralCircleRadius, centralCircleX).map(
        ({ x, radius }, index) => (
          <Circle
            x={x}
            y={centralCircleY}
            radius={radius}
            fill={CLOUD_FILL}
            stroke={CLOUD_BORDER_COLOR}
            strokeWidth={CLOUD_BORDER_WIDTH}
            // eslint-disable-next-line react/no-array-index-key
            key={index}
          />
        ),
      )}
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
};

export default Cloud;
