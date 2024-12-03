import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import AtmosphereDimensionsProvider from './AtmosphereDimensionsProvider';
import SkyDimensionsProvider from './SkyDimensionsProvider';
import SeaDimensionsProvider from './SeaDimensionsProvider';
import GroundDimensionsProvider from './GroundDimensionsProvider';

// consolidate all providers into one export
const CanvasDimensionsProvider = ({ children }) => {
  const { height: stageHeight, width: stageWidth } = useSelector(
    ({ layout }) => layout.lab.stageDimensions,
  );

  return (
    <AtmosphereDimensionsProvider
      stageHeight={stageHeight}
      stageWidth={stageWidth}
    >
      <SkyDimensionsProvider stageHeight={stageHeight} stageWidth={stageWidth}>
        <SeaDimensionsProvider
          stageHeight={stageHeight}
          stageWidth={stageWidth}
        >
          <GroundDimensionsProvider
            stageHeight={stageHeight}
            stageWidth={stageWidth}
          >
            {children}
          </GroundDimensionsProvider>
        </SeaDimensionsProvider>
      </SkyDimensionsProvider>
    </AtmosphereDimensionsProvider>
  );
};

CanvasDimensionsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default CanvasDimensionsProvider;
