import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import {
  HOUSE_FRONT_WIDTH,
  HOUSE_HEIGHT,
  HOUSE_SIDE_WIDTH,
  HOUSE_ROOF_HEIGHT,
  DEFAULT_NUMBER_OF_HOUSES_IN_ROW,
  HOUSE_ROW_BEGINS_Y,
  HOUSE_ROW_BEGINS_X,
  X_DISTANCE_BETWEEN_HOUSES,
  SIMULATION_MODES,
} from '../../../../../config/constants';
import House from './House';
import { GroundDimensionsContext } from '../../../../contexts/canvas-dimensions/GroundDimensionsProvider';

const HouseRow = () => {
  const {
    groundHeight,
    groundWidth,
    groundBeginsX,
    groundBeginsY,
  } = useContext(GroundDimensionsContext);
  const { simulationMode } = useSelector(({ lab }) => lab);

  // house dimensions
  const houseFrontWidth = HOUSE_FRONT_WIDTH * groundWidth;
  const houseSideWidth = HOUSE_SIDE_WIDTH * groundWidth;
  const houseTotalWidth = houseFrontWidth + houseSideWidth;
  const houseHeight = HOUSE_HEIGHT * groundHeight;
  const houseRoofHeight = HOUSE_ROOF_HEIGHT * groundHeight;

  //   house positioning
  const houseRowBeginsY = groundBeginsY + HOUSE_ROW_BEGINS_Y * groundHeight;
  const houseRowBeginsX = groundBeginsX + HOUSE_ROW_BEGINS_X * groundWidth;
  const xDistanceBetweenHouses = X_DISTANCE_BETWEEN_HOUSES * groundWidth;

  const numHousesInRow =
    simulationMode !== SIMULATION_MODES.TWENTIETH_CENTURY.name
      ? DEFAULT_NUMBER_OF_HOUSES_IN_ROW
      : DEFAULT_NUMBER_OF_HOUSES_IN_ROW - 1;

  const houses = new Array(numHousesInRow).fill().map((emptyElement, index) => (
    <House
      houseFrontWidth={houseFrontWidth}
      houseSideWidth={houseSideWidth}
      houseHeight={houseHeight}
      houseRoofHeight={houseRoofHeight}
      x={houseRowBeginsX + index * (xDistanceBetweenHouses + houseTotalWidth)}
      y={houseRowBeginsY}
      // eslint-disable-next-line react/no-array-index-key
      key={index}
    />
  ));

  return houses;
};

export default HouseRow;
