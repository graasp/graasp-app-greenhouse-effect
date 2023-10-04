/* eslint-disable import/prefer-default-export */
export const adjustFluxesFills = (originalFluxesFills, fluxesToBlink) => {
  const modifiedFills = { ...originalFluxesFills };
  fluxesToBlink.forEach((flux) => {
    if (modifiedFills[flux.name] === flux.defaultFill) {
      modifiedFills[flux.name] = flux.darkFill;
    } else {
      modifiedFills[flux.name] = flux.defaultFill;
    }
  });
  return modifiedFills;
};
