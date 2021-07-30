import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Group } from 'react-konva';
import { useSelector } from 'react-redux';
import {
  CHANGING_TEMPERATURE_SPEED,
  THERMOMETER_BASE_WIDTH,
  THERMOMETER_BEGINS_X,
  THERMOMETER_BEGINS_Y,
  THERMOMETER_BULB_RADIUS,
  THERMOMETER_HEIGHT,
} from '../../../../../config/constants';
import {
  determineBulbCoordinates,
  generateThermometerRectanglePoints,
} from '../../../../../utils/canvas';
import ThermometerBody from './ThermometerBody';
import ThermometerBulb from './ThermometerBulb';
import ThermometerScale from './ThermometerScale';
import {
  computeAlbedo,
  computeCurrentTemperature,
  computeGreenhouseEffect,
} from '../../../../../utils/greenhouseEffect';
import CurrentTemperature from './CurrentTemperature';

const Thermometer = ({
  skyHeight,
  skyWidth,
  skyBeginsX,
  skyBeginsY,
  cursorBecomesDefault,
  cursorBecomesZoomIn,
}) => {
  const albedoValues = useSelector(({ lab }) => lab.albedo);
  const { albedo } = computeAlbedo(albedoValues);
  const greenhouseEffectGases = useSelector(
    ({ lab }) => lab.greenhouseGasesValues,
  );
  const isPaused = useSelector(({ lab }) => lab.isPaused);
  const thermometerBeginsX = skyBeginsX + THERMOMETER_BEGINS_X * skyWidth;
  const thermometerBeginsY = skyBeginsY + THERMOMETER_BEGINS_Y * skyHeight;
  const thermometerBaseWidth = THERMOMETER_BASE_WIDTH * skyWidth;
  const thermometerBodyHeight = THERMOMETER_HEIGHT * skyHeight;

  // thermometer rectangle points are used to draw both (1) the body of the thermometer,
  // and (2) the fill of the thermometer (i.e. what temperature it is currently on)
  const thermometerRectanglePoints = generateThermometerRectanglePoints(
    thermometerBaseWidth,
    thermometerBodyHeight,
  );

  // thermometer bulb (circular part at the bottom of the thermometer)
  const thermometerBulbRadius = THERMOMETER_BULB_RADIUS * skyWidth;
  const {
    x: thermometerBulbBeginsX,
    y: thermometerBulbBeginsY,
  } = determineBulbCoordinates(
    thermometerBeginsX,
    thermometerBeginsY,
    thermometerBaseWidth,
    thermometerBulbRadius,
  );

  const greenhouseEffect = computeGreenhouseEffect(greenhouseEffectGases);

  // temperature
  const [temperature, setTemperature] = useState(
    computeCurrentTemperature({ greenhouseEffect, albedo }),
  );

  // save temperature value
  // changing settings while paused won't change the temperature
  useEffect(() => {
    if (!isPaused) {
      // new temperature
      const t = computeCurrentTemperature({ greenhouseEffect, albedo });

      // slowly increase temperature
      if (Math.abs(t - temperature) > CHANGING_TEMPERATURE_SPEED) {
        setTemperature(
          temperature + Math.sign(t - temperature) * CHANGING_TEMPERATURE_SPEED,
        );
      } else if (temperature !== t) {
        setTemperature(t);
      }
    }
  }, [temperature, isPaused]);

  return (
    <Group
      onMouseEnter={cursorBecomesDefault}
      onMouseLeave={cursorBecomesZoomIn}
    >
      <ThermometerBulb
        thermometerBulbBeginsX={thermometerBulbBeginsX}
        thermometerBulbBeginsY={thermometerBulbBeginsY}
        thermometerBulbRadius={thermometerBulbRadius}
      />
      <ThermometerBody
        thermometerBeginsX={thermometerBeginsX}
        thermometerBeginsY={thermometerBeginsY}
        thermometerRectanglePoints={thermometerRectanglePoints}
      />
      <ThermometerScale
        thermometerBeginsX={thermometerBeginsX}
        thermometerBeginsY={thermometerBeginsY}
        thermometerBaseWidth={thermometerBaseWidth}
        thermometerBodyHeight={thermometerBodyHeight}
        currentTemperature={temperature}
      />
      <CurrentTemperature
        thermometerBeginsX={thermometerBeginsX}
        thermometerBeginsY={thermometerBeginsY}
        thermometerBodyHeight={thermometerBodyHeight}
        thermometerBaseWidth={thermometerBaseWidth}
        temperature={temperature}
      />
    </Group>
  );
};

Thermometer.propTypes = {
  skyHeight: PropTypes.number.isRequired,
  skyWidth: PropTypes.number.isRequired,
  skyBeginsX: PropTypes.number.isRequired,
  skyBeginsY: PropTypes.number.isRequired,
  cursorBecomesDefault: PropTypes.func.isRequired,
  cursorBecomesZoomIn: PropTypes.func.isRequired,
};

export default Thermometer;
