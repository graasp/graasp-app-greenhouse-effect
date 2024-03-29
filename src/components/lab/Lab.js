import React, { Component } from 'react';
import { ReactReduxContext, Provider, connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Stage, Layer } from 'react-konva';
import {
  BACKGROUND_COLOR,
  DEFAULT_CURSOR,
  GREENHOUSE_GASES_MAX_COUNTS,
  ZOOM_IN_CURSOR,
  ZOOM_OUT_CURSOR,
} from '../../constants';
import { setStageDimensions } from '../../actions';
import CanvasLayout from './canvas/CanvasLayout';
import MoleculesView from './canvas/MoleculesView';
import { createMaxDistribution } from '../../utils';

const styles = () => ({
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
    background: BACKGROUND_COLOR,
  },
  stage: {
    position: 'absolute',
  },
});

class Lab extends Component {
  static propTypes = {
    classes: PropTypes.shape({
      container: PropTypes.string.isRequired,
      stage: PropTypes.string.isRequired,
    }).isRequired,
    dispatchSetStageDimensions: PropTypes.func.isRequired,
    stageDimensions: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    }).isRequired,
    zoomedIn: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    this.checkSize();
    const ro = new ResizeObserver(() => {
      this.checkSize();
    });
    ro.observe(document.querySelector(`#container`));
  }

  checkSize = () => {
    const { dispatchSetStageDimensions, stageDimensions } = this.props;
    const stageWidth = this.container?.offsetWidth || stageDimensions.width;
    const stageHeight = this.container?.offsetHeight || stageDimensions.height;
    dispatchSetStageDimensions({
      width: stageWidth,
      height: stageHeight,
    });
  };

  // callbacks used to transition mouse cursor when moving from/to zoom-in/zoom-out views
  // see Sky.js for notes on/explanation of approach
  cursorBecomesDefault = (event) => {
    const container = event.target.getStage().container();
    container.style.cursor = DEFAULT_CURSOR;
  };

  cursorBecomesZoomIn = (event) => {
    const container = event.target.getStage().container();
    container.style.cursor = ZOOM_IN_CURSOR;
  };

  cursorBecomesZoomOut = (event) => {
    const container = event.target.getStage().container();
    container.style.cursor = ZOOM_OUT_CURSOR;
  };

  render() {
    const { classes, stageDimensions, zoomedIn } = this.props;
    const { height: stageHeight, width: stageWidth } = stageDimensions;

    return (
      <div
        className={`${classes.container}`}
        id="container"
        ref={(node) => {
          this.container = node;
        }}
      >
        {/* below is necessary for redux store to be accessible by konva children */}
        {/* see https://github.com/konvajs/react-konva/issues/311 */}
        <ReactReduxContext.Consumer>
          {({ store }) => (
            <Stage
              className={classes.stage}
              width={stageWidth}
              height={stageHeight}
              style={{ cursor: zoomedIn ? 'zoom-out' : 'zoom-in' }}
            >
              <Provider store={store}>
                <>
                  <Layer>
                    {!zoomedIn && (
                      <CanvasLayout
                        cursorBecomesDefault={this.cursorBecomesDefault}
                        cursorBecomesZoomIn={this.cursorBecomesZoomIn}
                      />
                    )}
                  </Layer>
                  {zoomedIn && (
                    <MoleculesView
                      stageWidth={stageWidth}
                      stageHeight={stageHeight}
                      cursorBecomesDefault={this.cursorBecomesDefault}
                      cursorBecomesZoomOut={this.cursorBecomesZoomOut}
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
  }
}

const mapStateToProps = ({ layout }) => ({
  stageDimensions: layout.lab.stageDimensions,
  zoomedIn: layout.zoomedIn,
});

const mapDispatchToProps = { dispatchSetStageDimensions: setStageDimensions };

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(Lab);

const StyledComponent = withStyles(styles, { withTheme: true })(
  ConnectedComponent,
);

export default StyledComponent;
