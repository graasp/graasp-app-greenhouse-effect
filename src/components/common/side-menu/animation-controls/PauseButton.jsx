import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import { yellow } from '@material-ui/core/colors';
import CustomButton from '../shared-components/CustomButton';
import { setIsPaused } from '../../../../actions';
import { EMPTY_STRING } from '../../../../constants';

const PauseButton = ({ className }) => {
  const { t } = useTranslation();
  const { zoomedIn } = useSelector(({ layout }) => layout);
  const { isPaused, animationPlaying, propagationComplete } = useSelector(
    ({ lab }) => lab,
  );
  const dispatch = useDispatch();

  return (
    <CustomButton
      title={t('Pause')}
      disabled={
        isPaused || zoomedIn || animationPlaying || !propagationComplete
      }
      onClick={() => dispatch(setIsPaused(true))}
      icon={<PauseCircleOutlineIcon className={className} />}
      color={
        !zoomedIn && !animationPlaying && propagationComplete
          ? yellow[800]
          : EMPTY_STRING
      }
    />
  );
};

PauseButton.propTypes = {
  className: PropTypes.string.isRequired,
};

export default PauseButton;
