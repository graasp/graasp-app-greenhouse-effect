import React from 'react';
import {
  FormControlLabel,
  makeStyles,
  Slider,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';

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

const SliderWithLabel = ({
  value,
  max,
  disabled,
  text,
  finalMarkText,
  onChange,
}) => {
  const classes = useStyles();

  const marks = [
    {
      value: 0,
      label: '0',
    },
    {
      value: max,
      label: finalMarkText ?? max,
    },
  ];

  const Control = (
    <Slider
      classes={{ root: classes.slider }}
      min={0}
      max={max}
      valueLabelDisplay="auto"
      value={value}
      marks={marks}
      disabled={disabled}
      onChange={onChange}
    />
  );

  const Label = (
    <Typography variant="body2" className={classes.label}>
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
  max: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
  text: PropTypes.string.isRequired,
  finalMarkText: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

SliderWithLabel.defaultProps = {
  disabled: false,
  finalMarkText: null,
};

export default SliderWithLabel;