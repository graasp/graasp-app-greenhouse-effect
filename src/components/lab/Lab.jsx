import React, { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core';
import {
  ReactReduxContext,
  Provider,
  useSelector,
  useDispatch,
} from 'react-redux';
import { Stage, Layer } from 'react-konva';
import {
  BACKGROUND_COLOR,
  DEFAULT_CURSOR,
  CANVAS_WIDTH,
  GREENHOUSE_GASES_MAX_COUNTS,
  ZOOM_IN_CURSOR,
  ZOOM_OUT_CURSOR,
} from '../../constants';
import { setStageDimensions } from '../../actions';
import CanvasLayout from './canvas/CanvasLayout';
import MoleculesView from './canvas/MoleculesView';
import { createMaxDistribution } from '../../utils';

const useStyles = makeStyles(() => ({
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
    background: BACKGROUND_COLOR,
  },
}));

const Lab = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { zoomedIn, showSideMenu } = useSelector(({ layout }) => layout);
  const { height, width } = useSelector(
    ({ layout }) => layout.lab.stageDimensions,
  );
  const divRef = useRef(null);

  const cursorBecomesDefault = (event) => {
    const container = event.target.getStage().container();
    container.style.cursor = DEFAULT_CURSOR;
  };

  const cursorBecomesZoomIn = (event) => {
    const container = event.target.getStage().container();
    container.style.cursor = ZOOM_IN_CURSOR;
  };

  const cursorBecomesZoomOut = (event) => {
    const container = event.target.getStage().container();
    container.style.cursor = ZOOM_OUT_CURSOR;
  };

  useEffect(() => {
    const checkSize = () => {
      const stageWidth = divRef.current?.offsetWidth || 0;
      const stageHeight = divRef.current?.offsetHeight || 0;
      dispatch(
        setStageDimensions({
          width: showSideMenu ? stageWidth * CANVAS_WIDTH : stageWidth,
          height: stageHeight,
        }),
      );
    };
    const resizeObserver = new ResizeObserver(() => {
      checkSize();
    });
    const mainContainer = document.querySelector('#container');
    if (mainContainer) {
      resizeObserver.observe(mainContainer);
    }
    checkSize();
  }, [showSideMenu]);

  return (
    <div id="container" ref={divRef} className={classes.container}>
      <ReactReduxContext.Consumer>
        {({ store }) => (
          <Stage
            width={width}
            height={height}
            style={{ cursor: zoomedIn ? 'zoom-out' : 'zoom-in' }}
          >
            <Provider store={store}>
              <>
                <Layer>
                  {!zoomedIn && (
                    <CanvasLayout
                      cursorBecomesDefault={cursorBecomesDefault}
                      cursorBecomesZoomIn={cursorBecomesZoomIn}
                    />
                  )}
                </Layer>
                {zoomedIn && (
                  <MoleculesView
                    stageWidth={width}
                    stageHeight={height}
                    cursorBecomesDefault={cursorBecomesDefault}
                    cursorBecomesZoomOut={cursorBecomesZoomOut}
                    maxDistribution={createMaxDistribution(
                      GREENHOUSE_GASES_MAX_COUNTS,
                    )}
                  />
                )}
              </>
            </Provider>
          </Stage>
        )}
      </ReactReduxContext.Consumer>
    </div>
  );
};

export default Lab;
