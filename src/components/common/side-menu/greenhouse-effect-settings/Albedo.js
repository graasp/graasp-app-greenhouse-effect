import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import SliderWithLabel from '../shared-components/SliderWithLabel';
import { MAX_ALBEDO, ON_STRING, SIMULATION_MODES } from '../../../../constants';
import IceSnowCover from './IceSnowCover';
import CloudCover from './CloudCover';

const useStyles = makeStyles(() => ({
  title: {
    fontWeight: 'bold',
    color: 'black',
  },
}));

const Albedo = ({ slidersUnchanged }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const {
    isPaused,
    simulationMode,
    sliders,
    propagationComplete,
  } = useSelector(({ lab }) => lab);
  const { zoomedIn } = useSelector(({ layout }) => layout);
  const { albedo } = sliders;

  const isMarsOrVenus =
    simulationMode === SIMULATION_MODES.MARS.name ||
    simulationMode === SIMULATION_MODES.VENUS.name;

  const disabled =
    !isPaused || isMarsOrVenus || zoomedIn || !propagationComplete;

  return (
    <>
      <SliderWithLabel
        text={t('Albedo (%)')}
        max={MAX_ALBEDO}
        value={parseFloat((albedo.totalAlbedo * 100).toFixed(1))}
        labelClassName={classes.title}
        valueLabelDisplay={ON_STRING}
        disabled
      />
      <IceSnowCover disabled={disabled} slidersUnchanged={slidersUnchanged} />
      <CloudCover disabled={disabled} slidersUnchanged={slidersUnchanged} />
    </>
  );
};

Albedo.propTypes = {
  slidersUnchanged: PropTypes.bool.isRequired,
};

export default Albedo;
