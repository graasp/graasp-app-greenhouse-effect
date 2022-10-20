import React, { useContext } from 'react';
import { Group } from 'react-konva';
import PropTypes from 'prop-types';
import Cloud from './Cloud';
import { SkyDimensionsContext } from '../../../../contexts/canvas-dimensions/SkyDimensionsProvider';

const Clouds = ({ cursorBecomesDefault, cursorBecomesZoomIn }) => {
  const {
    firstCloudCentralCircleX,
    firstCloudCentralCircleY,
    secondCloudCentralCircleX,
    secondCloudCentralCircleY,
    firstCloudCentralCircleRadiusX,
    firstCloudCentralCircleRadiusY,
    secondCloudCentralCircleRadiusX,
    secondCloudCentralCircleRadiusY,
  } = useContext(SkyDimensionsContext);

  return (
    <Group>
      <Cloud
        cursorBecomesDefault={cursorBecomesDefault}
        cursorBecomesZoomIn={cursorBecomesZoomIn}
        cloudCentralCircleX={firstCloudCentralCircleX}
        cloudCentralCircleY={firstCloudCentralCircleY}
        cloudCentralCircleRadiusX={firstCloudCentralCircleRadiusX}
        cloudCentralCircleRadiusY={firstCloudCentralCircleRadiusY}
      />
      <Cloud
        cursorBecomesDefault={cursorBecomesDefault}
        cursorBecomesZoomIn={cursorBecomesZoomIn}
        cloudCentralCircleX={secondCloudCentralCircleX}
        cloudCentralCircleY={secondCloudCentralCircleY}
        cloudCentralCircleRadiusX={secondCloudCentralCircleRadiusX}
        cloudCentralCircleRadiusY={secondCloudCentralCircleRadiusY}
      />
    </Group>
  );
};

Clouds.propTypes = {
  cursorBecomesDefault: PropTypes.func.isRequired,
  cursorBecomesZoomIn: PropTypes.func.isRequired,
};

export default Clouds;
