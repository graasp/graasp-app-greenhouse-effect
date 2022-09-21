import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
  EARTH_RADIATION_COLOR,
  RADIATION_STATES,
  INFRARED_WAVELENGTH,
  STEFAN_BOLTZMANN_CONSTANT,
} from '../../config/constants';
import EmittedLine from './EmittedLine';
import {
  computeCurrentTemperature,
  computeGreenhouseEffect,
} from '../../utils/greenhouseEffect';

const EarthWaves = ({ earthRadiation }) => {
  const [gasesRadiation, setGasesRadiation] = useState(false);
  const albedo = useSelector(({ lab }) => lab.albedo);
  const { isPaused, simulationMode } = useSelector(({ lab }) => lab);
  const { methane, carbonDioxide } = useSelector(
    ({ lab }) => lab.greenhouseGasesValues,
  );

  const [values, setValues] = useState({ methane, carbonDioxide, albedo });

  useEffect(() => {
    if (!isPaused) {
      setValues({ methane, carbonDioxide, albedo });
    }
  }, [methane, carbonDioxide, albedo, isPaused]);

  const { width, height } = useSelector(
    ({ layout }) => layout.lab.stageDimensions,
  );
  const greenhouseEffect = computeGreenhouseEffect({
    ...values,
    simulationMode,
  });
  const temperature = computeCurrentTemperature({
    greenhouseEffect,
    albedo: values.albedo,
    simulationMode,
  });
  const futureGreenhouseEffect = computeGreenhouseEffect({
    methane,
    carbonDioxide,
    simulationMode,
  });

  const onEnd = (state) => {
    switch (state) {
      // update grouped animation: earth
      case RADIATION_STATES.GASES_RADIATION:
        setGasesRadiation(true);
        break;
      default:
    }
  };

  const EARTH_EMITTED_INFRARED_VALUES = {
    value: Math.round(STEFAN_BOLTZMANN_CONSTANT * temperature ** 4),
    width: 80, // use for flux
    amplitude: 100, // use for wave
  };

  const greenhouseGasesRadiationOrigin = {
    x: width * 0.8,
    y: height * 0.55,
  };

  return (
    <>
      <EmittedLine
        color={EARTH_RADIATION_COLOR}
        show={earthRadiation}
        maxPointsForLine={80}
        angle={180}
        origin={{
          x: width * 0.6,
          y: height * 0.8,
        }}
        amplitude={EARTH_EMITTED_INFRARED_VALUES.amplitude}
        wavelength={INFRARED_WAVELENGTH}
        onEnd={() => onEnd(RADIATION_STATES.GASES_RADIATION)}
      />
      <EmittedLine
        color={EARTH_RADIATION_COLOR}
        show={gasesRadiation}
        maxPointsForLine={100}
        angle={-20}
        origin={greenhouseGasesRadiationOrigin}
        amplitude={
          EARTH_EMITTED_INFRARED_VALUES.amplitude * futureGreenhouseEffect
        }
        wavelength={INFRARED_WAVELENGTH}
      />
      <EmittedLine
        color={EARTH_RADIATION_COLOR}
        show={gasesRadiation}
        maxPointsForLine={120}
        angle={180}
        origin={{
          ...greenhouseGasesRadiationOrigin,
          y: greenhouseGasesRadiationOrigin.y - 90,
        }}
        amplitude={
          EARTH_EMITTED_INFRARED_VALUES.amplitude * (1 - futureGreenhouseEffect)
        }
        wavelength={INFRARED_WAVELENGTH}
      />
    </>
  );
};

EarthWaves.propTypes = {
  earthRadiation: PropTypes.bool.isRequired,
};

export default EarthWaves;
