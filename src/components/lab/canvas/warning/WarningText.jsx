import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Text } from 'react-konva';
import {
  WARNING_TEXT_ALIGN,
  WARNING_TEXT_FONT_SIZE,
  WARNING_TEXT_VERTICAL_ALIGN,
} from '../../../../constants/canvas/warning';

const WarningText = ({ x, y, width, height }) => {
  const { t } = useTranslation();

  return (
    <Text
      x={x}
      y={y}
      width={width}
      height={height}
      text={t('Runaway greenhouse effect!')}
      fontSize={WARNING_TEXT_FONT_SIZE}
      align={WARNING_TEXT_ALIGN}
      verticalAlign={WARNING_TEXT_VERTICAL_ALIGN}
    />
  );
};

WarningText.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default WarningText;
