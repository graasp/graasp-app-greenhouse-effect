export const determineCarbonDioxideAtomsCoordinates = (
  moleculeCenter,
  carbonRadius,
  oxygenRadius,
  rotation,
) => {
  const { x: moleculeCenterX, y: moleculeCenterY } = moleculeCenter;
  return {
    topOxygen: {
      x: moleculeCenterX + carbonRadius * Math.cos(rotation),
      y: moleculeCenterY - carbonRadius - oxygenRadius,
    },
    carbon: { x: moleculeCenterX, y: moleculeCenterY },
    bottomOxygen: {
      x: moleculeCenterX + carbonRadius * Math.cos(rotation),
      y: moleculeCenterY + carbonRadius + oxygenRadius,
    },
  };
};

export const determineWaterAtomsCoordinates = (
  moleculeCenter,
  oxygenRadius,
  hydrogenRadius,
  rotation,
) => {
  const { x: moleculeCenterX, y: moleculeCenterY } = moleculeCenter;
  const hydrogenXOffset = Math.sin((45 * Math.PI) / 180) * oxygenRadius;
  const hydrogenYOffset =
    Math.cos((45 * Math.PI) / 180) * oxygenRadius + hydrogenRadius;
  return {
    topHydrogen: {
      x: moleculeCenterX - hydrogenXOffset * Math.cos(rotation),
      y: moleculeCenterY - hydrogenYOffset * Math.sin(rotation),
    },
    oxygen: { x: moleculeCenterX, y: moleculeCenterY },
    bottomHydrogen: {
      x: moleculeCenterX - hydrogenXOffset * Math.cos(rotation),
      y: moleculeCenterY + hydrogenYOffset * Math.sin(rotation),
    },
  };
};

export const determineMethaneAtomsCoordinates = (
  moleculeCenter,
  carbonRadius,
  hydrogenRadius,
) => {
  const { x: moleculeCenterX, y: moleculeCenterY } = moleculeCenter;

  const leftHydrogensXOffset = Math.cos((30 * Math.PI) / 180) * carbonRadius;
  const leftHydrogensYOffset =
    Math.sin((30 * Math.PI) / 180) * carbonRadius + hydrogenRadius;
  const rightHydrogensXOffset = Math.cos((40 * Math.PI) / 180) * carbonRadius;
  const rightHydrogensYOffset =
    Math.sin((40 * Math.PI) / 180) * carbonRadius + hydrogenRadius;

  return {
    carbon: { x: moleculeCenterX, y: moleculeCenterY },
    topLeftHydrogen: {
      x: moleculeCenterX - leftHydrogensXOffset,
      y: moleculeCenterY - leftHydrogensYOffset,
    },
    topRightHydrogen: {
      x: moleculeCenterX + rightHydrogensXOffset,
      y: moleculeCenterY - rightHydrogensYOffset,
    },
    bottomRightHydrogen: {
      x: moleculeCenterX + rightHydrogensXOffset,
      y: moleculeCenterY + rightHydrogensYOffset,
    },
    bottomLeftHydrogen: {
      x: moleculeCenterX - leftHydrogensXOffset,
      y: moleculeCenterY + leftHydrogensYOffset,
    },
  };
};
