import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Line } from 'react-konva';
import {
  DEFAULT_RADIATION_LINE_TENSION,
  SET_INTERVAL_TIME,
  LINE_STEP,
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
    amplitude: PropTypes.number.isRequired,
    wavelength: PropTypes.number.isRequired,
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

  emittedLineInterval = null;

  componentDidUpdate(
    { isPaused: prevIsPaused, show: prevShow },
    { points: prevPoints },
  ) {
    const { isPaused, show, maxPointsForLine, onEnd } = this.props;
    const { points } = this.state;
    if (isPaused !== prevIsPaused && isPaused) {
      clearInterval(this.emittedLineInterval);
    } else if (isPaused !== prevIsPaused && !isPaused && show) {
      this.beginLineInterval();
    } else if (!isPaused && show !== prevShow && show) {
      this.beginLineInterval();
    }

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
      const { maxPointsForLine, amplitude, wavelength } = this.props;

      const y = 0;
      const x = Math.cos(t) * amplitude;

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
        t: t + wavelength / 50,
      });
    }, SET_INTERVAL_TIME);
  };

  render() {
    const {
      origin: { x, y },
      angle,
      color,
      show,
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
        tension={DEFAULT_RADIATION_LINE_TENSION}
        stroke={color}
      />
    );
  }
}

const mapStateToProps = ({ lab }) => ({
  isPaused: lab.isPaused,
});

const ConnectedComponent = connect(mapStateToProps)(EmittedLine);
export default ConnectedComponent;
