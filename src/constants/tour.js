import TOUR_STEPS from '../config/tour-steps';

export const INITIAL_TOUR_STATE = {
  run: false,
  continuous: true,
  loading: false,
  stepIndex: 0,
  steps: TOUR_STEPS,
};
