import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Divider, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { toggleSideMenu } from '../../../actions';
import { DRAWER_WIDTH, DEFAULT_THEME_DIRECTION } from '../../../constants';
import RadiationModeSwitch from './RadiationModeSwitch';
import FeedbackToggles from './FeedbackToggles';
import GreenhouseEffectSettings from './GreenhouseEffectSettings';
import SimulationMode from './SimulationMode';
import AnimationControls from './AnimationControls';
import ScaleUnitSwitch from './ScaleUnitSwitch';
import Tour from './Tour';
import TOUR_STEPS from '../../../config/tour-steps';

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    width: DRAWER_WIDTH,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  contentWrapper: {
    margin: theme.spacing(2),
  },
  divider: {
    marginBottom: theme.spacing(2),
  },
}));

const SideMenu = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const { showSideMenu } = useSelector(({ layout }) => layout);
  const INITIAL_TOUR_STATE = {
    run: false,
    continuous: true,
    loading: false,
    stepIndex: 0,
    steps: TOUR_STEPS,
  };
  const [tourState, setTourState] = useState(INITIAL_TOUR_STATE);
  const startTour = () => {
    setTourState((prevState) => ({
      ...prevState,
      stepIndex: 0,
      run: true,
      loading: false,
    }));
  };

  const handleToggleSideMenu = (open) => {
    dispatch(toggleSideMenu(open));
  };

  const renderDrawerHeader = () => {
    return (
      <>
        <div className={classes.drawerHeader}>
          <IconButton onClick={() => handleToggleSideMenu(false)}>
            {theme.direction === DEFAULT_THEME_DIRECTION ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
          <Typography variant="h5">{t('Observe')}</Typography>
          <div>
            <Tour tourState={tourState} setTourState={setTourState} />
          </div>
        </div>
        <Divider />
      </>
    );
  };

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
        {renderDrawerHeader()}
        <div className={classes.contentWrapper}>
          <div className="controls">
            <AnimationControls startTour={startTour} />
          </div>
          <div className="radiation-mode">
            <RadiationModeSwitch />
          </div>
          <ScaleUnitSwitch />
          <Divider className={classes.divider} />
          <div className="epoch">
            <SimulationMode />
          </div>
          <div className="settings">
            <GreenhouseEffectSettings />
          </div>
          <Divider className={classes.divider} />
          <FeedbackToggles />
        </div>
      </Drawer>
    </>
  );
};

export default SideMenu;
