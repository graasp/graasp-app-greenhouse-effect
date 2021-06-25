import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
  EARTH_RADIATION_COLOR,
  RADIATION_STATES,
  SEA,
  ICE_CAP_HEIGHT,
  ICE_CAP_ROWS_BEGIN,
  X_DISTANCE_BETWEEN_ICE_CAPS,
  STEFAN_BOLTZMANN_CONSTANT,
} from '../../config/constants';
import Flux from './Flux';
import {
  computeCurrentTemperature,
  computeGreenhouseEffect,
} from '../../utils/greenhouseEffect';

const EarthFluxes = ({ sunToCloudRadiation, earthRadiation }) => {
  const [gasesRadiation, setGasesRadiation] = useState(false);
  const albedo = useSelector(({ lab }) => lab.albedo);
  const isPaused = useSelector(({ lab }) => lab.isPaused);
  const { methane, carbonDioxide } = useSelector(
    ({ lab }) => lab.greenhouseGasesValues,
  );

  const [values, setValues] = useState({ methane, carbonDioxide, albedo });

  useEffect(() => {
    if (!isPaused) {
      setValues({ methane, carbonDioxide, albedo });
    }
  }, [methane, carbonDioxide, albedo, isPaused]);

  //   useEffect(()=>{
  //     if(!earthRadiation) {

  //     }
  //   }, [earthRadiation])

  const { width, height } = useSelector(
    ({ layout }) => layout.lab.stageDimensions,
  );
  const greenhouseEffect = computeGreenhouseEffect(values);
  const temperature = computeCurrentTemperature({
    greenhouseEffect,
    albedo: values.albedo,
  });
  const futureGreenhouseEffect = computeGreenhouseEffect({
    methane,
    carbonDioxide,
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

  const iceToSkyRadiation = {
    x: width * (ICE_CAP_ROWS_BEGIN[0].x - X_DISTANCE_BETWEEN_ICE_CAPS * 3),
    y: height * (1 - SEA.height * (1 + ICE_CAP_HEIGHT)),
  };

  const earthToGasesRadiation = {
    x: width * 0.75,
    y: height * 0.6,
  };

  const gasesToEarthRadiation = {
    x: width * 0.9,
  };

  const gasesToSkyRadiation = {
    x: width * 0.85,
  };

  const EARTH_EMITTED_INFRARED_VALUES = {
    value: Math.round(STEFAN_BOLTZMANN_CONSTANT * temperature ** 4),
    width: 80, // use for flux
    amplitude: 100, // use for wave
  };

  const AIR_TO_EARTH_INFRARED = {
    width: Math.round(
      EARTH_EMITTED_INFRARED_VALUES.width * futureGreenhouseEffect,
    ),
    value: Math.round(
      EARTH_EMITTED_INFRARED_VALUES.value * futureGreenhouseEffect,
    ),
  };
  const AIR_TO_SPACE_INFRARED = {
    width: EARTH_EMITTED_INFRARED_VALUES.width - AIR_TO_EARTH_INFRARED.width,
    value: EARTH_EMITTED_INFRARED_VALUES.value - AIR_TO_EARTH_INFRARED.value,
  };

  return (
    <>
      <Flux
        x={earthToGasesRadiation.x}
        y={earthToGasesRadiation.y}
        color={EARTH_RADIATION_COLOR}
        width={EARTH_EMITTED_INFRARED_VALUES.width}
        height={140}
        text={EARTH_EMITTED_INFRARED_VALUES.value}
        angle={180}
        show={earthRadiation}
        onEnd={() => {
          onEnd(RADIATION_STATES.GASES_RADIATION);
        }}
        log
      />
      <Flux
        x={gasesToSkyRadiation.x}
        y={sunToCloudRadiation.y}
        color={EARTH_RADIATION_COLOR}
        width={AIR_TO_SPACE_INFRARED.width}
        height={200}
        text={AIR_TO_SPACE_INFRARED.value}
        angle={200}
        show={gasesRadiation}
      />
      <Flux
        x={gasesToEarthRadiation.x}
        y={iceToSkyRadiation.y}
        color={EARTH_RADIATION_COLOR}
        height={200}
        width={AIR_TO_EARTH_INFRARED.width}
        text={AIR_TO_EARTH_INFRARED.value}
        angle={-10}
        show={gasesRadiation}
      />
    </>
  );
};

EarthFluxes.propTypes = {
  sunToCloudRadiation: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  earthRadiation: PropTypes.bool.isRequired,
};

export default EarthFluxes;
