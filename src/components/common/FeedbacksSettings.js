import { Typography } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setFeedbackValues } from '../../actions';
import SwitchWithLabel from './SwitchWithLabel';

const FeedbacksSettings = () => {
  const { t } = useTranslation();
  const feedback = useSelector(({ lab }) => lab.feedback);
  const { iceCoverChange, waterVapor } = feedback;
  const dispatch = useDispatch();

  const onToggleIceCoverChange = (checked) => {
    dispatch(setFeedbackValues({ iceCoverChange: checked }));
  };

  const onToggleWaterVapor = (checked) => {
    dispatch(setFeedbackValues({ waterVapor: checked }));
  };

  return (
    <>
      <Typography variant="h6">{t('Feedback')}</Typography>
      <SwitchWithLabel
        switchLabel={t('Water Vapor')}
        isChecked={waterVapor}
        onToggle={onToggleWaterVapor}
      />
      <SwitchWithLabel
        switchLabel={t('Ice and Snow Cover Change')}
        isChecked={iceCoverChange}
        onToggle={onToggleIceCoverChange}
      />
    </>
  );
};

export default FeedbacksSettings;
