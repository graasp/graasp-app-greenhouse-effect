import React from 'react';
import PropTypes from 'prop-types';
import { Group } from 'react-konva';
import Sun from './atmosphere/Sun';
import AtmosphereBackground from './atmosphere/AtmosphereBackground';

const Atmosphere = ({ cursorBecomesDefault }) => {
  return (
    <Group onMouseEnter={cursorBecomesDefault}>
      <AtmosphereBackground />
      <Sun />
    </Group>
  );
};

Atmosphere.propTypes = {
  cursorBecomesDefault: PropTypes.func.isRequired,
};

export default Atmosphere;
