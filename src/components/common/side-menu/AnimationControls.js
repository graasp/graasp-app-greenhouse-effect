import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { incrementIntervalCount } from '../../../actions';
import { APPLICATION_INTERVAL } from '../../../constants';
import PlayButton from './animation-controls/PlayButton';
import PauseButton from './animation-controls/PauseButton';
import UndoButton from './animation-controls/UndoButton';
import ResetButton from './animation-controls/ResetButton';

const useStyles = makeStyles(() => ({
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: { fontSize: '1.75em' },
}));

const AnimationControls = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isPaused } = useSelector(({ lab }) => lab);
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

  return (
    <div className={classes.buttonContainer}>
      {isPaused ? (
        <PlayButton className={classes.button} />
      ) : (
        <PauseButton className={classes.button} />
      )}
      <UndoButton className={classes.button} />
      <ResetButton className={classes.button} />
    </div>
  );
};

export default AnimationControls;
