import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import { green, yellow, orange, blue, red } from '@material-ui/core/colors';
import clsx from 'clsx';
import {
  incrementIntervalCount,
  reset,
  setCarbonDioxide,
  setCTerm,
  setIsPaused,
  setMethane,
  setRadiationMode,
  toggleFluxesBlinking,
} from '../../actions';
import {
  APPLICATION_INTERVAL,
  RADIATION_MODES,
  SIMULATION_MODES,
  WATER_VAPOR_FEEDBACK_UPDATE_INTERVAL,
} from '../../config/constants';
import {
  computeAlbedo,
  computeGreenhouseEffect,
  computeTemperature,
  computeWaterVaporFeedback,
} from '../../utils/greenhouseEffect';

const useStyles = makeStyles(() => ({
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    fontSize: '1.75em',
  },
  playButton: { color: green[800] },
  pauseButton: { color: yellow[800] },
  resetButton: { color: orange[800] },
  rewindButton: { color: red[800] },
  forwardButton: { color: blue[800] },
}));

const AnimationControls = ({
  componentCarbonDioxide,
  setComponentCarbonDioxide,
  componentMethane,
  setComponentMethane,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    isPaused,
    fluxesBlinking,
    simulationMode,
    carbonDioxide,
    methane,
    cTerm,
    cloudCover,
    iceCover,
  } = useSelector(({ lab }) => lab);
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

  const { totalAlbedo } = computeAlbedo(iceCover, cloudCover, simulationMode);

  const greenhouseEffect = computeGreenhouseEffect(
    carbonDioxide,
    methane,
    cTerm,
    simulationMode,
  );

  const temperature = computeTemperature(
    greenhouseEffect,
    totalAlbedo,
    simulationMode,
  );

  const onClickPlay = () => {
    dispatch(setIsPaused(false));
    if (fluxesBlinking) {
      const feedbackValues = computeWaterVaporFeedback(
        temperature,
        cTerm,
        componentMethane,
        componentCarbonDioxide,
        totalAlbedo,
        simulationMode,
      );

      dispatch(setCarbonDioxide(componentCarbonDioxide));
      dispatch(setMethane(componentMethane));

      let index = 0;
      const updateInterval = setInterval(() => {
        if (index >= feedbackValues.length) {
          dispatch(toggleFluxesBlinking());
          clearInterval(updateInterval);
        } else {
          const currentCTerm = feedbackValues[index];
          dispatch(setCTerm(currentCTerm));
          index += 1;
        }
      }, WATER_VAPOR_FEEDBACK_UPDATE_INTERVAL);
    }
  };

  const onClickPause = () => {
    dispatch(setIsPaused(true));
  };

  const onClickReset = () => {
    // being on flux mode will automatically reset the fluxes once we dispatch reset
    dispatch(setRadiationMode(RADIATION_MODES.FLUXES));
    dispatch(reset());
    setComponentCarbonDioxide(SIMULATION_MODES.TODAY.carbonDioxide);
    setComponentMethane(SIMULATION_MODES.TODAY.methane);
  };

  return (
    <div className={classes.buttonContainer}>
      {isPaused ? (
        <Tooltip title={t('Play')} placement="left">
          {/* Note: <span>s added to clear console error: 
        'Material-UI: You are providing a disabled `button` child to the Tooltip component...
        Add a simple wrapper element, such as a `span`.' */}
          <span>
            <IconButton disabled={!isPaused} onClick={onClickPlay}>
              <PlayCircleOutlineIcon
                className={clsx(classes.button, {
                  [classes.playButton]: isPaused,
                })}
              />
            </IconButton>
          </span>
        </Tooltip>
      ) : (
        <Tooltip title={t('Pause')} placement="left">
          <span>
            <IconButton disabled={isPaused} onClick={onClickPause}>
              <PauseCircleOutlineIcon
                className={clsx(classes.button, {
                  [classes.pauseButton]: !isPaused,
                })}
              />
            </IconButton>
          </span>
        </Tooltip>
      )}

      <Tooltip title={t('Reset')} placement="right">
        <span>
          <IconButton onClick={onClickReset}>
            <RotateLeftIcon
              className={`${classes.button} ${classes.resetButton}`}
            />
          </IconButton>
        </span>
      </Tooltip>
    </div>
  );
};

AnimationControls.propTypes = {
  componentCarbonDioxide: PropTypes.number.isRequired,
  setComponentCarbonDioxide: PropTypes.func.isRequired,
  componentMethane: PropTypes.number.isRequired,
  setComponentMethane: PropTypes.func.isRequired,
};

export default AnimationControls;
