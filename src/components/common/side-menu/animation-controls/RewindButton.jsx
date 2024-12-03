import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import FastRewind from '@material-ui/icons/FastRewind';
import { red } from '@material-ui/core/colors';
import CustomButton from '../shared-components/CustomButton';
import {
  clearStoredSettings,
  restoreSettings,
  setIsPaused,
} from '../../../../actions';
import { blinkFluxes } from '../../../../utils';
import { EMPTY_STRING } from '../../../../constants';

const RewindButton = ({ className }) => {
  const { t } = useTranslation();
  const { zoomedIn } = useSelector(({ layout }) => layout);
  const { previousSettings, animationPlaying } = useSelector(({ lab }) => lab);
  const dispatch = useDispatch();

  const onRewind = () => {
    dispatch(setIsPaused(true));
    dispatch(restoreSettings(previousSettings));
    blinkFluxes(previousSettings.fluxesToBlink, dispatch);
    dispatch(clearStoredSettings({}));
  };

  const rewindImpossible = !Object.keys(previousSettings).length;

  return (
    <CustomButton
      title={t('Rewind')}
      tooltipPlacement="top"
      disabled={rewindImpossible || zoomedIn || animationPlaying}
      onClick={onRewind}
      icon={<FastRewind className={className} />}
      color={
        !rewindImpossible && !animationPlaying && !zoomedIn
          ? red[800]
          : EMPTY_STRING
      }
    />
  );
};

RewindButton.propTypes = {
  className: PropTypes.string.isRequired,
};

export default RewindButton;
