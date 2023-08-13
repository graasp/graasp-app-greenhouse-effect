import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Group } from 'react-konva';
import GroundToSkyFlux from './GroundToSkyFlux';
import SkyToAtmosphereFlux from './SkyToAtmosphereFlux';
import SkyToGroundFlux from './SkyToGroundFlux';
import { FluxesWavesContext } from '../../../../contexts/fluxes-waves/FluxesWavesProvider';

const EarthFluxes = ({ earthEnergies, sunEnergies }) => {
  const { isMars } = useContext(FluxesWavesContext);
  const { fluxesFills, thermometer, sliders } = useSelector(({ lab }) => lab);
  const { temperature: thermometerTemperature } = thermometer;
  const { temperature: impliedTemperature } = sliders;
  const { groundToSky, skyToAtmosphere, skyToGround } = fluxesFills;

  const {
    groundToSky: groundToSkyEnergy,
    skyToGround: skyToGroundEnergy,
    skyToAtmosphere: skyToAtmosphereEnergy,
  } = earthEnergies;

  const { sunToCloud, cloudToAtmosphere, groundToAtmosphere } = sunEnergies;

  // due to rounding, there are cases where the sum of the emitted fluxes does not equal the original incoming flux, violating equilibrium
  // to correct these cases, at equilibrium always calculate the skyToAtmosphere energy via the other fluxes
  const atEquilibrium = thermometerTemperature === impliedTemperature;
  const skyToAtmosphereDisplayedEnergy = atEquilibrium
    ? sunToCloud - (cloudToAtmosphere + groundToAtmosphere)
    : skyToAtmosphereEnergy;

  return (
    <Group>
      <GroundToSkyFlux energy={groundToSkyEnergy} fill={groundToSky} />
      {!isMars && (
        <SkyToGroundFlux energy={skyToGroundEnergy} fill={skyToGround} />
      )}
      {!isMars && (
        <SkyToAtmosphereFlux
          energy={skyToAtmosphereDisplayedEnergy}
          fill={skyToAtmosphere}
        />
      )}
    </Group>
  );
};

EarthFluxes.propTypes = {
  earthEnergies: PropTypes.objectOf(PropTypes.number).isRequired,
  sunEnergies: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default EarthFluxes;
