import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { useDispatch } from 'react-redux';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { SIMULATION_MODES } from '../../config/constants';
import { setSimulationMode } from '../../actions';

const useStyles = makeStyles(() => ({
  radioGroup: {
    flexDirection: 'row',
  },
}));

function SimulationMode() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleChange = (e) => {
    const values = Object.values(SIMULATION_MODES).find(
      ({ name }) => name === e.target.value,
    );
    dispatch(setSimulationMode(values));
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{t('Values in')}</FormLabel>
      <RadioGroup
        onChange={handleChange}
        defaultValue={SIMULATION_MODES.TODAY.name}
        aria-label={t('simulation mode')}
        className={classes.radioGroup}
      >
        {Object.values(SIMULATION_MODES).map(({ name }) => (
          <FormControlLabel
            value={name}
            control={<Radio color="primary" />}
            label={name}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

export default SimulationMode;
