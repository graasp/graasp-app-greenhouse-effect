/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Shape, Text, Group } from 'react-konva';
import {
  FLUX_BODY_AMPLITUDE,
  FLUX_HEAD_HEIGHT,
  FLUX_MARGIN,
  FLUX_PROGRESS_INTERVAL_DELTA,
  FLUX_PROGRESS_MAX_VALUE,
  FLUX_TEXT_COLOR,
  FLUX_TEXT_WIDTH,
  FLUX_WAVELENGTH,
  SET_INTERVAL_TIME,
} from '../../config/constants';

class Flux extends Component {
  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    angle: PropTypes.number,
    isPaused: PropTypes.bool.isRequired,
    show: PropTypes.bool,
    onEnd: PropTypes.func,
  };

  static defaultProps = {
    angle: 0,
    onEnd: null,
    show: false,
  };

  state = {
    progress: 0,
  };

  interval = null;

  componentDidUpdate(
    { isPaused: prevIsPaused, show: prevShow },
    { progress: prevProgress },
  ) {
    const { isPaused, show, onEnd } = this.props;
    const { progress } = this.state;
    if (isPaused !== prevIsPaused && isPaused) {
      clearInterval(this.interval);
    } else if (isPaused !== prevIsPaused && !isPaused && show) {
      this.beginLineInterval();
    } else if (!isPaused && show !== prevShow && show) {
      this.beginLineInterval();
    }

    // alerts when the line is fully drawn
    if (
      prevProgress < FLUX_PROGRESS_MAX_VALUE &&
      progress >= FLUX_PROGRESS_MAX_VALUE
    ) {
      onEnd?.();
    }
  }

  beginLineInterval = () => {
    this.interval = setInterval(() => {
      const { progress } = this.state;
      if (progress >= FLUX_PROGRESS_MAX_VALUE) {
        clearInterval(this.interval);
      } else {
        this.setState({
          progress: Math.min(
            FLUX_PROGRESS_MAX_VALUE,
            progress + FLUX_PROGRESS_INTERVAL_DELTA,
          ),
        });
      }
    }, SET_INTERVAL_TIME);
  };

  clearProgress = () => {
    this.setState({ progress: 0 });
  };

  renderText = () => {
    const { x, y, text, height, angle, width } = this.props;
    const { progress } = this.state;
    const currentBodyHeight = Math.min(
      (progress * height) / FLUX_PROGRESS_MAX_VALUE,
      height,
    );
    const convertedAngle = ((angle - 90) * Math.PI) / 180;
    const progressiveX =
      (currentBodyHeight - height) * Math.cos(convertedAngle) +
      FLUX_TEXT_WIDTH / 2;
    const progressiveY =
      (currentBodyHeight -
        height * (Math.abs(angle) < 90) -
        // adjustement factor due to center being at the head of the arrow
        height * (Math.abs(angle) > 90)) *
      Math.sin(convertedAngle);

    return (
      <Text
        x={x - progressiveX}
        y={y - progressiveY}
        text={text}
        fontSize={20}
        fontFamily="Arial"
        fill={FLUX_TEXT_COLOR}
        align="center"
        width={FLUX_TEXT_WIDTH}
      />
    );
  };

  render() {
    const { x, y, color, width, height, angle, show } = this.props;
    const { progress } = this.state;
    const currentBodyHeight = Math.min(
      (progress * height) / FLUX_PROGRESS_MAX_VALUE,
      height,
    );
    const originHeight = -height + currentBodyHeight;

    if (!show || progress === 0) {
      return null;
    }

    return (
      <Group>
        <Shape
          sceneFunc={(context, shape) => {
            context.beginPath();

            // draw arrow head
            // center point (0,0) is the at the middle of the hypothenuse
            context.moveTo(0, originHeight);
            context.lineTo(width / 2 + FLUX_MARGIN, originHeight);
            context.lineTo(0, FLUX_HEAD_HEIGHT + originHeight);
            context.lineTo(-width / 2 - FLUX_MARGIN, originHeight);

            // draw arrow body
            const leftX = -width / 2;
            const rightX = width / 2;
            context.lineTo(leftX, originHeight);

            const maxHeight = originHeight - currentBodyHeight; // Math.min(currentBodyHeight, -height);
            // draw left curves from bottom to top, and clip to height
            for (
              let i = 0;
              i < Math.ceil(currentBodyHeight / FLUX_WAVELENGTH);
              i += 1
            ) {
              context.quadraticCurveTo(
                leftX + FLUX_BODY_AMPLITUDE,
                Math.max(
                  originHeight +
                    Math.min(-(i * FLUX_WAVELENGTH + FLUX_WAVELENGTH / 4), 0),
                  maxHeight,
                ),
                leftX,
                Math.max(
                  originHeight +
                    Math.min(-(i * FLUX_WAVELENGTH + FLUX_WAVELENGTH / 2), 0),
                  maxHeight,
                ),
              );
              context.quadraticCurveTo(
                leftX - FLUX_BODY_AMPLITUDE,
                Math.max(
                  originHeight +
                    Math.min(
                      -(i * FLUX_WAVELENGTH + (FLUX_WAVELENGTH * 3) / 4),
                      0,
                    ),
                  maxHeight,
                ),
                leftX,
                Math.max(
                  originHeight + Math.min(-(i + 1) * FLUX_WAVELENGTH, 0),
                  maxHeight,
                ),
              );
            }

            context.lineTo(rightX, originHeight - currentBodyHeight);

            // draw right curves from top to bottom, and clip to height
            for (
              let i = Math.ceil(currentBodyHeight / FLUX_WAVELENGTH);
              i >= 0;
              i -= 1
            ) {
              context.quadraticCurveTo(
                rightX - FLUX_BODY_AMPLITUDE,
                Math.max(
                  originHeight +
                    Math.max(
                      -(i * FLUX_WAVELENGTH + (FLUX_WAVELENGTH * 3) / 4),
                      maxHeight,
                    ),
                  maxHeight,
                ),
                rightX,
                Math.max(
                  originHeight +
                    Math.max(
                      -(i * FLUX_WAVELENGTH + FLUX_WAVELENGTH / 2),
                      maxHeight,
                    ),
                  maxHeight,
                ),
              );
              context.quadraticCurveTo(
                rightX + FLUX_BODY_AMPLITUDE,
                Math.max(
                  originHeight +
                    Math.max(
                      -(i * FLUX_WAVELENGTH + FLUX_WAVELENGTH / 4),
                      maxHeight,
                    ),
                  maxHeight,
                ),
                rightX,
                Math.max(
                  originHeight + Math.max(-i * FLUX_WAVELENGTH, maxHeight),
                  maxHeight,
                ),
              );
            }

            context.closePath();

            // (!) Konva specific method, it is very important
            context.fillStrokeShape(shape);
          }}
          x={x}
          y={y}
          fill={color}
          strokeWidth={4}
          shadowBlur={2}
          fillPriority="shadow"
          rotation={angle}
        />
        {this.renderText()}
      </Group>
    );
  }
}

const mapStateToProps = ({ lab }) => ({
  isPaused: lab.isPaused,
});

const ConnectedComponent = connect(mapStateToProps)(Flux);
export default ConnectedComponent;
