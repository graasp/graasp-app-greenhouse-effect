import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Group, Ellipse } from 'react-konva';
import { generateCloudCircles } from '../../../../../utils/canvas';
import {
  DEFAULT_CLOUD_FILL,
  SIMULATION_MODES,
  VENUS_CLOUD_FILL,
} from '../../../../../config/constants';

const Cloud = ({
  cursorBecomesDefault,
  cursorBecomesZoomIn,
  cloudCentralCircleX,
  cloudCentralCircleY,
  cloudCentralCircleRadiusX,
  cloudCentralCircleRadiusY,
}) => {
  const { simulationMode } = useSelector(({ lab }) => lab);
  const isVenus = simulationMode === SIMULATION_MODES.VENUS.name;

  const cloudFill = isVenus ? VENUS_CLOUD_FILL : DEFAULT_CLOUD_FILL;

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
          fill={cloudFill}
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
