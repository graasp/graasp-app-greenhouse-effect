import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Group } from 'react-konva';
import useInterval from '../../../../hooks/useInterval';
import EarthFluxes from './earth-fluxes/EarthFluxes';
import SunFluxes from './sun-fluxes/SunFluxes';
import {
  DEFAULT_FILL,
  DARK_FILL,
  FLUX_BLINKING_INTERVAL,
} from '../../../../config/constants';

const Fluxes = ({ temperature, greenhouseEffect }) => {
  const { fluxesBlinking } = useSelector(({ lab }) => lab);
  const [fluxFill, setFluxFill] = useState(DEFAULT_FILL);

  useInterval(() => {
    if (fluxesBlinking) {
      setFluxFill((prevFill) =>
        prevFill === DEFAULT_FILL ? DARK_FILL : DEFAULT_FILL,
      );
    } else {
      setFluxFill(DEFAULT_FILL);
    }
  }, FLUX_BLINKING_INTERVAL);

  return (
    <Group>
      <SunFluxes fluxFill={fluxFill} />
      <EarthFluxes
        fluxFill={fluxFill}
        temperature={temperature}
        greenhouseEffect={greenhouseEffect}
      />
    </Group>
  );
};

Fluxes.propTypes = {
  greenhouseEffect: PropTypes.number.isRequired,
  temperature: PropTypes.number.isRequired,
};

export default Fluxes;
