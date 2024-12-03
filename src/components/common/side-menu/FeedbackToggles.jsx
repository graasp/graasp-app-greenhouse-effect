import React from 'react';
import PropTypes from 'prop-types';
import { Typography, makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RADIATION_MODES, SIMULATION_MODES } from '../../../constants';
import WaterFeedback from './WaterFeedback';
import IceFeedback from './IceFeedback';

const useStyles = makeStyles((theme) => ({
  heading: {
    color: 'black',
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
  },
}));

const FeedbackToggles = ({ slidersUnchanged }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const {
    radiationMode,
    simulationMode,
    animationPlaying,
    waterFeedback,
    iceFeedback,
    propagationComplete,
  } = useSelector(({ lab }) => lab);

  const isEarth =
    simulationMode !== SIMULATION_MODES.MARS.name &&
    simulationMode !== SIMULATION_MODES.VENUS.name;

  const isWavesMode = radiationMode === RADIATION_MODES.WAVES;

  const toggleDisabled =
    !isEarth || isWavesMode || animationPlaying || !propagationComplete;

  return (
    <>
      <Typography variant="body2" className={classes.heading}>
        {t('Feedbacks')}
      </Typography>
      <WaterFeedback
        disabled={toggleDisabled || iceFeedback}
        slidersUnchanged={slidersUnchanged}
      />
      <IceFeedback
        disabled={toggleDisabled || waterFeedback}
        slidersUnchanged={slidersUnchanged}
      />
    </>
  );
};

FeedbackToggles.propTypes = {
  slidersUnchanged: PropTypes.bool.isRequired,
};

export default FeedbackToggles;
