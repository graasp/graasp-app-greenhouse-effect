import {
  CLOUD_ADJACENT_CIRCLE_RADIUS,
  CLOUD_PERIPHERAL_CIRCLE_RADIUS,
} from '../../constants';

export const generateCloudCircles = (
  centralCircleRadiusX,
  centralCircleRadiusY,
  centralCircleX,
) => {
  const adjacentCircleRadiusX =
    centralCircleRadiusX * CLOUD_ADJACENT_CIRCLE_RADIUS;
  const adjacentCircleRadiusY =
    centralCircleRadiusY * CLOUD_ADJACENT_CIRCLE_RADIUS;
  const peripheralCircleRadiusX =
    centralCircleRadiusX * CLOUD_PERIPHERAL_CIRCLE_RADIUS;
  const peripheralCircleRadiusY =
    centralCircleRadiusY * CLOUD_PERIPHERAL_CIRCLE_RADIUS;

  const circleOne = {
    radiusX: peripheralCircleRadiusX,
    radiusY: peripheralCircleRadiusY,
    x: centralCircleX - centralCircleRadiusX - adjacentCircleRadiusX,
  };

  const circleTwo = {
    radiusX: adjacentCircleRadiusX,
    radiusY: adjacentCircleRadiusY,
    x: centralCircleX - centralCircleRadiusX,
  };

  const circleThree = {
    radiusX: centralCircleRadiusX,
    radiusY: centralCircleRadiusY,
    x: centralCircleX,
  };

  const circleFour = {
    radiusX: adjacentCircleRadiusX,
    radiusY: adjacentCircleRadiusY,
    x: centralCircleX + centralCircleRadiusX,
  };

  const circleFive = {
    radiusX: peripheralCircleRadiusX,
    radiusY: peripheralCircleRadiusY,
    x: centralCircleX + centralCircleRadiusX + adjacentCircleRadiusX,
  };

  return [circleOne, circleTwo, circleThree, circleFour, circleFive];
};
