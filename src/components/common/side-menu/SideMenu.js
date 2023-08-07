import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Divider } from '@material-ui/core';
import { DRAWER_WIDTH } from '../../../constants';
import RadiationModeSwitch from './RadiationModeSwitch';
import FeedbackToggles from './FeedbackToggles';
import GreenhouseEffectSettings from './GreenhouseEffectSettings';
import SimulationMode from './SimulationMode';
import AnimationControls from './AnimationControls';
import ScaleUnitSwitch from './ScaleUnitSwitch';

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    width: DRAWER_WIDTH,
  },
  contentWrapper: {
    margin: theme.spacing(1.5, 2),
  },
  divider: {
    marginBottom: theme.spacing(2),
  },
}));

const SideMenu = () => {
  const classes = useStyles();
  const { showSideMenu } = useSelector(({ layout }) => layout);
  const { sliders, thermometer } = useSelector(({ lab }) => lab);

  const {
    iceCover: sliderIceCover,
    cloudCover: sliderCloudCover,
    methane: sliderMethane,
    carbonDioxide: sliderCarbonDioxide,
  } = sliders;

  const {
    iceCover: thermometerIceCover,
    cloudCover: thermometerCloudCover,
    methane: thermometerMethane,
    carbonDioxide: thermometerCarbonDioxide,
  } = thermometer;

  const settingsUnchanged =
    sliderIceCover === thermometerIceCover &&
    sliderCloudCover === thermometerCloudCover &&
    sliderCarbonDioxide === thermometerCarbonDioxide &&
    sliderMethane === thermometerMethane;

  return (
    <>
      <CssBaseline />
      <Drawer
        variant="persistent"
        anchor="right"
        open={showSideMenu}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.contentWrapper}>
          <AnimationControls settingsUnchanged={settingsUnchanged} />
          <div className="radiation-mode">
            <RadiationModeSwitch />
          </div>
          <ScaleUnitSwitch />
          <Divider className={classes.divider} />
          <div className="epoch">
            <SimulationMode />
          </div>
          <div className="settings">
            <GreenhouseEffectSettings settingsUnchanged={settingsUnchanged} />
          </div>
          <Divider className={classes.divider} />
          <FeedbackToggles />
        </div>
      </Drawer>
    </>
  );
};

export default SideMenu;
