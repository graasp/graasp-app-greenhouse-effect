import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  setFeedbackValues,
  setIsPaused,
  toggleFluxesBlinking,
} from '../../actions';
import SwitchWithLabel from './SwitchWithLabel';
import { SIMULATION_MODES } from '../../config/constants';

const useStyles = makeStyles((theme) => ({
  heading: {
    color: 'black',
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
  },
}));

const FeedbacksSettings = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { feedback, isPaused, simulationMode } = useSelector(({ lab }) => lab);
  const { iceCoverChange, waterVapor } = feedback;
  const dispatch = useDispatch();
  const isEarth =
    simulationMode !== SIMULATION_MODES.MARS.name &&
    simulationMode !== SIMULATION_MODES.VENUS.name;

  const onToggleIceCoverChange = (checked) => {
    dispatch(setFeedbackValues({ iceCoverChange: checked }));
  };

  const onToggleWaterVapor = (checked) => {
    dispatch(setFeedbackValues({ waterVapor: checked }));
    if (!isPaused && checked) {
      dispatch(setIsPaused(true));
      dispatch(toggleFluxesBlinking(true));
    } else {
      dispatch(toggleFluxesBlinking(false));
    }
  };

  return (
    <>
      <Typography variant="body2" className={classes.heading}>
        {t('Feedback')}
      </Typography>
      <SwitchWithLabel
        switchLabel={t('Water Vapor')}
        isChecked={waterVapor}
        onToggle={onToggleWaterVapor}
        disabled={!isEarth}
      />
      <SwitchWithLabel
        switchLabel={t('Ice and Snow Cover Change')}
        isChecked={iceCoverChange}
        onToggle={onToggleIceCoverChange}
        disabled={!isEarth}
      />
    </>
  );
};

export default FeedbacksSettings;
