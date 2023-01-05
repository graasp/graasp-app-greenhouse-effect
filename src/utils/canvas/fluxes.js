import { toggleFluxesFills } from '../../actions';
import {
  FLUX_BLINKING_INTERVAL,
  FLUX_WIDTH_AS_PERCENTAGE_OF_FLUX_VALUE,
  LARGE_FLUX,
  MAXIMUM_FLUX_WIDTH_AS_PERCENTAGE_OF_STAGE_WIDTH,
  UP_STRING,
} from '../../constants';

export const generateFluxPointerPoints = (
  direction,
  pointerWidth,
  pointerHeight,
) => {
  return direction === UP_STRING
    ? [0, 0, pointerWidth / 2, pointerHeight, -pointerWidth / 2, pointerHeight]
    : [0, 0, pointerWidth / 2, 0, 0, pointerHeight, -pointerWidth / 2, 0];
};

export const calculateFluxWidth = (flux, stageWidth) => {
  if (flux > LARGE_FLUX) {
    // if a flux is LARGE, take maximum possible flux size and scale it by 1.35
    return stageWidth * MAXIMUM_FLUX_WIDTH_AS_PERCENTAGE_OF_STAGE_WIDTH * 1.35;
  }

  // to ensure fluxes aren't too large, cap their size via Math.min(...)
  return Math.min(
    flux * FLUX_WIDTH_AS_PERCENTAGE_OF_FLUX_VALUE,
    stageWidth * MAXIMUM_FLUX_WIDTH_AS_PERCENTAGE_OF_STAGE_WIDTH,
  );
};

export const stopFluxesBlinking = () => {
  clearInterval(window.fluxBlinkingInterval);
};

export const keepFluxesBlinking = (fluxes, dispatch) => {
  stopFluxesBlinking();
  window.fluxBlinkingInterval = setInterval(() => {
    dispatch(toggleFluxesFills(fluxes));
  }, FLUX_BLINKING_INTERVAL);
};
