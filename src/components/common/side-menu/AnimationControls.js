import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import { green, yellow, orange } from '@material-ui/core/colors';
import {
  incrementIntervalCount,
  reset,
  setIsPaused,
  resetFluxesFills,
  setThermometerValues,
} from '../../../actions';
import {
  APPLICATION_INTERVAL,
  GRADUAL_UPDATE_INTERVAL,
  GRADUAL_UPDATE_NUM_INCREMENTS,
} from '../../../config/constants';
import {
  graduallyDispatchCTerms,
  graduallyDispatchFeedbackTerms,
  graduallyDispatchIceCoverTerms,
  graduallyDispatchThermometerValues,
  stopFluxesBlinking,
} from '../../../utils/canvas';
import {
  computeBothFeedbackTerms,
  computeIceCoverFeedbackTerms,
  computeWaterVaporFeedbackCTerms,
} from '../../../utils/greenhouseEffect';
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
        GRADUAL_UPDATE_INTERVAL,
      );

      return;
    }

    if (waterVaporFeedbackOn) {
      const cTerms = computeWaterVaporFeedbackCTerms(
        sliderCarbonDioxide,
        sliderMethane,
        impliedAlbedo.totalAlbedo,
        thermometerTemperature,
        simulationMode,
      );

      graduallyDispatchCTerms(cTerms, dispatch, GRADUAL_UPDATE_INTERVAL);

      return;
    }

    if (iceCoverFeedbackOn) {
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

      graduallyDispatchIceCoverTerms(
        iceCoverTerms,
        dispatch,
        GRADUAL_UPDATE_INTERVAL,
      );

      return;
    }

    if (thermometerTemperature !== impliedTemperature) {
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
          disabled={!isPaused}
          onClick={onClickPlay}
          icon={<PlayCircleOutlineIcon className={classes.button} />}
          color={green[800]}
        />
      ) : (
        <CustomButton
          title={t('Pause')}
          disabled={isPaused}
          onClick={() => dispatch(setIsPaused(true))}
          icon={<PauseCircleOutlineIcon className={classes.button} />}
          color={yellow[800]}
        />
      )}

      <CustomButton
        title={t('Reset')}
        tooltipPlacement="right"
        onClick={() => dispatch(reset())}
        icon={<RotateLeftIcon className={classes.button} />}
        color={orange[800]}
      />
    </div>
  );
};

export default AnimationControls;
