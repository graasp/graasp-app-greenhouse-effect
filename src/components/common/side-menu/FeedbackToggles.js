import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RADIATION_MODES, SIMULATION_MODES } from '../../../constants';
import WaterVaporFeedback from './WaterVaporFeedback';
import IceCoverFeedback from './IceCoverFeedback';

const useStyles = makeStyles((theme) => ({
  heading: {
    color: 'black',
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
  },
}));

const FeedbackToggles = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { radiationMode, simulationMode, animationPlaying } = useSelector(
    ({ lab }) => lab,
  );

  const isEarth =
    simulationMode !== SIMULATION_MODES.MARS.name &&
    simulationMode !== SIMULATION_MODES.VENUS.name;

  const isFluxMode = radiationMode === RADIATION_MODES.FLUXES;

  const toggleDisabled = !isEarth || !isFluxMode || animationPlaying;

  return (
    <>
      <Typography variant="body2" className={classes.heading}>
        {t('Feedbacks')}
      </Typography>
      <WaterVaporFeedback disabled={toggleDisabled} />
      <IceCoverFeedback disabled={toggleDisabled} />
    </>
  );
};

export default FeedbackToggles;
