import {
  NUM_INCREMENTS,
  ICE_COVER,
  CLOUD_COVER,
  CARBON_DIOXIDE,
  METHANE,
} from '../../constants';

// eslint-disable-next-line import/prefer-default-export
export const computeIncrements = (settings) => {
  const { sliders, thermometer } = settings;
  const afterIncrement = (key, i) =>
    i === NUM_INCREMENTS
      ? sliders[key]
      : thermometer[key] +
        ((sliders[key] - thermometer[key]) / NUM_INCREMENTS) * i;

  const increments = [];
  for (let i = 1; i <= NUM_INCREMENTS; i += 1) {
    increments.push({
      iceCover: afterIncrement(ICE_COVER, i),
      cloudCover: afterIncrement(CLOUD_COVER, i),
      carbonDioxide: afterIncrement(CARBON_DIOXIDE, i),
      methane: afterIncrement(METHANE, i),
    });
  }

  return increments;
};
