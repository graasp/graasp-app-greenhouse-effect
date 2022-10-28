import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Divider, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { toggleSideMenu } from '../../actions';
import { DRAWER_WIDTH, DEFAULT_THEME_DIRECTION } from '../../config/constants';
import RadiationModeSwitch from './RadiationModeSwitch';
import FeedbacksSettings from './FeedbacksSettings';
import GreenhouseEffectSettings from './GreenhouseEffectSettings';
import SimulationMode from './SimulationMode';
import AnimationControls from './AnimationControls';
import ScaleUnitSwitch from './ScaleUnitSwitch';

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
  const { simulationMode, carbonDioxide, methane } = useSelector(
    ({ lab }) => lab,
  );
  const [componentCarbonDioxide, setComponentCarbonDioxide] = useState(
    carbonDioxide,
  );
  const [componentMethane, setComponentMethane] = useState(methane);

  useEffect(() => {
    setComponentCarbonDioxide(carbonDioxide);
    setComponentMethane(methane);
  }, [simulationMode]);

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
          <AnimationControls
            componentCarbonDioxide={componentCarbonDioxide}
            setComponentCarbonDioxide={setComponentCarbonDioxide}
            componentMethane={componentMethane}
            setComponentMethane={setComponentMethane}
          />
          <RadiationModeSwitch />
          <ScaleUnitSwitch />
          <Divider className={classes.divider} />
          <SimulationMode />
          <GreenhouseEffectSettings
            componentCarbonDioxide={componentCarbonDioxide}
            setComponentCarbonDioxide={setComponentCarbonDioxide}
            componentMethane={componentMethane}
            setComponentMethane={setComponentMethane}
          />
          <Divider className={classes.divider} />
          <FeedbacksSettings />
        </div>
      </Drawer>
    </>
  );
};

export default SideMenu;
