import {
  TOGGLE_SETTINGS,
  TOGGLE_LOADING_SCREEN,
  TOGGLE_SIDE_MENU,
  SET_STAGE_DIMENSIONS,
  TOGGLE_ZOOM,
} from '../types';

const INITIAL_STATE = {
  settings: {
    open: false,
  },
  lab: { stageDimensions: { width: 0, height: 0 } },
  showLoader: true,
  showSideMenu: true,
  zoomedIn: false,
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case TOGGLE_SETTINGS:
      return {
        ...state,
        settings: {
          ...state.settings,
          open: payload,
        },
      };
    case TOGGLE_LOADING_SCREEN:
      return {
        ...state,
        showLoader: payload,
      };
    case TOGGLE_SIDE_MENU:
      return {
        ...state,
        showSideMenu: payload,
      };
    case SET_STAGE_DIMENSIONS: {
      return { ...state, lab: { ...state.lab, stageDimensions: payload } };
    }
    case TOGGLE_ZOOM: {
      return { ...state, zoomedIn: payload };
    }
    default:
      return state;
  }
};
