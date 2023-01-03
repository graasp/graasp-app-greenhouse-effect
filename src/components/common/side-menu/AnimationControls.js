import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import { green, yellow, orange, grey } from '@material-ui/core/colors';
import {
  incrementIntervalCount,
  reset,
  setIsPaused,
  resetFluxesFills,
  setThermometerValues,
  setCTerm,
  setSliderIceCover,
  setThermometerIceCover,
  setIceCoverAndCTerm,
  toggleZoom,
} from '../../../actions';
import {
  APPLICATION_INTERVAL,
  GRADUAL_UPDATE_INTERVAL,
  GRADUAL_UPDATE_NUM_INCREMENTS,
  GROUND_TO_ATMOSPHERE,
  GROUND_TO_SKY,
  SKY_TO_ATMOSPHERE,
  SKY_TO_GROUND,
} from '../../../constants';
import {
  graduallyDispatchFeedbackTerms,
  computeBothFeedbackTerms,
  computeIceCoverFeedbackTerms,
  computeWaterVaporFeedbackCTerms,
  stopFluxesBlinking,
  graduallyDispatchThermometerValues,
} from '../../../utils';
import CustomButton from './shared-components/CustomButton';

const useStyles = makeStyles(() => ({
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: { fontSize: '1.75em' },
}));

const AnimationControls = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { zoomedIn } = useSelector(({ layout }) => layout);
  const {
    isPaused,
    feedback,
    simulationMode,
    impliedTemperature,
    impliedAlbedo,
    thermometerTemperature,
    impliedGreenhouseEffect,
    sliderIceCover,
    sliderCloudCover,
    sliderMethane,
    sliderCarbonDioxide,
    thermometerIceCover,
    thermometerCloudCover,
    thermometerMethane,
    thermometerCarbonDioxide,
  } = useSelector(({ lab }) => lab);
  const { waterVaporFeedbackOn, iceCoverFeedbackOn } = feedback;
  const applicationInterval = useRef();

  const startInterval = () => {
    applicationInterval.current = setInterval(() => {
      dispatch(incrementIntervalCount());
    }, APPLICATION_INTERVAL);
  };

  useEffect(() => {
    if (isPaused) {
      clearInterval(applicationInterval.current);
    } else if (!isPaused) {
      startInterval();
    }
  }, [isPaused]);

  const onClickPlay = () => {
    stopFluxesBlinking();
    dispatch(resetFluxesFills());
    dispatch(setIsPaused(false));

    if (waterVaporFeedbackOn && iceCoverFeedbackOn) {
      const feedbackTerms = computeBothFeedbackTerms(
        thermometerTemperature,
        sliderCarbonDioxide,
        sliderMethane,
        sliderCloudCover,
        simulationMode,
      );

      graduallyDispatchFeedbackTerms(
        feedbackTerms,
        dispatch,
        [setIceCoverAndCTerm],
        [GROUND_TO_SKY, SKY_TO_GROUND, SKY_TO_ATMOSPHERE, GROUND_TO_ATMOSPHERE],
      );
    } else if (waterVaporFeedbackOn) {
      const cTerms = computeWaterVaporFeedbackCTerms(
        sliderCarbonDioxide,
        sliderMethane,
        impliedAlbedo.totalAlbedo,
        thermometerTemperature,
        simulationMode,
      );

      graduallyDispatchFeedbackTerms(
        cTerms,
        dispatch,
        [setCTerm],
        [GROUND_TO_SKY, SKY_TO_GROUND, SKY_TO_ATMOSPHERE],
      );
    } else if (iceCoverFeedbackOn) {
      dispatch(
        setThermometerValues({
          iceCover: sliderIceCover,
          cloudCover: sliderCloudCover,
          carbonDioxide: sliderCarbonDioxide,
          methane: sliderMethane,
        }),
      );

      const iceCoverTerms = computeIceCoverFeedbackTerms(
        impliedTemperature,
        impliedGreenhouseEffect,
        sliderCloudCover,
        simulationMode,
      );

      graduallyDispatchFeedbackTerms(
        iceCoverTerms,
        dispatch,
        [setSliderIceCover, setThermometerIceCover],
        [GROUND_TO_SKY, SKY_TO_GROUND, SKY_TO_ATMOSPHERE, GROUND_TO_ATMOSPHERE],
      );
    } else if (thermometerTemperature !== impliedTemperature) {
      graduallyDispatchThermometerValues(
        {
          sliderIceCover,
          sliderCloudCover,
          sliderMethane,
          sliderCarbonDioxide,
        },
        {
          thermometerIceCover,
          thermometerCloudCover,
          thermometerMethane,
          thermometerCarbonDioxide,
        },
        GRADUAL_UPDATE_NUM_INCREMENTS,
        GRADUAL_UPDATE_INTERVAL,
        dispatch,
      );
    }
  };

  return (
    <div className={classes.buttonContainer}>
      {isPaused ? (
        <CustomButton
          title={t('Play')}
          disabled={!isPaused || zoomedIn}
          onClick={onClickPlay}
          icon={<PlayCircleOutlineIcon className={classes.button} />}
          color={zoomedIn ? grey[400] : green[800]}
        />
      ) : (
        <CustomButton
          title={t('Pause')}
          disabled={isPaused || zoomedIn}
          onClick={() => dispatch(setIsPaused(true))}
          icon={<PauseCircleOutlineIcon className={classes.button} />}
          color={zoomedIn ? grey[400] : yellow[800]}
        />
      )}

      <CustomButton
        title={t('Reset')}
        tooltipPlacement="right"
        onClick={() => {
          dispatch(reset());
          dispatch(toggleZoom(false));
        }}
        icon={<RotateLeftIcon className={classes.button} />}
        color={orange[800]}
      />
    </div>
  );
};

export default AnimationControls;
