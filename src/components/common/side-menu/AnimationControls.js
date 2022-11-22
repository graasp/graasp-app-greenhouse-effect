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
  setFinalCarbonDioxide,
  setIsPaused,
  setFinalMethane,
  setFinalCloudCover,
  setFinalIceCover,
  resetFluxesFills,
} from '../../../actions';
import {
  APPLICATION_INTERVAL,
  GRADUAL_UPDATE_INTERVAL,
  GRADUAL_UPDATE_NUM_INCREMENTS,
} from '../../../config/constants';
import {
  graduallyDispatchCTerms,
  graduallyDispatchValues,
  stopFluxesBlinking,
} from '../../../utils/canvas';
import { computeWaterVaporFeedbackCTerms } from '../../../utils/greenhouseEffect';
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
    temporaryCarbonDioxide,
    finalCarbonDioxide,
    temporaryMethane,
    finalMethane,
    temporaryCloudCover,
    temporaryIceCover,
    finalIceCover,
    finalCloudCover,
    feedback,
    cTerm,
    simulationMode,
  } = useSelector(({ lab }) => lab);
  const { waterVapor } = feedback;
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

    if (waterVapor) {
      dispatch(setFinalIceCover(temporaryIceCover));
      dispatch(setFinalCloudCover(temporaryCloudCover));
      dispatch(setFinalCarbonDioxide(temporaryCarbonDioxide));
      dispatch(setFinalMethane(temporaryMethane));

      const cTerms = computeWaterVaporFeedbackCTerms(
        temporaryIceCover,
        temporaryCloudCover,
        temporaryCarbonDioxide,
        temporaryMethane,
        cTerm,
        simulationMode,
      );

      graduallyDispatchCTerms(cTerms, dispatch, GRADUAL_UPDATE_INTERVAL);

      return;
    }

    if (
      temporaryIceCover !== finalIceCover ||
      temporaryCloudCover !== finalCloudCover ||
      temporaryMethane !== finalMethane ||
      temporaryCarbonDioxide !== finalCarbonDioxide
    ) {
      const blinkEarthFluxes =
        temporaryIceCover !== finalIceCover ||
        temporaryCloudCover !== finalCloudCover;

      graduallyDispatchValues(
        [
          temporaryIceCover,
          temporaryCloudCover,
          temporaryMethane,
          temporaryCarbonDioxide,
        ],
        [finalIceCover, finalCloudCover, finalMethane, finalCarbonDioxide],
        GRADUAL_UPDATE_NUM_INCREMENTS,
        GRADUAL_UPDATE_INTERVAL,
        dispatch,
        [
          setFinalIceCover,
          setFinalCloudCover,
          setFinalMethane,
          setFinalCarbonDioxide,
        ],
        blinkEarthFluxes,
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
