import { DEFAULT_EPSILON, FIRST_EPSILON } from '../../constants';
import { computeIceCover, kelvinToCelsius } from '../physics';
import {
  boundIceCover,
  exceedsMaxTemp,
  isOutOfBounds,
  projectOutputs,
} from './helpers';

// eslint-disable-next-line import/prefer-default-export
export const computeIceCovers = (sliders, simMode) => {
  const { temperature: currentTemp } = sliders;
  const iceCovers = [{ iceCover: sliders.iceCover }];

  let previousTemp;
  let newTemp;
  let runawayGHE = false;
  let epsilon = FIRST_EPSILON;

  do {
    previousTemp = newTemp || kelvinToCelsius(currentTemp);
    const newIceCover = computeIceCover(previousTemp);
    const outputs = projectOutputs(sliders, { iceCover: newIceCover }, simMode);
    const { temperature } = outputs;

    newTemp = temperature;
    iceCovers.push({ iceCover: boundIceCover(newIceCover) });
    epsilon = DEFAULT_EPSILON;

    if (exceedsMaxTemp(newTemp)) runawayGHE = true;
    if (exceedsMaxTemp(newTemp) || isOutOfBounds(newIceCover / 100)) break;
  } while (Math.abs(newTemp - previousTemp) > epsilon);

  return { iceCovers, runawayGHE };
};
