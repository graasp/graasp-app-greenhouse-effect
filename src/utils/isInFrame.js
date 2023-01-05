// source: http://bit.ly/2ZwRI5k
/* eslint-disable import/prefer-default-export */
export const isInIframe = () => {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
};
