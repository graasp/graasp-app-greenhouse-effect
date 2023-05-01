import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { Tooltip } from '@material-ui/core';
import { incrementIntervalCount, setIsPaused } from '../../../actions';
import { APPLICATION_INTERVAL, INITIAL_TOUR_STATE } from '../../../constants';
import PlayButton from './animation-controls/PlayButton';
import PauseButton from './animation-controls/PauseButton';
import RewindButton from './animation-controls/RewindButton';
import ResetButton from './animation-controls/ResetButton';
import CloseSideMenu from './animation-controls/CloseSideMenu';
import Tour from './Tour';

const useStyles = makeStyles(() => ({
  buttonContainer: {
    display: 'flex',
  },
  sideContainer: {
    width: '10%',
    display: 'flex',
    alignItems: 'center',
  },
  centerContainer: {
    width: '80%',
    display: 'flex',
    justifyContent: 'center',
  },
  button: { fontSize: '1.75em' },
}));

const AnimationControls = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isPaused } = useSelector(({ lab }) => lab);
  const { t } = useTranslation();
  const applicationInterval = useRef();
  const [tourState, setTourState] = useState(INITIAL_TOUR_STATE);

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

  const startTour = () => {
    setTourState((prevState) => ({
      ...prevState,
      stepIndex: 0,
      run: true,
      loading: false,
    }));
    dispatch(setIsPaused(true));
  };

  return (
    <div className={classes.buttonContainer}>
      <div className={classes.sideContainer}>
        <CloseSideMenu />
      </div>
      <div className={classes.centerContainer}>
        {isPaused ? (
          <PlayButton className={classes.button} />
        ) : (
          <PauseButton className={classes.button} />
        )}
        <RewindButton className={classes.button} />
        <ResetButton className={classes.button} />
      </div>
      <div className={classes.sideContainer}>
        <Tour tourState={tourState} setTourState={setTourState} />
        <Tooltip title={t('Start tour')} placement="left">
          <IconButton onClick={startTour}>
            <InfoIcon color="primary" fontSize="small" />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

export default AnimationControls;
