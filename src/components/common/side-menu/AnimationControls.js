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
  toggleZoom,
} from '../../../actions';
import {
  APPLICATION_INTERVAL,
  GROUND_TO_ATMOSPHERE,
  GROUND_TO_SKY,
  SKY_TO_ATMOSPHERE,
  SKY_TO_GROUND,
  THERMOMETER,
  SLIDERS,
} from '../../../constants';
import {
  graduallyDispatchTerms,
  computeBothFeedbackTerms,
  computeIceCoverFeedbackTerms,
  computeWaterVaporFeedbackCTerms,
  stopFluxesBlinking,
  computeIncrements,
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
    sliders,
    thermometer,
  } = useSelector(({ lab }) => lab);
  const { waterVaporFeedbackOn, iceCoverFeedbackOn } = feedback;
  const applicationInterval = useRef();

  const {
    iceCover: sliderIceCover,
    cloudCover: sliderCloudCover,
    methane: sliderMethane,
    carbonDioxide: sliderCarbonDioxide,
    temperature: impliedTemperature,
    greenhouseEffect: impliedGreenhouseEffect,
    albedo: impliedAlbedo,
  } = sliders;

  const {
    iceCover: thermometerIceCover,
    cloudCover: thermometerCloudCover,
    methane: thermometerMethane,
    carbonDioxide: thermometerCarbonDioxide,
    temperature: thermometerTemperature,
  } = thermometer;

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

      graduallyDispatchTerms(
        feedbackTerms,
        dispatch,
        [SLIDERS, THERMOMETER],
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

      graduallyDispatchTerms(
        cTerms,
        dispatch,
        [SLIDERS, THERMOMETER],
        [GROUND_TO_SKY, SKY_TO_GROUND, SKY_TO_ATMOSPHERE],
        true,
      );
    } else if (iceCoverFeedbackOn) {
      const iceCoverTerms = computeIceCoverFeedbackTerms(
        impliedTemperature,
        impliedGreenhouseEffect,
        sliderCloudCover,
        simulationMode,
      );

      graduallyDispatchTerms(
        iceCoverTerms,
        dispatch,
        [SLIDERS, THERMOMETER],
        [GROUND_TO_SKY, SKY_TO_GROUND, SKY_TO_ATMOSPHERE, GROUND_TO_ATMOSPHERE],
      );
    } else if (thermometerTemperature !== impliedTemperature) {
      const valuesToDispatch = computeIncrements(
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
      );
      graduallyDispatchTerms(
        valuesToDispatch,
        dispatch,
        [THERMOMETER],
        [GROUND_TO_SKY, SKY_TO_GROUND, SKY_TO_ATMOSPHERE],
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
