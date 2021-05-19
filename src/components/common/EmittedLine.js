import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Line } from 'react-konva';
import {
  DEFAULT_TENSION,
  SET_INTERVAL_TIME,
  LINE_STEP,
  LINE_AMPLITUDE,
  LINE_ANGLE,
} from '../../config/constants';

class EmittedLine extends Component {
  static propTypes = {
    origin: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }).isRequired,
    angle: PropTypes.number.isRequired,
    isPaused: PropTypes.bool.isRequired,
    maxPointsForLine: PropTypes.number.isRequired,
    show: PropTypes.bool.isRequired,
    color: PropTypes.string.isRequired,
    onEnd: PropTypes.func,
  };

  static defaultProps = {
    onEnd: null,
  };

  state = (() => {
    const {
      origin: { x, y },
    } = this.props;
    return {
      points: [x, y],
      t: 0,
    };
  })();

  componentDidMount() {
    const { show } = this.props;
    if (show) {
      this.beginLineInterval();
    }
  }

  componentDidUpdate(
    { isPaused: prevIsPaused, show: prevShow },
    { points: prevPoints },
  ) {
    const { isPaused, show, maxPointsForLine, onEnd } = this.props;
    const { points } = this.state;
    if (isPaused !== prevIsPaused && isPaused) {
      clearInterval(this.emittedLineInterval);
    } else if (isPaused !== prevIsPaused && !isPaused) {
      this.beginLineInterval();
    }

    if (show !== prevShow && show) {
      this.beginLineInterval();
    }

    // // reset line on show/hide emitted lines
    // if (
    //   prevShowEmittedLines !== showEmittedLines &&
    //   !_.isEqual(prevPoints, [0, 0])
    // ) {
    //   // eslint-disable-next-line react/no-did-update-set-state
    //   this.setState({ points: [origin.x, origin.y] });
    // }
    // alerts when the line is fully drawn
    if (
      points.length === maxPointsForLine &&
      prevPoints.length < maxPointsForLine
    ) {
      onEnd?.();
    }
  }

  beginLineInterval = () => {
    this.emittedLineInterval = setInterval(() => {
      const { points, t } = this.state;
      const { maxPointsForLine } = this.props;

      const y = 0; // originY + Math.sin(t) * LINE_AMPLITUDE;
      const x = Math.cos(t) * LINE_AMPLITUDE;

      // add points in respective direction
      const newPoints = points
        .slice(2)
        .map((value, i) =>
          i % 2 === 0
            ? value + Math.cos(LINE_ANGLE) * LINE_STEP
            : value + Math.sin(LINE_ANGLE) * LINE_STEP,
        );

      this.setState({
        points: [x, y, x, y, ...newPoints].slice(0, maxPointsForLine),
        t: t + 0.5,
      });
    }, SET_INTERVAL_TIME);
  };

  render() {
    const {
      origin: { x, y },
      angle,
      show,
      color,
    } = this.props;
    const { points } = this.state;

    if (!show) {
      return null;
    }
    return (
      <Line
        x={x}
        y={y}
        rotation={angle}
        points={points}
        tension={DEFAULT_TENSION}
        stroke={color}
      />
    );
  }
}

const mapStateToProps = () => ({
  isPaused: false,
  showEmittedLines: true,
});

const ConnectedComponent = connect(mapStateToProps)(EmittedLine);
export default ConnectedComponent;
