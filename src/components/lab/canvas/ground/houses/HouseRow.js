import React, { useContext } from 'react';
import {
  HOUSE_FRONT_WIDTH,
  HOUSE_HEIGHT,
  HOUSE_SIDE_WIDTH,
  HOUSE_ROOF_HEIGHT,
  DEFAULT_NUMBER_OF_HOUSES_IN_ROW,
  HOUSE_ROW_BEGINS_Y,
  HOUSE_ROW_BEGINS_X,
  X_DISTANCE_BETWEEN_HOUSES,
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

  // **TODO**: number of houses determined by global state (more houses <-> more pollution)
  const houses = new Array(DEFAULT_NUMBER_OF_HOUSES_IN_ROW)
    .fill()
    .map((emptyElement, index) => (
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
