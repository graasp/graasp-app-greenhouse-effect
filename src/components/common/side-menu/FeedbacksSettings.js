import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetFluxesFills,
  setFeedbackValues,
  setIsPaused,
} from '../../../actions';
import SwitchWithLabel from './shared-components/SwitchWithLabel';
import {
  GROUND_TO_SKY,
  INITIAL_SLIDER_VALUES,
  SIMULATION_MODES,
  SKY_TO_ATMOSPHERE,
  SKY_TO_GROUND,
} from '../../../config/constants';
import { keepFluxesBlinking, stopFluxesBlinking } from '../../../utils/canvas';

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
  const {
    feedback,
    isPaused,
    simulationMode,
    temporaryIceCover,
    finalIceCover,
    temporaryCloudCover,
    finalCloudCover,
    temporaryMethane,
    finalMethane,
    temporaryCarbonDioxide,
    finalCarbonDioxide,
  } = useSelector(({ lab }) => lab);
  const { iceCoverChange, waterVapor } = feedback;
  const dispatch = useDispatch();
  const isEarth =
    simulationMode !== SIMULATION_MODES.MARS.name &&
    simulationMode !== SIMULATION_MODES.VENUS.name;

  const currentMode = INITIAL_SLIDER_VALUES[simulationMode];

  const atInitialState =
    temporaryIceCover === currentMode.iceCover &&
    temporaryCloudCover === currentMode.cloudCover &&
    temporaryMethane === currentMode.methane &&
    temporaryCarbonDioxide === currentMode.carbonDioxide;

  const someSliderValueChanged =
    temporaryIceCover !== finalIceCover ||
    temporaryCloudCover !== finalCloudCover ||
    temporaryMethane !== finalMethane ||
    temporaryCarbonDioxide !== finalCarbonDioxide;

  const onToggleIceCoverChange = (checked) => {
    dispatch(setFeedbackValues({ iceCoverChange: checked }));
  };

  const onToggleWaterVapor = (checked) => {
    dispatch(setFeedbackValues({ waterVapor: checked }));
    // if the user toggles water vapor feedback on without changing any slider variables, we don't want IR fluxes to blink
    if (checked && !atInitialState) {
      keepFluxesBlinking(
        [GROUND_TO_SKY, SKY_TO_GROUND, SKY_TO_ATMOSPHERE],
        dispatch,
      );
    }
    // if the user toggles water vapor feedback off and no slider variable has changed, we don't want IR fluxes to blink
    if (!checked && !someSliderValueChanged) {
      stopFluxesBlinking();
      dispatch(resetFluxesFills());
    }
    if (!isPaused && checked) {
      dispatch(setIsPaused(true));
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
