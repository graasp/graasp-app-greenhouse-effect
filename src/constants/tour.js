import TOUR_STEPS from '../config/tour-steps';

// eslint-disable-next-line import/prefer-default-export
export const INITIAL_TOUR_STATE = {
  run: false,
  continuous: true,
  loading: false,
  stepIndex: 0,
  steps: TOUR_STEPS,
};
