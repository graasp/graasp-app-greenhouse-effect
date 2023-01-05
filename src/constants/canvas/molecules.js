import {
  CARBON_DIOXIDE_CONCENTRATION_MAX_VALUE_DEFAULT,
  METHANE_CONCENTRATION_MAX_VALUE,
  WATER_CONCENTRATION_MAX_VALUE,
} from '../physics';
import {
  CARBON_DIOXIDE_STRING,
  METHANE_STRING,
  WATER_STRING,
} from '../strings';

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
    name: CARBON_DIOXIDE_STRING,
    maxCount: CARBON_DIOXIDE_CONCENTRATION_MAX_VALUE_DEFAULT,
  },
  { name: METHANE_STRING, maxCount: METHANE_CONCENTRATION_MAX_VALUE },
  { name: WATER_STRING, maxCount: WATER_CONCENTRATION_MAX_VALUE },
];

export const GREENHOUSE_GAS_DISTRIBUTION_SCALE_FACTORS = {};
GREENHOUSE_GAS_DISTRIBUTION_SCALE_FACTORS[CARBON_DIOXIDE_STRING] = 10;
GREENHOUSE_GAS_DISTRIBUTION_SCALE_FACTORS[METHANE_STRING] = 1;
GREENHOUSE_GAS_DISTRIBUTION_SCALE_FACTORS[WATER_STRING] = 20;
