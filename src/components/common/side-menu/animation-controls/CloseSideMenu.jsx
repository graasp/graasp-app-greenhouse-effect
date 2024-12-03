import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { IconButton, Tooltip, useTheme } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import { DEFAULT_THEME_DIRECTION } from '../../../../constants';
import { toggleSideMenu } from '../../../../actions';

const CloseSideMenu = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <Tooltip title={t('Close side menu')} placement="right">
      <IconButton
        onClick={() => {
          dispatch(toggleSideMenu(false));
        }}
      >
        {theme.direction === DEFAULT_THEME_DIRECTION ? (
          <ChevronLeft />
        ) : (
          <ChevronRight />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default CloseSideMenu;
