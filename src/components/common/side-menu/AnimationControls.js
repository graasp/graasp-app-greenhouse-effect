import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { Tooltip } from '@material-ui/core';
import { incrementIntervalCount } from '../../../actions';
import { APPLICATION_INTERVAL } from '../../../constants';
import PlayButton from './animation-controls/PlayButton';
import PauseButton from './animation-controls/PauseButton';
import UndoButton from './animation-controls/UndoButton';
import ResetButton from './animation-controls/ResetButton';

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

const AnimationControls = ({ startTour }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isPaused } = useSelector(({ lab }) => lab);
  const { t } = useTranslation();
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
      <div className={classes.sideContainer} />
      <div className={classes.centerContainer}>
        {isPaused ? (
          <PlayButton className={classes.button} />
        ) : (
          <PauseButton className={classes.button} />
        )}
        <UndoButton className={classes.button} />
        <ResetButton className={classes.button} />
      </div>
      <div className={classes.sideContainer}>
        <Tooltip title={t('Start tour')} placement="left">
          <IconButton onClick={startTour}>
            <InfoIcon color="primary" fontSize="small" />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

AnimationControls.propTypes = {
  startTour: PropTypes.func.isRequired,
};

export default AnimationControls;
