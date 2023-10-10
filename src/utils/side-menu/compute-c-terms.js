import { DEFAULT_EPSILON, FIRST_EPSILON } from '../../constants';
import { computeCTerm, kelvinToCelsius } from '../physics';
import { exceedsMaxTemp, isOutOfBounds, projectOutputs } from './helpers';

// eslint-disable-next-line import/prefer-default-export
export const computeCTerms = (settings, slidersUnchanged) => {
  const { sliders, simulationMode: simMode } = settings;
  const { temperature: currentTemp } = sliders;
  const cTerms = slidersUnchanged ? [{ cTerm: sliders.cTerm }] : [];

  let previousTemp;
  let newTemp;
  let runawayGHE = false;
  let epsilon = FIRST_EPSILON;

  do {
    previousTemp = newTemp || kelvinToCelsius(currentTemp);
    const projectedCTerm = computeCTerm(previousTemp);
    const outputs = projectOutputs(sliders, { cTerm: projectedCTerm }, simMode);
    const { temperature, greenhouseEffect } = outputs;

    newTemp = temperature;
    cTerms.push({ cTerm: projectedCTerm });
    epsilon = DEFAULT_EPSILON;

    if (exceedsMaxTemp(newTemp)) runawayGHE = true;
    if (exceedsMaxTemp(newTemp) || isOutOfBounds(greenhouseEffect)) break;
  } while (Math.abs(newTemp - previousTemp) > epsilon);

  return { cTerms, runawayGHE };
};
