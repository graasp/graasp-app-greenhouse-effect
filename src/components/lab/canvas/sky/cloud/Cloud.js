import React from 'react';
import PropTypes from 'prop-types';
import { Group, Ellipse } from 'react-konva';
import { generateCloudCircles } from '../../../../../utils/canvas';
import { CLOUD_FILL } from '../../../../../config/constants';

const Cloud = ({
  cursorBecomesDefault,
  cursorBecomesZoomIn,
  cloudCentralCircleX,
  cloudCentralCircleY,
  cloudCentralCircleRadiusX,
  cloudCentralCircleRadiusY,
}) => {
  return (
    <Group
      onMouseEnter={cursorBecomesDefault}
      onMouseLeave={cursorBecomesZoomIn}
    >
      {generateCloudCircles(
        cloudCentralCircleRadiusX,
        cloudCentralCircleRadiusY,
        cloudCentralCircleX,
      ).map(({ x, radiusX, radiusY }, index) => (
        <Ellipse
          x={x}
          y={cloudCentralCircleY}
          fill={CLOUD_FILL}
          radiusX={radiusX}
          radiusY={radiusY}
          // eslint-disable-next-line react/no-array-index-key
          key={index}
        />
      ))}
    </Group>
  );
};

Cloud.propTypes = {
  cursorBecomesDefault: PropTypes.func.isRequired,
  cursorBecomesZoomIn: PropTypes.func.isRequired,
  cloudCentralCircleX: PropTypes.number.isRequired,
  cloudCentralCircleY: PropTypes.number.isRequired,
  cloudCentralCircleRadiusX: PropTypes.number.isRequired,
  cloudCentralCircleRadiusY: PropTypes.number.isRequired,
};

export default Cloud;
