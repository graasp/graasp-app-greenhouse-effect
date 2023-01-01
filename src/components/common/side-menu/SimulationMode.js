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
import { SIMULATION_MODES } from '../../../config/constants';
import {
  setFeedbackValues,
  setSimulationMode,
  toggleZoom,
} from '../../../actions';

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '100%',
  },
  radioGroup: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
  },
  formLabel: {
    color: 'black',
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
  },
  radioText: {
    fontSize: '0.8em',
  },
  radioButton: {
    paddingRight: 5,
    '& svg': {
      width: '0.9em',
      height: '0.9em',
    },
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
    dispatch(
      setFeedbackValues({
        waterVaporFeedbackOn: false,
        iceCoverFeedbackOn: false,
      }),
    );
    dispatch(toggleZoom(false));
  };

  return (
    <FormControl component="fieldset" className={classes.formControl}>
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
            control={
              // eslint-disable-next-line react/jsx-wrap-multilines
              <Radio
                color="primary"
                size="small"
                className={classes.radioButton}
              />
            }
            label={
              <Typography className={classes.radioText}>{name}</Typography>
            }
            disabled={!isPaused}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

export default SimulationMode;
