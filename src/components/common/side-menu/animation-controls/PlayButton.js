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
  setPreviousSettings,
  showRunawayWarning,
} from '../../../../actions';
import { stopFluxesBlinking } from '../../../../utils';
import {
  handleBothFeedbacks,
  handleIceCoverFeedback,
  handleStandardCase,
  handleWaterVaporFeedback,
} from '../../../../utils/side-menu/play-button';
import { EMPTY_STRING, RADIATION_MODES } from '../../../../constants';

const PlayButton = ({ className }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { zoomedIn } = useSelector(({ layout }) => layout);
  const {
    isPaused,
    feedback,
    simulationMode,
    radiationMode,
    sliders,
    thermometer,
    animationPlaying,
  } = useSelector(({ lab }) => lab);
  const { waterVaporFeedbackOn, iceCoverFeedbackOn } = feedback;
  const { temperature: impliedTemperature } = sliders;
  const { temperature: thermometerTemperature } = thermometer;

  const onClickPlay = () => {
    dispatch(setIsPaused(false));
    stopFluxesBlinking();
    dispatch(resetFluxesFills());
    dispatch(showRunawayWarning(false));

    if (thermometerTemperature !== impliedTemperature) {
      dispatch(setPreviousSettings({ sliders, thermometer, feedback }));
      if (radiationMode === RADIATION_MODES.WAVES) {
        handleStandardCase(sliders, thermometer, dispatch);
      } else if (radiationMode === RADIATION_MODES.FLUXES) {
        if (waterVaporFeedbackOn && iceCoverFeedbackOn) {
          handleBothFeedbacks(sliders, thermometer, dispatch, simulationMode);
        } else if (waterVaporFeedbackOn) {
          handleWaterVaporFeedback(
            sliders,
            thermometer,
            dispatch,
            simulationMode,
          );
        } else if (iceCoverFeedbackOn) {
          handleIceCoverFeedback(sliders, dispatch, simulationMode);
        } else {
          handleStandardCase(sliders, thermometer, dispatch);
        }
      }
    }
  };

  return (
    <CustomButton
      title={t('Play')}
      disabled={!isPaused || zoomedIn || animationPlaying}
      onClick={onClickPlay}
      icon={<PlayCircleOutlineIcon className={className} />}
      color={!zoomedIn && !animationPlaying ? green[800] : EMPTY_STRING}
    />
  );
};

PlayButton.propTypes = {
  className: PropTypes.string.isRequired,
};

export default PlayButton;