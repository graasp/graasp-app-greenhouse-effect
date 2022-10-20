import React, { useEffect, useRef } from 'react';
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
  setIsPaused,
  setRadiationMode,
} from '../../actions';
import { APPLICATION_INTERVAL, RADIATION_MODES } from '../../config/constants';

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

const AnimationControls = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isPaused = useSelector(({ lab }) => lab.isPaused);
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
    dispatch(setIsPaused(false));
  };

  const onClickPause = () => {
    dispatch(setIsPaused(true));
  };

  const onClickReset = () => {
    // to avoid complex data saving of animation data,
    // we change the radiation mode to fluxes to reset waves animations
    // being on flux mode will automatically reset the fluxes once we dispatch reset
    dispatch(setRadiationMode(RADIATION_MODES.FLUXES));
    dispatch(reset());
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

export default AnimationControls;
