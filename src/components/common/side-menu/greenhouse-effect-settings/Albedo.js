import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import SliderWithLabel from '../shared-components/SliderWithLabel';
import {
  ALBEDO_MAX_VALUE,
  ON_STRING,
  RADIATION_MODES,
  SIMULATION_MODES,
} from '../../../../config/constants';
import IceSnowCover from './IceSnowCover';
import CloudCover from './CloudCover';

const useStyles = makeStyles(() => ({
  title: {
    fontWeight: 'bold',
    color: 'black',
  },
}));

const Albedo = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const {
    radiationMode,
    isPaused,
    simulationMode,
    impliedAlbedo,
  } = useSelector(({ lab }) => lab);
  const { zoomedIn } = useSelector(({ layout }) => layout);

  const isMarsOrVenus =
    simulationMode === SIMULATION_MODES.MARS.name ||
    simulationMode === SIMULATION_MODES.VENUS.name;

  const disabled =
    !isPaused ||
    radiationMode === RADIATION_MODES.WAVES ||
    isMarsOrVenus ||
    zoomedIn;

  return (
    <>
      <SliderWithLabel
        text={t('Albedo (%)')}
        max={ALBEDO_MAX_VALUE}
        value={parseFloat((impliedAlbedo.totalAlbedo * 100).toFixed(1))}
        labelClassName={classes.title}
        valueLabelDisplay={ON_STRING}
        disabled
      />
      <IceSnowCover disabled={disabled} />
      <CloudCover disabled={disabled} />
    </>
  );
};

export default Albedo;
