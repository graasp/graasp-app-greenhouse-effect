import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Group } from 'react-konva';
import Atmosphere from './Atmosphere';
import Ground from './Ground';
import Sea from './Sea';
import Sky from './Sky';

const CanvasLayout = ({ cursorBecomesDefault, cursorBecomesZoomIn }) => {
  const { height: stageHeight, width: stageWidth } = useSelector(
    ({ layout }) => layout.lab.stageDimensions,
  );

  return (
    <Group>
      <Atmosphere
        stageHeight={stageHeight}
        stageWidth={stageWidth}
        cursorBecomesDefault={cursorBecomesDefault}
      />
      <Sky
        stageHeight={stageHeight}
        stageWidth={stageWidth}
        cursorBecomesZoomIn={cursorBecomesZoomIn}
        cursorBecomesDefault={cursorBecomesDefault}
      />
      <Ground
        stageHeight={stageHeight}
        stageWidth={stageWidth}
        cursorBecomesDefault={cursorBecomesDefault}
      />
      <Sea
        stageHeight={stageHeight}
        stageWidth={stageWidth}
        cursorBecomesDefault={cursorBecomesDefault}
      />
    </Group>
  );
};

CanvasLayout.propTypes = {
  cursorBecomesDefault: PropTypes.func.isRequired,
  cursorBecomesZoomIn: PropTypes.func.isRequired,
};

export default CanvasLayout;
