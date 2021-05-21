import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(() => ({
  radioGroup: {
    flexDirection: 'row',
  },
}));

function SimulationMode() {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{t('Values in')}</FormLabel>
      <RadioGroup
        defaultValue="female"
        aria-label="gender"
        name="customized-radios"
        className={classes.radioGroup}
      >
        <FormControlLabel
          value="female"
          control={<Radio color="primary" />}
          label="1900"
        />
        <FormControlLabel
          value="male"
          control={<Radio color="primary" />}
          label={t('Today')}
        />
        <FormControlLabel
          value="other"
          control={<Radio color="primary" />}
          label={t('Custom')}
        />
      </RadioGroup>
    </FormControl>
  );
}

export default SimulationMode;
