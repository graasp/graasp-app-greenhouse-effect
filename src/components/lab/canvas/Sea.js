import React from 'react';
import PropTypes from 'prop-types';
import { Group } from 'react-konva';
import IceCaps from './sea/ice-caps/IceCaps';
import SeaBackground from './sea/SeaBackground';

const Sea = ({ cursorBecomesDefault }) => {
  return (
    <Group onMouseEnter={cursorBecomesDefault}>
      <SeaBackground />
      <IceCaps />
    </Group>
  );
};

Sea.propTypes = {
  cursorBecomesDefault: PropTypes.func.isRequired,
};

export default Sea;
