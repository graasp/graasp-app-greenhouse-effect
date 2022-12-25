import React from 'react';
import { Group } from 'react-konva';
import EarthFluxes from './earth-fluxes/EarthFluxes';
import SunFluxes from './sun-fluxes/SunFluxes';

const Fluxes = () => {
  return (
    <Group>
      <SunFluxes />
      <EarthFluxes />
    </Group>
  );
};

export default Fluxes;
