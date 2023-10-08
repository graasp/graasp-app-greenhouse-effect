import { MAX_CARBON_DIOXIDE_DEFAULT, MAX_METHANE, MAX_WATER } from '../physics';
import { CARBON_DIOXIDE, METHANE, WATER } from '../strings';

export const ATOM_DIMENSIONS = { small: 0.003, medium: 0.006 };
export const CARBON = {
  atomColor: 'black',
  size: 'medium',
};
export const OXYGEN = {
  atomColor: 'indianred',
  size: 'medium',
};
export const HYDROGEN = {
  atomColor: 'gray',
  size: 'small',
};
export const MOLECULE_DISTRIBUTION_MIN_X = 0.01;
// to avoid clashes with therometer, don't place molecules more than this constant from beginning of canvas
export const MOLECULE_DISTRIBUTION_MAX_X = 0.99;

export const GREENHOUSE_GASES_MAX_COUNTS = [
  {
    name: CARBON_DIOXIDE,
    maxCount: MAX_CARBON_DIOXIDE_DEFAULT,
  },
  { name: METHANE, maxCount: MAX_METHANE },
  { name: WATER, maxCount: MAX_WATER },
];

export const DISTRIBUTION_SCALARS = {};
DISTRIBUTION_SCALARS[CARBON_DIOXIDE] = 10;
DISTRIBUTION_SCALARS[METHANE] = 1;
DISTRIBUTION_SCALARS[WATER] = 20;

export const MARS_ZOOM_CARBON_DIOXIDE = 3;
export const VENUS_ZOOM_CARBON_DIOXIDE = 400;
