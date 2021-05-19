import { RADIATION_STATES } from '../config/constants';
import { SET_NEXT_STATE } from '../types';

const INITIAL_STATE = {
  state: RADIATION_STATES.SUN_TO_CLOUD,
  sunRadiation: true,
  cloudRadiation: false,
  earthRadiation: false,
  gasesRadiation: false,
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SET_NEXT_STATE:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};
