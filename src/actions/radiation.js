import { RADIATION_STATES } from '../config/constants';
import { SET_NEXT_STATE } from '../types';

// eslint-disable-next-line import/prefer-default-export
export const setNextState = () => (dispatch, getState) => {
  const { state } = getState().lab;

  let stateData;
  switch (state) {
    case RADIATION_STATES.SUN_TO_CLOUD:
      stateData = {
        state: RADIATION_STATES.CLOUD_RADIATION,
        cloudRadiation: true,
      };
      break;
    case RADIATION_STATES.CLOUD_RADIATION:
      stateData = {
        state: RADIATION_STATES.EARTH_RADIATION,
        earthRadiation: true,
      };
      break;
    case RADIATION_STATES.GASES_RADIATION:
      stateData = {
        state: RADIATION_STATES.EARTH_RADIATION,
        skyRadiation: true,
      };
      break;
    case RADIATION_STATES.EARTH_RADIATION:
      stateData = {
        state: RADIATION_STATES.GASES_RADIATION,
        gasesRadiation: true,
      };
      break;
    default:
  }

  dispatch({ type: SET_NEXT_STATE, payload: stateData });
};
