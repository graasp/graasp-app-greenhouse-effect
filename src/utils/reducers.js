/* eslint-disable import/prefer-default-export */
export const adjustFluxesFills = (originalFluxesFills, fluxesToToggle) => {
  const modifiedFills = { ...originalFluxesFills };
  fluxesToToggle.forEach((flux) => {
    if (modifiedFills[flux.name] === flux.defaultFill) {
      modifiedFills[flux.name] = flux.darkFill;
    } else {
      modifiedFills[flux.name] = flux.defaultFill;
    }
  });
  return modifiedFills;
};
