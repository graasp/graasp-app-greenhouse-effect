import React from 'react';
import PropTypes from 'prop-types';
import { Arrow, Text } from 'react-konva';
import { FLUX_TEXT_COLOR } from '../../config/constants';

const Flux = ({ x, y, color, width, height, text, angle }) => {
  return (
    <>
      <Arrow
        x={x}
        y={y}
        pointerLength={3}
        /** create an approximative set of points depending on the angle, width and height
         * todo: might need to refine it
         */
        points={[0, 0, width * Math.cos(angle), height * Math.sin(angle)]}
        pointerWidth={5}
        stroke={color}
        strokeWidth={width}
        shadowBlur={2}
        fillPriority="shadow"
      />
      <Text
        x={x - 5 * text.length + (width * Math.cos(angle)) / 2}
        y={y + (height * Math.sin(angle)) / 2}
        text={text}
        fontSize={20}
        fontFamily="Arial"
        fill={FLUX_TEXT_COLOR}
      />
    </>
  );
};

Flux.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  angle: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
};

export default Flux;
