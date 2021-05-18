import React from 'react';
import PropTypes from 'prop-types';
import {
  HOUSEHOLD_FRONT_WIDTH,
  HOUSEHOLD_HEIGHT,
  HOUSEHOLD_SIDE_WIDTH,
  HOUSEHOLD_ROOF_HEIGHT,
  DEFAULT_NUMBER_OF_HOUSEHOLDS_IN_ROW,
  HOUSEHOLD_ROW_BEGINS_Y,
  HOUSEHOLD_ROW_BEGINS_X,
  X_DISTANCE_BETWEEN_HOUSEHOLDS,
} from '../../../../config/constants';
import Household from './Household';

const HouseholdRow = ({
  groundHeight,
  groundWidth,
  groundBeginsX,
  groundBeginsY,
}) => {
  // household dimensions
  const householdFrontWidth = HOUSEHOLD_FRONT_WIDTH * groundWidth;
  const householdSideWidth = HOUSEHOLD_SIDE_WIDTH * groundWidth;
  const householdTotalWidth = householdFrontWidth + householdSideWidth;
  const householdHeight = HOUSEHOLD_HEIGHT * groundHeight;
  const householdRoofHeight = HOUSEHOLD_ROOF_HEIGHT * groundHeight;

  //   household positioning
  const householdRowBeginsY =
    groundBeginsY + HOUSEHOLD_ROW_BEGINS_Y * groundHeight;
  const householdRowBeginsX =
    groundBeginsX + HOUSEHOLD_ROW_BEGINS_X * groundWidth;
  const xDistanceBetweenHouseholds =
    X_DISTANCE_BETWEEN_HOUSEHOLDS * groundWidth;

  // **TODO**: number of households determined by global state (more households <-> more pollution)
  const households = new Array(DEFAULT_NUMBER_OF_HOUSEHOLDS_IN_ROW)
    .fill()
    .map((emptyElement, index) => (
      <Household
        householdFrontWidth={householdFrontWidth}
        householdSideWidth={householdSideWidth}
        householdHeight={householdHeight}
        householdRoofHeight={householdRoofHeight}
        x={
          householdRowBeginsX +
          index * (xDistanceBetweenHouseholds + householdTotalWidth)
        }
        y={householdRowBeginsY}
        // eslint-disable-next-line react/no-array-index-key
        key={index}
      />
    ));

  return <>{households}</>;
};

HouseholdRow.propTypes = {
  groundHeight: PropTypes.number.isRequired,
  groundWidth: PropTypes.number.isRequired,
  groundBeginsX: PropTypes.number.isRequired,
  groundBeginsY: PropTypes.number.isRequired,
};

export default HouseholdRow;
