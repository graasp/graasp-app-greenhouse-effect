import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import { orange } from '@material-ui/core/colors';
import CustomButton from '../shared-components/CustomButton';
import { reset, setVariable, toggleZoom } from '../../../../actions';
import {
  CARBON_DIOXIDE_FOR_15_C,
  EMPTY_STRING,
  SIMULATION_MODES,
  THERMOMETER,
} from '../../../../constants';

const ResetButton = ({ className }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { animationPlaying, simulationMode } = useSelector(({ lab }) => lab);

  const onReset = () => {
    const originalMode = Object.values(SIMULATION_MODES).find(
      ({ name }) => name === simulationMode,
    );
    dispatch(reset(originalMode));
    if (originalMode.name === SIMULATION_MODES.TODAY.name) {
      dispatch(
        setVariable([{ carbonDioxide: CARBON_DIOXIDE_FOR_15_C }, THERMOMETER]),
      );
    }
    dispatch(toggleZoom(false));
  };

  return (
    <CustomButton
      title={t('Reset')}
      disabled={animationPlaying}
      tooltipPlacement="right"
      onClick={onReset}
      icon={<RotateLeftIcon className={className} />}
      color={!animationPlaying ? orange[800] : EMPTY_STRING}
    />
  );
};

ResetButton.propTypes = {
  className: PropTypes.string.isRequired,
};

export default ResetButton;
