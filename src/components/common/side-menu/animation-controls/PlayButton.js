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
  handleIceCoverFeedback,
  handleStandardCase,
  handleWaterVaporFeedback,
} from '../../../../utils/side-menu/play-button';
import { EMPTY_STRING, RADIATION_MODES } from '../../../../constants';

const PlayButton = ({ className, settingsUnchanged }) => {
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
    iceCoverTemporary,
    propagationComplete,
  } = useSelector(({ lab }) => lab);
  const { waterVaporFeedbackOn, iceCoverFeedbackOn } = feedback;
  const { temperature: impliedTemperature } = sliders;
  const { temperature: thermometerTemperature } = thermometer;

  const onClickPlay = () => {
    dispatch(setIsPaused(false));
    stopFluxesBlinking();
    dispatch(resetFluxesFills());
    dispatch(showRunawayWarning(false));

    // used to cover the starting case in 2020, where system is initially out of equilibrium
    if (!propagationComplete) {
      return;
    }

    if (thermometerTemperature !== impliedTemperature) {
      dispatch(setPreviousSettings({ sliders, thermometer, feedback }));
      if (radiationMode === RADIATION_MODES.WAVES) {
        handleStandardCase(sliders, thermometer, dispatch);
      } else if (radiationMode === RADIATION_MODES.FLUXES) {
        if (waterVaporFeedbackOn) {
          let targetTemperature;
          if (settingsUnchanged) {
            targetTemperature = thermometerTemperature;
            handleWaterVaporFeedback(
              sliders,
              targetTemperature,
              dispatch,
              simulationMode,
            );
          } else {
            targetTemperature = impliedTemperature;
            handleStandardCase(sliders, thermometer, dispatch, () => {
              handleWaterVaporFeedback(
                sliders,
                targetTemperature,
                dispatch,
                simulationMode,
              );
            });
          }
        } else if (iceCoverFeedbackOn) {
          let targetTemperature;
          if (iceCoverTemporary) {
            targetTemperature = thermometerTemperature;
            handleIceCoverFeedback(
              sliders,
              targetTemperature,
              dispatch,
              simulationMode,
            );
          } else {
            targetTemperature = impliedTemperature;
            handleStandardCase(sliders, thermometer, dispatch, () => {
              handleIceCoverFeedback(
                sliders,
                targetTemperature,
                dispatch,
                simulationMode,
              );
            });
          }
        } else {
          handleStandardCase(sliders, thermometer, dispatch);
        }
      }
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
  settingsUnchanged: PropTypes.bool.isRequired,
};

export default PlayButton;
