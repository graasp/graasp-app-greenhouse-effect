import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Checkbox, Tooltip, makeStyles } from '@material-ui/core';
import { RadioButtonChecked, RadioButtonUnchecked } from '@material-ui/icons';
import { orange } from '@material-ui/core/colors';
import { setShowNetFlux } from '../../../actions';
import { RADIATION_MODES } from '../../../constants';

const useStyles = makeStyles(() => ({
  active: { color: orange[900] },
  inactive: { color: '' },
  container: { display: 'flex' },
}));

const NetFluxToggle = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { showNetFlux, propagationComplete, radiationMode } = useSelector(
    ({ lab }) => lab,
  );
  const { t } = useTranslation();

  const onChange = (event) => {
    return event.target.checked
      ? dispatch(setShowNetFlux(true))
      : dispatch(setShowNetFlux(false));
  };

  const disabled =
    !propagationComplete || radiationMode === RADIATION_MODES.WAVES;
  const className = disabled ? classes.inactive : classes.active;

  return (
    <Tooltip
      title={showNetFlux ? t('Hide net flux') : t('Show net flux')}
      className={classes.container}
    >
      <span>
        <Checkbox
          checked={showNetFlux}
          icon={<RadioButtonUnchecked fontSize="small" className={className} />}
          checkedIcon={
            <RadioButtonChecked fontSize="small" className={className} />
          }
          onChange={onChange}
          disabled={disabled}
        />
      </span>
    </Tooltip>
  );
};

export default NetFluxToggle;
