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
  EARTH_FLUXES_DELTA_WIDTH,
  CARBON_DIOXIDE_CONCENTRATION_MIN_VALUE,
  CARBON_DIOXIDE_CONCENTRATION_MAX_VALUE_DEFAULT,
  METHANE_CONCENTRATION_MAX_VALUE,
  METHANE_CONCENTRATION_MIN_VALUE,
  SLOW_ANIMATION_SPEED_DELTA,
  CLOUD_COVER_MAX_VALUE,
  ICE_COVER_MAX_VALUE,
} from '../../config/constants';
import Flux from './Flux';
import {
  computeAlbedo,
  computeCurrentTemperature,
  computeGreenhouseEffect,
} from '../../utils/greenhouseEffect';

const EarthFluxes = ({ sunToCloudRadiation, earthRadiation }) => {
  const [gasesRadiation, setGasesRadiation] = useState(false);
  const { iceCover, cloudCover } = useSelector(({ lab }) => lab.albedo);
  const { isPaused, simulationMode } = useSelector(({ lab }) => lab);
  const { methane, carbonDioxide } = useSelector(
    ({ lab }) => lab.greenhouseGasesValues,
  );

  // save progress in parent component
  // for easier reset
  const [
    earthToGasesRadiationProgress,
    setEarthToGasesRadiationProgress,
  ] = useState(0);
  const [
    gasesToSkyRadiationProgress,
    setGasesToSkyRadiationProgress,
  ] = useState(0);
  const [
    gasesToEarthRadiationProgress,
    setGasesToEarthRadiationProgress,
  ] = useState(0);

  // save values in state to create 2-step settings
  // changing settings while in pause does not alter these values
  const [values, setValues] = useState({
    methane,
    carbonDioxide,
    iceCover,
    cloudCover,
  });
  const [settingsDifferences, setSettingsDifferences] = useState({
    iceCover: 0,
    cloudCover: 0,
    methane: 0,
    carbonDioxide: 0,
  });

  const slowUpdateValues = (value, key, speed) => {
    const difference = value - values[key];
    if (Math.abs(difference) > speed) {
      setValues({
        ...values,
        [key]: values[key] + Math.sign(difference) * speed,
      });
    } else if (value !== values[key]) {
      setValues({
        ...values,
        [key]: value,
      });
    }
  };

  useEffect(() => {
    if (!isPaused) {
      // when difference is big, it should update faster
      // if small, it should update slower
      const speed = Math.max(...Object.values(settingsDifferences));
      // slowly increase fluxes values
      slowUpdateValues(
        methane,
        'methane',
        speed * SLOW_ANIMATION_SPEED_DELTA * METHANE_CONCENTRATION_MAX_VALUE,
      );
      slowUpdateValues(
        carbonDioxide,
        'carbonDioxide',
        // add factor to speed up speed for carbon dioxide
        speed *
          SLOW_ANIMATION_SPEED_DELTA *
          CARBON_DIOXIDE_CONCENTRATION_MAX_VALUE_DEFAULT,
      );
      slowUpdateValues(
        cloudCover,
        'cloudCover',
        speed * SLOW_ANIMATION_SPEED_DELTA * CLOUD_COVER_MAX_VALUE,
      );
      slowUpdateValues(
        iceCover,
        'iceCover',
        speed * SLOW_ANIMATION_SPEED_DELTA * ICE_COVER_MAX_VALUE,
      );
    } else {
      // on pause, compute difference between values
      setSettingsDifferences({
        methane: Math.abs(
          (methane - values.methane) /
            (METHANE_CONCENTRATION_MAX_VALUE - METHANE_CONCENTRATION_MIN_VALUE),
        ),
        carbonDioxide: Math.abs(
          (carbonDioxide - values.carbonDioxide) /
            (CARBON_DIOXIDE_CONCENTRATION_MAX_VALUE_DEFAULT -
              CARBON_DIOXIDE_CONCENTRATION_MIN_VALUE),
        ),
        iceCover: Math.abs((iceCover - values.iceCover) / ICE_COVER_MAX_VALUE),
        cloudCover: Math.abs(
          (cloudCover - values.cloudCover) / CLOUD_COVER_MAX_VALUE,
        ),
      });
    }
  }, [methane, carbonDioxide, cloudCover, iceCover, isPaused, values]);

  const { width, height } = useSelector(
    ({ layout }) => layout.lab.stageDimensions,
  );
  const { albedo } = computeAlbedo({
    iceCover: values.iceCover,
    cloudCover: values.cloudCover,
  });
  const greenhouseEffect = computeGreenhouseEffect({
    ...values,
    simulationMode,
  });
  const temperature = computeCurrentTemperature({
    greenhouseEffect,
    albedo,
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

  const iceToSkyRadiation = {
    x: width * (ICE_CAP_ROWS_BEGIN[0].x - X_DISTANCE_BETWEEN_ICE_CAPS * 3),
    y: height * (1 - SEA.height * (1 + ICE_CAP_HEIGHT)),
  };

  const earthToGasesRadiation = {
    x: width * 0.75,
    y: height * 0.6,
    height: 140,
    angle: 180,
  };

  const gasesToEarthRadiation = {
    x: width * 0.9,
  };

  const gasesToSkyRadiation = {
    x: width * 0.85,
  };

  const earthEmittedRadiationValue = Math.round(
    STEFAN_BOLTZMANN_CONSTANT * temperature ** 4,
  );
  const EARTH_EMITTED_INFRARED_VALUES = {
    value: earthEmittedRadiationValue,
    width: earthEmittedRadiationValue * EARTH_FLUXES_DELTA_WIDTH, // use for flux
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

  const hasGreenhouseValuesChanged =
    values.methane !== methane || values.carbonDioxide !== carbonDioxide;

  return (
    <>
      <Flux
        x={earthToGasesRadiation.x}
        y={earthToGasesRadiation.y}
        color={EARTH_RADIATION_COLOR}
        width={EARTH_EMITTED_INFRARED_VALUES.width}
        height={earthToGasesRadiation.height}
        text={EARTH_EMITTED_INFRARED_VALUES.value}
        angle={earthToGasesRadiation.angle}
        show={earthRadiation}
        onEnd={() => {
          onEnd(RADIATION_STATES.GASES_RADIATION);
        }}
        progress={earthToGasesRadiationProgress}
        setProgress={setEarthToGasesRadiationProgress}
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
        progress={gasesToSkyRadiationProgress}
        setProgress={setGasesToSkyRadiationProgress}
        enableBlinking={hasGreenhouseValuesChanged}
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
        progress={gasesToEarthRadiationProgress}
        setProgress={setGasesToEarthRadiationProgress}
        enableBlinking={hasGreenhouseValuesChanged}
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
