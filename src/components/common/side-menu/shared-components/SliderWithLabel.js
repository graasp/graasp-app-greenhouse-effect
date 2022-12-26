import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  FormControlLabel,
  makeStyles,
  Slider,
  Typography,
} from '@material-ui/core';
import ValueLabel from '@material-ui/core/Slider/ValueLabel';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: theme.spacing(1, 0),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'start',
    width: '95%',
  },
  label: {
    display: 'block',
    margin: theme.spacing(0.5, 2, 0.5, 0),
  },
  slider: {
    width: '50%',
  },
}));

// this component is used to make the label on the CO2 slider wider when the planet is Mars or Venus
// without it, the text (965,000) would not fit
const StyledValueLabel = withStyles({
  circle: {
    marginLeft: -7.5,
    marginTop: -10,
    width: 47.5,
    height: 47.5,
  },
})(ValueLabel);

const SliderWithLabel = ({
  value,
  max,
  min,
  disabled,
  text,
  onChange,
  labelClassName,
  valueLabelDisplay,
  step,
  valueLabelFormat,
  bigLabel,
  onMouseUp,
}) => {
  const classes = useStyles();

  const marks = [
    {
      value: min,
      label: min,
    },
    {
      value: max,
      label: max,
    },
  ];

  const Control = (
    <Slider
      classes={{ root: classes.slider }}
      min={min}
      max={max}
      value={value}
      marks={marks}
      disabled={disabled}
      onChange={onChange}
      valueLabelDisplay={valueLabelDisplay}
      valueLabelFormat={valueLabelFormat}
      ValueLabelComponent={bigLabel ? StyledValueLabel : ValueLabel}
      step={step}
      onMouseUp={onMouseUp}
    />
  );

  const Label = (
    <Typography variant="body2" className={clsx(classes.label, labelClassName)}>
      {/* set in inner html to allow subscript tags */}
      {/* eslint-disable-next-line react/no-danger */}
      <span dangerouslySetInnerHTML={{ __html: text }} />
    </Typography>
  );

  return (
    <FormControlLabel
      className={classes.wrapper}
      control={Control}
      label={Label}
      labelPlacement="start"
    />
  );
};

SliderWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
  min: PropTypes.number,
  max: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func,
  labelClassName: PropTypes.string,
  valueLabelDisplay: PropTypes.string,
  step: PropTypes.number,
  valueLabelFormat: PropTypes.func,
  bigLabel: PropTypes.bool,
  onMouseUp: PropTypes.func,
};

SliderWithLabel.defaultProps = {
  disabled: false,
  labelClassName: null,
  valueLabelDisplay: 'auto',
  min: 0,
  step: 1,
  onChange: () => {},
  valueLabelFormat: (x) => x,
  bigLabel: false,
  onMouseUp: () => {},
};

export default SliderWithLabel;
