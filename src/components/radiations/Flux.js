/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Shape, Text, Group } from 'react-konva';
import {
  BLINKING_SHADOW_COLOR,
  DEFAULT_SHADOW_COLOR,
  FLUX_BODY_AMPLITUDE,
  FLUX_HEAD_HEIGHT,
  FLUX_MARGIN,
  FLUX_PROGRESS_INTERVAL_DELTA,
  FLUX_PROGRESS_MAX_VALUE,
  FLUX_TEXT_COLOR,
  FLUX_TEXT_FONT_SIZE,
  FLUX_TEXT_STROKE_WIDTH,
  FLUX_TEXT_WIDTH,
  FLUX_WAVELENGTH,
  SET_INTERVAL_PAUSED_ANIMATION_TIME,
  SET_INTERVAL_TIME,
} from '../../config/constants';

class Flux extends Component {
  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    angle: PropTypes.number,
    isPaused: PropTypes.bool.isRequired,
    show: PropTypes.bool,
    onEnd: PropTypes.func,
    progress: PropTypes.number.isRequired,
    setProgress: PropTypes.func.isRequired,
    enableBlinking: PropTypes.bool,
  };

  static defaultProps = {
    angle: 0,
    onEnd: null,
    show: false,
    enableBlinking: false,
  };

  state = {
    shadowColor: DEFAULT_SHADOW_COLOR,
  };

  interval = null;

  pausedAnimation = null;

  componentDidUpdate({
    isPaused: prevIsPaused,
    show: prevShow,
    progress: prevProgress,
    enableBlinking: prevEnableBlinking,
  }) {
    // eslint-disable-next-line react/prop-types
    const {
      isPaused,
      show,
      onEnd,
      progress,
      setProgress,
      enableBlinking,
    } = this.props;

    if (isPaused !== prevIsPaused && isPaused) {
      clearInterval(this.animationInterval);
    }
    // continue progress on play
    else if (isPaused !== prevIsPaused && !isPaused && show) {
      this.beginLineIntervalForAnimation();
    }
    // continue animation
    else if (!isPaused && show !== prevShow && show) {
      // eslint-disable-next-line react/no-did-update-set-state
      setProgress(0);
      this.beginLineIntervalForAnimation();
    }

    // alerts when the line is fully drawn
    if (
      prevProgress < FLUX_PROGRESS_MAX_VALUE &&
      progress >= FLUX_PROGRESS_MAX_VALUE
    ) {
      onEnd?.();
    }

    // enable settings when blinking is enabled
    if (enableBlinking && enableBlinking !== prevEnableBlinking && show) {
      this.beginPausedAnimation();
    }
    // disable blinking on play
    if (this.pausedAnimation && !isPaused && isPaused !== prevIsPaused) {
      clearInterval(this.pausedAnimation);
      this.pausedAnimation = null;
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ shadowColor: DEFAULT_SHADOW_COLOR });
    }
  }

  beginLineIntervalForAnimation = () => {
    this.animationInterval = setInterval(() => {
      const { progress, setProgress } = this.props;
      if (progress >= FLUX_PROGRESS_MAX_VALUE) {
        clearInterval(this.animationInterval);
      } else {
        setProgress(
          Math.min(
            FLUX_PROGRESS_MAX_VALUE,
            progress + FLUX_PROGRESS_INTERVAL_DELTA,
          ),
        );
      }
    }, SET_INTERVAL_TIME);
  };

  beginPausedAnimation = () => {
    this.pausedAnimation = setInterval(() => {
      const { shadowColor } = this.state;
      this.setState({
        shadowColor:
          shadowColor === BLINKING_SHADOW_COLOR
            ? DEFAULT_SHADOW_COLOR
            : BLINKING_SHADOW_COLOR,
      });
    }, SET_INTERVAL_PAUSED_ANIMATION_TIME);
  };

  clearProgress = () => {
    const { setProgress } = this.props;
    setProgress(0);
  };

  renderText = () => {
    const { x, y, text, height, angle, color, progress } = this.props;
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
        stroke={color}
        strokeWidth={FLUX_TEXT_STROKE_WIDTH}
        fillAfterStrokeEnabled
        x={x - progressiveX}
        y={y - progressiveY}
        text={text}
        fontSize={FLUX_TEXT_FONT_SIZE}
        fontFamily="Arial"
        fill={FLUX_TEXT_COLOR}
        align="center"
        width={FLUX_TEXT_WIDTH}
      />
    );
  };

  render() {
    const { x, y, color, width, height, angle, show, progress } = this.props;
    const { shadowColor } = this.state;
    const currentBodyHeight = Math.min(
      (progress * height) / FLUX_PROGRESS_MAX_VALUE,
      height,
    );
    const originHeight = -height + currentBodyHeight;

    if (!show || progress === 0) {
      return null;
    }

    if (width === 0) {
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
          shadowColor={shadowColor}
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
