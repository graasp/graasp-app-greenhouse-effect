import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { useDispatch, useSelector } from 'react-redux';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { SIMULATION_MODES } from '../../config/constants';
import { setSimulationMode } from '../../actions';

const useStyles = makeStyles((theme) => ({
  radioGroup: {
    flexDirection: 'row',
  },
  formLabel: {
    color: 'black',
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
  },
  radioText: {
    fontSize: '0.84em',
  },
}));

function SimulationMode() {
  const classes = useStyles();
  const isPaused = useSelector(({ lab }) => lab.isPaused);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const simulationMode = useSelector(({ lab }) => lab.simulationMode);

  const handleChange = (e) => {
    const values = Object.values(SIMULATION_MODES).find(
      ({ name }) => name === e.target.value,
    );
    dispatch(setSimulationMode(values));
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">
        <Typography variant="body2" className={classes.formLabel}>
          {t('Values in')}
        </Typography>
      </FormLabel>
      <RadioGroup
        onChange={handleChange}
        defaultValue={SIMULATION_MODES.TODAY.name}
        aria-label={t('Simulation mode')}
        value={simulationMode}
        className={classes.radioGroup}
      >
        {Object.values(SIMULATION_MODES).map(({ name }) => (
          <FormControlLabel
            key={name}
            value={name}
            control={<Radio color="primary" size="small" />}
            label={
              <Typography className={classes.radioText}>{name}</Typography>
            }
            disabled={!isPaused}
            className={classes.radioButton}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

export default SimulationMode;
