import {
  GROUND_TO_SKY,
  SKY_TO_GROUND,
  SKY_TO_ATMOSPHERE,
} from '../../constants';
import {
  resetFluxesFills,
  setThermometerValues,
  toggleFluxesFills,
} from '../../actions';

/* eslint-disable import/prefer-default-export */
export const graduallyDispatchThermometerValues = (
  targetValues,
  originalValues,
  numIncrements,
  delay,
  dispatch,
  blinkEarthFluxes = true,
) => {
  const {
    sliderIceCover,
    sliderCloudCover,
    sliderCarbonDioxide,
    sliderMethane,
  } = targetValues;

  const {
    thermometerIceCover,
    thermometerCloudCover,
    thermometerCarbonDioxide,
    thermometerMethane,
  } = originalValues;

  const iceCoverIncrement =
    (sliderIceCover - thermometerIceCover) / numIncrements;
  const cloudCoverIncrement =
    (sliderCloudCover - thermometerCloudCover) / numIncrements;
  const carbonDioxideIncrement =
    (sliderCarbonDioxide - thermometerCarbonDioxide) / numIncrements;
  const methaneIncrement = (sliderMethane - thermometerMethane) / numIncrements;

  for (let i = 1; i <= numIncrements; i += 1) {
    setTimeout(() => {
      if (blinkEarthFluxes) {
        dispatch(
          toggleFluxesFills([GROUND_TO_SKY, SKY_TO_GROUND, SKY_TO_ATMOSPHERE]),
        );
      }
      dispatch(
        setThermometerValues({
          iceCover: thermometerIceCover + iceCoverIncrement * i,
          cloudCover: thermometerCloudCover + cloudCoverIncrement * i,
          carbonDioxide: thermometerCarbonDioxide + carbonDioxideIncrement * i,
          methane: thermometerMethane + methaneIncrement * i,
        }),
      );
      if (i === numIncrements) {
        dispatch(resetFluxesFills());
      }
    }, delay * (i - 1));
  }
};
