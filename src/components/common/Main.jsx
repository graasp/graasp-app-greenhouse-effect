import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import TuneIcon from '@material-ui/icons/Tune';
import { withStyles } from '@material-ui/core/styles';
import { CssBaseline, Fab, Tooltip } from '@material-ui/core';
import { toggleSideMenu } from '../../actions';
import Header from './Header';
import SideMenu from './side-menu/SideMenu';
import { DEFAULT_HEADER_VISIBLE, MAXIMUM_Z_INDEX } from '../../constants';

const styles = (theme) => ({
  root: {
    display: 'flex',
    height: '100%',
    width: '100%',
  },
  fab: {
    right: theme.spacing(2),
    top: theme.spacing(2),
    position: 'absolute',
    zIndex: MAXIMUM_Z_INDEX,
  },
});

class Main extends Component {
  static propTypes = {
    classes: PropTypes.shape({
      fab: PropTypes.string.isRequired,
      root: PropTypes.string.isRequired,
    }).isRequired,
    showSideMenu: PropTypes.bool.isRequired,
    headerVisible: PropTypes.bool,
    dispatchToggleSideMenu: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
    t: PropTypes.func.isRequired,
  };

  static defaultProps = {
    headerVisible: DEFAULT_HEADER_VISIBLE,
  };

  handleToggleSideMenu = (open) => () => {
    const { dispatchToggleSideMenu } = this.props;
    dispatchToggleSideMenu(open);
  };

  render() {
    const { classes, showSideMenu, headerVisible, children, t } = this.props;

    const fab = !showSideMenu && (
      <Tooltip title="Open side menu">
        <Fab
          color="primary"
          aria-label={t('Open Drawer')}
          onClick={this.handleToggleSideMenu(!showSideMenu)}
          className={classes.fab}
        >
          <TuneIcon />
        </Fab>
      </Tooltip>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        {headerVisible ? <Header /> : fab}
        <SideMenu />
        {children}
      </div>
    );
  }
}

const mapStateToProps = ({ layout, appInstance }) => ({
  headerVisible: appInstance.content.settings.headerVisible,
  showSideMenu: layout.showSideMenu,
  themeColor: layout.themeColor,
});

const mapDispatchToProps = {
  dispatchToggleSideMenu: toggleSideMenu,
};

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(Main);

const StyledComponent = withStyles(styles, { withTheme: true })(
  ConnectedComponent,
);
const TranslatedComponent = withTranslation()(StyledComponent);

export default withTranslation()(TranslatedComponent);
