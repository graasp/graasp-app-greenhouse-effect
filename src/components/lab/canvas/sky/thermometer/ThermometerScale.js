import React from 'react';
import PropTypes from 'prop-types';
import { Group } from 'react-konva';
import { THERMOMETER_SCALE_NUM_GRADES } from '../../../../../config/constants';
import ThermometerScaleGrade from './ThermometerScaleGrade';

const ThermometerScale = ({ thermometerBodyHeight, labels }) => {
  const step = thermometerBodyHeight / (THERMOMETER_SCALE_NUM_GRADES - 1);

  return (
    <Group>
      {new Array(THERMOMETER_SCALE_NUM_GRADES)
        .fill()
        .map((emptyElement, index) => (
          <ThermometerScaleGrade
            y={step * index * -1}
            label={labels[index]}
            step={step}
            // eslint-disable-next-line react/no-array-index-key
            key={index}
          />
        ))}
    </Group>
  );
};

ThermometerScale.propTypes = {
  thermometerBodyHeight: PropTypes.number.isRequired,
  labels: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default ThermometerScale;
