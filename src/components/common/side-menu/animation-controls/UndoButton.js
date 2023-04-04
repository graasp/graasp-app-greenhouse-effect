import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import UndoIcon from '@material-ui/icons/Undo';
import { teal } from '@material-ui/core/colors';
import CustomButton from '../shared-components/CustomButton';
import {
  clearPreviousSettings,
  restorePreviousSettings,
  setIsPaused,
} from '../../../../actions';
import { keepFluxesBlinking } from '../../../../utils';
import { EMPTY_STRING } from '../../../../constants';

const UndoButton = ({ className }) => {
  const { t } = useTranslation();
  const { zoomedIn } = useSelector(({ layout }) => layout);
  const { previousSettings, animationPlaying } = useSelector(({ lab }) => lab);
  const dispatch = useDispatch();

  const onUndo = () => {
    dispatch(setIsPaused(true));
    dispatch(restorePreviousSettings(previousSettings));
    keepFluxesBlinking(previousSettings.fluxesToBlink, dispatch);
    dispatch(clearPreviousSettings({}));
  };

  const undoImpossible = !Object.keys(previousSettings).length;

  return (
    <CustomButton
      title={t('Undo')}
      tooltipPlacement="top"
      disabled={undoImpossible || zoomedIn || animationPlaying}
      onClick={onUndo}
      icon={<UndoIcon className={className} />}
      color={
        !undoImpossible && !animationPlaying && !zoomedIn
          ? teal[900]
          : EMPTY_STRING
      }
    />
  );
};

UndoButton.propTypes = {
  className: PropTypes.string.isRequired,
};

export default UndoButton;
