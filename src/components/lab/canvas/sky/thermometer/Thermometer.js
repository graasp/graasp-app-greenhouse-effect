import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Group } from 'react-konva';
import {
  THERMOMETER_BASE_WIDTH,
  THERMOMETER_BEGINS_X,
  THERMOMETER_BEGINS_Y,
  THERMOMETER_BULB_RADIUS,
  THERMOMETER_HEIGHT,
  THERMOMETER_SCALE_NUM_GRADES,
} from '../../../../../constants';
import {
  determineBulbCoordinates,
  generateThermometerLabels,
  generateThermometerRectanglePoints,
} from '../../../../../utils';
import ThermometerBody from './ThermometerBody';
import ThermometerBulb from './ThermometerBulb';
import CurrentTemperature from './CurrentTemperature';
import { SkyDimensionsContext } from '../../../../contexts/canvas-dimensions/SkyDimensionsProvider';
import ThermometerScale from './ThermometerScale';
import ThermometerFill from './ThermometerFill';

const Thermometer = ({ cursorBecomesDefault, cursorBecomesZoomIn }) => {
  const { thermometerTemperature } = useSelector(({ lab }) => lab);
  const { skyHeight, skyWidth, skyBeginsX, skyBeginsY } = useContext(
    SkyDimensionsContext,
  );
  const { scaleUnit } = useSelector(({ lab }) => lab);
  const scaleName = scaleUnit.name;
  const scaleLabel = scaleUnit.label;

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
  } = determineBulbCoordinates(thermometerBaseWidth, thermometerBulbRadius);

  const theremometerScaleLabels = generateThermometerLabels(
    THERMOMETER_SCALE_NUM_GRADES,
    scaleName,
  );

  return (
    <Group
      onMouseEnter={cursorBecomesDefault}
      onMouseLeave={cursorBecomesZoomIn}
      x={thermometerBeginsX}
      y={thermometerBeginsY}
    >
      <ThermometerBody
        thermometerRectanglePoints={thermometerRectanglePoints}
        thermometerBulbRadius={thermometerBulbRadius}
      />
      <ThermometerBulb
        thermometerBulbBeginsX={thermometerBulbBeginsX}
        thermometerBulbBeginsY={thermometerBulbBeginsY}
        thermometerBulbRadius={thermometerBulbRadius}
      />
      <CurrentTemperature
        thermometerBodyHeight={thermometerBodyHeight}
        thermometerBaseWidth={thermometerBaseWidth}
        temperature={thermometerTemperature}
        scaleName={scaleName}
        scaleLabel={scaleLabel}
      />
      <ThermometerFill
        thermometerBodyHeight={thermometerBodyHeight}
        thermometerBaseWidth={thermometerBaseWidth}
        temperature={thermometerTemperature}
        scaleName={scaleName}
        labels={theremometerScaleLabels}
      />
      <ThermometerScale
        thermometerBodyHeight={thermometerBodyHeight}
        labels={theremometerScaleLabels}
      />
    </Group>
  );
};

Thermometer.propTypes = {
  cursorBecomesDefault: PropTypes.func.isRequired,
  cursorBecomesZoomIn: PropTypes.func.isRequired,
};

export default Thermometer;
