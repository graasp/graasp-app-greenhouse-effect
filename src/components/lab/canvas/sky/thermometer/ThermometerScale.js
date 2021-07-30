/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Group, Text, Rect } from 'react-konva';
import {
  SCALE_HEIGHT,
  SCALE_FONT_SIZE,
  SCALE_WIDTH,
  SCALE_LINE_HEIGHT,
  THERMOMETER_FILL,
  THERMOMETER_BORDER_COLOR,
  SCALE_MAX_NUMBER_TICKS,
  SCALE_PADDING_RIGHT,
  SCALE_UNITS,
  THERMOMETER_MIN_VALUE_IN_KELVIN,
  THERMOMETER_MAX_VALUE_IN_KELVIN,
  SCALE_PADDING_LEFT,
} from '../../../../../config/constants';
import {
  celsiusToKelvin,
  kelvinToCelsius,
} from '../../../../../utils/greenhouseEffect';

// compute the corresponding height in px given the temperature
const temperatureToHeight = ({
  currentTemperature,
  deltaTemperatureHeight,
  minTemperature,
  maxTemperature,
}) => {
  let value = currentTemperature;
  if (value < minTemperature) {
    value = minTemperature;
  } else if (value > maxTemperature) {
    value = maxTemperature;
  }
  return (-minTemperature + value) * deltaTemperatureHeight;
};

const renderScales = ({
  scales,
  x: offsetX,
  offsetY,
  scaleXOffset,
  textXOffset,
}) => (
  <>
    {/* legend */}
    {scales.map(({ text, y }) => {
      const thermometerYPosition = offsetY - y;

      return (
        <Group key={text} y={thermometerYPosition} x={offsetX}>
          <Text
            x={textXOffset - SCALE_PADDING_LEFT}
            y={-SCALE_FONT_SIZE / 3}
            text={text}
            fontSize={SCALE_FONT_SIZE}
          />
          <Rect
            x={scaleXOffset}
            width={SCALE_WIDTH}
            height={SCALE_LINE_HEIGHT}
            fill={THERMOMETER_BORDER_COLOR}
          />
        </Group>
      );
    })}
  </>
);

const buildKelvinScales = ({
  to,
  from,
  tickStep,
  thermometerBodyHeight,
  offsetY,
  offsetX,
  deltaHeight,
}) => {
  // compute text and y position for kelvin scales
  let scales = Array.from(
    {
      length: (to - from) / tickStep + 1, // +1 to include max
    },
    (key, idx) => {
      const value = idx * tickStep + from;
      return { text: value, y: (value - from) * deltaHeight };
    },
  );

  // select marks at most number of scale we can display
  const maxNbScale = Math.floor(thermometerBodyHeight / SCALE_HEIGHT);
  const prop = Math.ceil(scales.length / maxNbScale);
  if (prop > 1) {
    scales = scales.filter((_, i) => i % prop === 0);
  }

  // draw scale ticks
  const ScaleComponents = renderScales({
    offsetY: offsetY + thermometerBodyHeight - SCALE_LINE_HEIGHT,
    x: offsetX,
    scales,
    scaleXOffset: 0,
    textXOffset: -SCALE_PADDING_RIGHT - SCALE_WIDTH,
  });

  return ScaleComponents;
};

const buildCelsiusScales = ({
  from,
  to,
  roundFromKelvin,
  deltaKelvinHeight,
  offsetY,
  offsetX,
}) => {
  // get celsium degree from kelvin thermometer boundaries
  const celsiusFrom = kelvinToCelsius(from);
  const celsiusTo = kelvinToCelsius(to);

  // compute ideal step between ticks
  const celsiusTickStep = Math.ceil(
    (Math.abs(celsiusTo) + Math.abs(celsiusFrom)) / SCALE_MAX_NUMBER_TICKS,
  );

  // round min and max to closest scale steps
  // these bounds might not include from and to values
  const celsiusRoundFrom =
    celsiusTickStep * Math.ceil(celsiusFrom / celsiusTickStep);
  const celsiusRoundTo =
    celsiusTickStep * Math.floor(celsiusTo / celsiusTickStep);

  // compute scales text and y position based on kelvin scales
  const celsiusScales = Array.from(
    {
      length: (celsiusRoundTo - celsiusRoundFrom) / celsiusTickStep + 1, // +1 to include max
    },
    (key, idx) => {
      const value = idx * celsiusTickStep + celsiusRoundFrom;
      return {
        text: value,
        y:
          (celsiusToKelvin(value) - Math.abs(roundFromKelvin)) *
          deltaKelvinHeight,
      };
    },
  );

  // draw scale ticks
  const CelsiusScaleComponents = renderScales({
    offsetY,
    x: offsetX,
    scales: celsiusScales,
    scaleXOffset: 0,
    textXOffset: -SCALE_PADDING_RIGHT - SCALE_WIDTH,
  });

  return CelsiusScaleComponents;
};

const ThermometerScale = ({
  currentTemperature,
  thermometerBodyHeight,
  showKelvinScale,
  thermometerBaseWidth,
  thermometerBeginsY,
  thermometerBeginsX,
}) => {
  const from = THERMOMETER_MIN_VALUE_IN_KELVIN;
  const to = THERMOMETER_MAX_VALUE_IN_KELVIN;
  const thermometerXPosition = thermometerBeginsX;
  const offsetY = thermometerBeginsY - thermometerBodyHeight;

  // compute ideal step distance between ticks
  const tickStep = Math.ceil(
    (Math.abs(to) - Math.abs(from)) / SCALE_MAX_NUMBER_TICKS,
  );

  // round min and max to closest scale steps
  const roundFrom = tickStep * Math.floor(from / tickStep);
  const roundTo = tickStep * Math.ceil(to / tickStep) || tickStep;

  // height in pixel for one degree kelvin
  const deltaKelvinHeight = thermometerBodyHeight / (roundTo - roundFrom);

  // build kelvin scales
  const KelvinScaleComponents = showKelvinScale
    ? buildKelvinScales({
        from: roundFrom,
        to: roundTo,
        offsetY,
        thermometerXPosition,
        offsetX: thermometerXPosition,
        tickStep,
        thermometerBodyHeight,
        deltaHeight: deltaKelvinHeight,
      })
    : null;

  // build celsius scales
  const CelsiusScaleComponents = !showKelvinScale
    ? buildCelsiusScales({
        from,
        to,
        offsetY: offsetY + thermometerBodyHeight - SCALE_LINE_HEIGHT,
        offsetX: thermometerXPosition,
        roundFromKelvin: roundFrom,
        deltaKelvinHeight,
        thermometerBodyHeight,
      })
    : null;

  // compute fill height given current temperature value
  const fillValue = temperatureToHeight({
    deltaTemperatureHeight: deltaKelvinHeight,
    currentTemperature,
    minTemperature: roundFrom,
    maxTemperature: roundTo,
  });

  // absolute y position for given temperature
  const currentTemperatureY = offsetY + thermometerBodyHeight - fillValue;

  return (
    <>
      {/* current temperature fill */}
      <Rect
        fill={THERMOMETER_FILL}
        x={thermometerBeginsX}
        y={currentTemperatureY}
        width={thermometerBaseWidth}
        height={fillValue}
      />

      {/* scales */}
      {showKelvinScale && KelvinScaleComponents}
      {!showKelvinScale && CelsiusScaleComponents}
    </>
  );
};

ThermometerScale.propTypes = {
  currentTemperature: PropTypes.number.isRequired,
  thermometerBodyHeight: PropTypes.number.isRequired,
  showKelvinScale: PropTypes.bool.isRequired,
  thermometerBaseWidth: PropTypes.number.isRequired,
  thermometerBeginsY: PropTypes.number.isRequired,
  thermometerBeginsX: PropTypes.number.isRequired,
};

const mapStateToProps = ({ lab }) => ({
  scales: lab.scales,
  showKelvinScale: lab.scaleUnit === SCALE_UNITS.KELVIN,
});

export default connect(mapStateToProps)(ThermometerScale);
