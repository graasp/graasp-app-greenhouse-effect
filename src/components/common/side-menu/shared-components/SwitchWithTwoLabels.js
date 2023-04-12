import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import { EMPTY_STRING } from '../../../../constants';

const useStyles = makeStyles((theme) => ({
  switch: {
    color: theme.palette.primary.main,
  },
  leftLabel: {
    margin: theme.spacing(0),
    display: 'flex',
    justifyContent: 'space-between',
    width: '58%',
  },
  rightLabel: {
    margin: theme.spacing(1, 0),
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  label: {
    display: 'block',
  },
}));

const SwitchWithTwoLabels = ({
  isChecked,
  onSwitchToggle,
  leftLabel,
  rightLabel,
  disabled,
  radiationModeSwitch,
}) => {
  const classes = useStyles();

  const Control = (
    <Switch
      disabled={disabled}
      checked={isChecked}
      onChange={onSwitchToggle}
      name={leftLabel}
      color="primary"
      classes={{ switchBase: classes.switch }}
    />
  );

  const LeftLabel = (
    <Typography variant="body2" className={classes.label}>
      {leftLabel}
    </Typography>
  );
  const RightLabel = (
    <div className={radiationModeSwitch ? 'fluxes' : EMPTY_STRING}>
      <Typography variant="body2" className={classes.label}>
        {rightLabel}
      </Typography>
    </div>
  );

  const leftLabelComponent = (
    <FormControlLabel
      className={classes.leftLabel}
      control={Control}
      label={LeftLabel}
      labelPlacement="start"
    />
  );

  return (
    <FormControlLabel
      className={classes.rightLabel}
      control={leftLabelComponent}
      label={RightLabel}
      labelPlacement="end"
    />
  );
};

SwitchWithTwoLabels.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  onSwitchToggle: PropTypes.func.isRequired,
  leftLabel: PropTypes.string.isRequired,
  rightLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    .isRequired,
  disabled: PropTypes.bool,
  radiationModeSwitch: PropTypes.bool,
};

SwitchWithTwoLabels.defaultProps = {
  disabled: false,
  radiationModeSwitch: false,
};

export default SwitchWithTwoLabels;
