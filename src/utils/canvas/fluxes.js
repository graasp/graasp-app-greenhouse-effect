import { toggleFluxesFills } from '../../actions';
import {
  FLUX_BLINKING_INTERVAL,
  ENERGY_WIDTH_AS_PERCENTAGE_OF_ENERGY_VALUE,
  LARGE_ENERGY,
  LARGE_ENERGY_WIDTH_AS_PERCENTAGE_OF_STAGE_WIDTH,
  SOLAR_FLUXES,
  STEFAN_BOLTZMANN_CONSTANT,
  UP_STRING,
  EXTRA_LARGE_ENERGY,
  EXTRA_LARGE_ENERGY_WIDTH_AS_PERCENTAGE_OF_STAGE_WIDTH,
  ENERGY_WIDTH_AS_PERCENTAGE_OF_STAGE_WIDTH,
  SIMULATION_MODES,
  NET_FLUX_FIXED_WIDTH,
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

export const calculateEnergyWidth = (energy, stageWidth, netFlux = false) => {
  if (netFlux) {
    return NET_FLUX_FIXED_WIDTH;
  }

  if (energy >= EXTRA_LARGE_ENERGY) {
    return stageWidth * EXTRA_LARGE_ENERGY_WIDTH_AS_PERCENTAGE_OF_STAGE_WIDTH;
  }

  if (energy >= LARGE_ENERGY) {
    return stageWidth * LARGE_ENERGY_WIDTH_AS_PERCENTAGE_OF_STAGE_WIDTH;
  }

  return (
    energy *
    ENERGY_WIDTH_AS_PERCENTAGE_OF_ENERGY_VALUE *
    stageWidth *
    ENERGY_WIDTH_AS_PERCENTAGE_OF_STAGE_WIDTH
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

export const computeEarthEnergies = (temperature, greenhouseEffect) => {
  const groundToSky = Math.round(STEFAN_BOLTZMANN_CONSTANT * temperature ** 4);
  const skyToGround = greenhouseEffect * groundToSky;
  const skyToAtmosphere = groundToSky - skyToGround;
  return { groundToSky, skyToGround, skyToAtmosphere };
};

export const computeSunEnergies = (
  cloudAlbedo,
  totalAlbedo,
  simulationMode,
) => {
  const sunToCloud = SOLAR_FLUXES[simulationMode];
  let cloudToAtmosphere = cloudAlbedo * sunToCloud;
  if (simulationMode === SIMULATION_MODES.VENUS.name) {
    cloudToAtmosphere = totalAlbedo * sunToCloud;
  }
  const cloudToGround = sunToCloud - cloudToAtmosphere;
  let groundToAtmosphere = sunToCloud * (totalAlbedo - cloudAlbedo);
  if (simulationMode === SIMULATION_MODES.VENUS.name) {
    groundToAtmosphere = 0;
  }
  return { sunToCloud, cloudToAtmosphere, cloudToGround, groundToAtmosphere };
};
