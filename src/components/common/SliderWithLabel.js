import React from 'react';
import {
  FormControlLabel,
  makeStyles,
  Slider,
  Typography,
} from '@material-ui/core';
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
  indent: {
    paddingLeft: theme.spacing(3),
  },
}));

const SliderWithLabel = ({
  value,
  max,
  min,
  disabled,
  text,
  finalMarkText,
  onChange,
  indent,
  labelClassName,
  valueLabelDisplay,
  step,
}) => {
  const classes = useStyles();

  const marks = [
    {
      value: min,
      label: min,
    },
    {
      value: max,
      label: finalMarkText ?? max,
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
      step={step}
    />
  );

  const Label = (
    <Typography
      variant="body2"
      className={clsx(classes.label, labelClassName, {
        [classes.indent]: indent,
      })}
    >
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
  text: PropTypes.string.isRequired,
  finalMarkText: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  indent: PropTypes.bool,
  labelClassName: PropTypes.string,
  valueLabelDisplay: PropTypes.string,
  step: PropTypes.number,
};

SliderWithLabel.defaultProps = {
  disabled: false,
  finalMarkText: null,
  indent: false,
  labelClassName: null,
  valueLabelDisplay: 'auto',
  min: 0,
  step: 1,
};

export default SliderWithLabel;
