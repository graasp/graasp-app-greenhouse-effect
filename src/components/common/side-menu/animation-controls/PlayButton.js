import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import { green } from '@material-ui/core/colors';
import CustomButton from '../shared-components/CustomButton';
import {
  setIsPaused,
  resetFluxesFills,
  storeSettings,
  showRunawayWarning,
} from '../../../../actions';
import { stopFluxesBlinking } from '../../../../utils';
import { handleDisequilibrium } from '../../../../utils/side-menu/handle-disequilibrium';
import { EMPTY_STRING } from '../../../../constants';

const PlayButton = ({ className, slidersUnchanged }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { zoomedIn } = useSelector(({ layout }) => layout);
  const settings = useSelector(({ lab }) => lab);
  const {
    isPaused,
    sliders,
    thermometer,
    animationPlaying,
    propagationComplete,
    waterFeedback,
    iceFeedback,
  } = settings;
  const { temperature: impliedTemp } = sliders;
  const { temperature: thermoTemp } = thermometer;

  const saveSettings = () => {
    dispatch(
      storeSettings({
        sliders,
        thermometer,
        waterFeedback,
        iceFeedback,
      }),
    );
  };

  const resetCanvas = () => {
    stopFluxesBlinking();
    dispatch(resetFluxesFills());
    dispatch(showRunawayWarning(false));
  };

  const onClickPlay = () => {
    dispatch(setIsPaused(false));
    resetCanvas();

    if (!propagationComplete) {
      return;
    }

    if (thermoTemp !== impliedTemp) {
      saveSettings();
      handleDisequilibrium(settings, dispatch, slidersUnchanged);
    }
  };

  return (
    <div className="play-button">
      <CustomButton
        title={t('Play')}
        disabled={!isPaused || zoomedIn || animationPlaying}
        onClick={onClickPlay}
        icon={<PlayCircleOutlineIcon className={className} />}
        color={!zoomedIn && !animationPlaying ? green[800] : EMPTY_STRING}
      />
    </div>
  );
};

PlayButton.propTypes = {
  className: PropTypes.string.isRequired,
  slidersUnchanged: PropTypes.bool.isRequired,
};

export default PlayButton;
