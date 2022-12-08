import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  INITIAL_SLIDER_VALUES,
  RADIATION_MODES,
  SIMULATION_MODES,
} from '../../../config/constants';
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
  const {
    radiationMode,
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

  const isEarth =
    simulationMode !== SIMULATION_MODES.MARS.name &&
    simulationMode !== SIMULATION_MODES.VENUS.name;

  const isFluxMode = radiationMode === RADIATION_MODES.FLUXES;

  const toggleDisabled = !isEarth || !isFluxMode;

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

  return (
    <>
      <Typography variant="body2" className={classes.heading}>
        {t('Feedback')}
      </Typography>
      <WaterVaporFeedback
        disabled={toggleDisabled}
        atInitialState={atInitialState}
        someSliderValueChanged={someSliderValueChanged}
      />
      <IceCoverFeedback
        disabled={toggleDisabled}
        atInitialState={atInitialState}
      />
    </>
  );
};

export default FeedbackToggles;
