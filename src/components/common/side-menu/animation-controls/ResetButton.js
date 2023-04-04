import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import { orange } from '@material-ui/core/colors';
import CustomButton from '../shared-components/CustomButton';
import { reset, toggleZoom } from '../../../../actions';
import { EMPTY_STRING } from '../../../../constants';

const ResetButton = ({ className }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { animationPlaying } = useSelector(({ lab }) => lab);

  const onReset = () => {
    dispatch(reset());
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
