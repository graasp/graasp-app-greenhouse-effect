import React from 'react';
import PropTypes from 'prop-types';
import { Group } from 'react-konva';
import EarthFluxes from './earth-fluxes/EarthFluxes';
import SunFluxes from './sun-fluxes/SunFluxes';

const Fluxes = ({ sunEnergies, earthEnergies }) => {
  return (
    <Group>
      <SunFluxes sunEnergies={sunEnergies} />
      <EarthFluxes earthEnergies={earthEnergies} />
    </Group>
  );
};

Fluxes.propTypes = {
  sunEnergies: PropTypes.objectOf(PropTypes.number).isRequired,
  earthEnergies: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default Fluxes;
