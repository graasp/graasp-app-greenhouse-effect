import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import SliderWithLabel from '../shared-components/SliderWithLabel';
import { ALBEDO_MAX_VALUE, ON_STRING } from '../../../../config/constants';
import IceSnowCover from './IceSnowCover';
import CloudCover from './CloudCover';

const useStyles = makeStyles(() => ({
  title: {
    fontWeight: 'bold',
    color: 'black',
  },
}));

const Albedo = ({ disabled }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { impliedAlbedo } = useSelector(({ lab }) => lab);

  return (
    <>
      <SliderWithLabel
        text={t('Albedo (%)')}
        max={ALBEDO_MAX_VALUE}
        value={parseFloat((impliedAlbedo.totalAlbedo * 100).toFixed(1))}
        labelClassName={classes.title}
        valueLabelDisplay={ON_STRING}
        disabled
      />
      <IceSnowCover disabled={disabled} />
      <CloudCover disabled={disabled} />
    </>
  );
};

Albedo.propTypes = {
  disabled: PropTypes.bool.isRequired,
};

export default Albedo;
