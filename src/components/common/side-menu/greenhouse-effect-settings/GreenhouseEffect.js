import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import SliderWithLabel from '../shared-components/SliderWithLabel';
import {
  GREENHOUSE_TOTAL_EFFECT_MAX_VALUE,
  ON_STRING,
  RADIATION_MODES,
  SIMULATION_MODES,
} from '../../../../constants';
import CarbonDioxideSlider from './CarbonDioxideSlider';
import MethaneSlider from './MethaneSlider';
import WaterVapor from './WaterVapor';

const useStyles = makeStyles(() => ({
  title: {
    fontWeight: 'bold',
    color: 'black',
  },
}));

const GreenhouseEffect = ({ settingsUnchanged }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { radiationMode, isPaused, simulationMode, sliders } = useSelector(
    ({ lab }) => lab,
  );
  const { zoomedIn } = useSelector(({ layout }) => layout);
  const { greenhouseEffect } = sliders;

  const isMarsOrVenus =
    simulationMode === SIMULATION_MODES.MARS.name ||
    simulationMode === SIMULATION_MODES.VENUS.name;

  const disabled =
    !isPaused ||
    (radiationMode === RADIATION_MODES.WAVES && !zoomedIn) ||
    isMarsOrVenus;

  return (
    <>
      <SliderWithLabel
        disabled
        text={t('Greenhouse Effect (%)')}
        max={GREENHOUSE_TOTAL_EFFECT_MAX_VALUE}
        value={+(greenhouseEffect * 100).toFixed(1)}
        valueLabelDisplay={ON_STRING}
        labelClassName={classes.title}
      />
      <CarbonDioxideSlider
        disabled={disabled}
        settingsUnchanged={settingsUnchanged}
      />
      <MethaneSlider
        disabled={disabled}
        settingsUnchanged={settingsUnchanged}
      />
      <WaterVapor />
    </>
  );
};

GreenhouseEffect.propTypes = {
  settingsUnchanged: PropTypes.bool.isRequired,
};

export default GreenhouseEffect;
