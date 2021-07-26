import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
  SUN_LIGHT_COLOR,
  RADIATION_STATES,
  FLUX_HEAD_HEIGHT,
  SOLAR_FLUX,
  SUN_FLUXES_DELTA_WIDTH,
} from '../../config/constants';
import Flux from './Flux';
import { computeAlbedo } from '../../utils/greenhouseEffect';

const SunFluxes = ({
  sunToCloudRadiation,
  cloudToGroundRadiation,
  cloudToSkyRadiation,
  iceToSkyRadiation,
  startEarthRadiations,
  sunRadiation,
}) => {
  const [iceRadiation, setIceRadiation] = useState(false);
  const [cloudRadiation, setCloudRadiation] = useState(false);
  const { iceCover, cloudCover } = useSelector(({ lab }) => lab.albedo);

  const { ice: iceAlbedo, cloud: cloudAlbedo } = computeAlbedo({
    iceCover,
    cloudCover,
  });

  const [
    sunToCloudRadiationProgress,
    setSunToCloudRadiationProgress,
  ] = useState(0);
  const [
    cloudToGroundRadiationProgress,
    setCloudToGroundRadiationProgress,
  ] = useState(0);
  const [
    cloudToSkyRadiationProgress,
    setCloudToSkyRadiationProgress,
  ] = useState(0);
  const [iceToSkyRadiationProgress, setIceToSkyRadiationProgress] = useState(0);

  const onEnd = (state) => {
    switch (state) {
      case RADIATION_STATES.CLOUD_RADIATION:
        setCloudRadiation(true);
        break;
      case RADIATION_STATES.ICE_RADIATION:
        setIceRadiation(true);
        break;
      default:
    }
  };

  const cloudToSkyRadiationValue = cloudAlbedo * SOLAR_FLUX.value;
  const cloudToGroundRadiationValue = (
    SOLAR_FLUX.value - cloudToSkyRadiationValue
  ).toFixed(0);
  const iceToSkyRadiationValue = (
    cloudToGroundRadiationValue * iceAlbedo
  ).toFixed(0);

  return (
    <>
      <Flux
        x={sunToCloudRadiation.x}
        y={cloudToSkyRadiation.y - FLUX_HEAD_HEIGHT}
        color={SUN_LIGHT_COLOR}
        width={SOLAR_FLUX.width}
        height={SOLAR_FLUX.height}
        text={`${SOLAR_FLUX.value}`}
        onEnd={() => onEnd(RADIATION_STATES.CLOUD_RADIATION)}
        show={sunRadiation}
        progress={sunToCloudRadiationProgress}
        setProgress={setSunToCloudRadiationProgress}
      />
      <Flux
        x={sunToCloudRadiation.x}
        y={cloudToGroundRadiation.y + cloudToGroundRadiation.height}
        color={SUN_LIGHT_COLOR}
        width={cloudToGroundRadiationValue * SUN_FLUXES_DELTA_WIDTH}
        height={cloudToGroundRadiation.height}
        text={cloudToGroundRadiationValue}
        show={cloudRadiation}
        onEnd={() => {
          onEnd(RADIATION_STATES.ICE_RADIATION);
        }}
        progress={cloudToGroundRadiationProgress}
        setProgress={setCloudToGroundRadiationProgress}
        enableBlinking
      />
      <Flux
        x={cloudToSkyRadiation.x}
        y={sunToCloudRadiation.y}
        color={SUN_LIGHT_COLOR}
        width={cloudToSkyRadiationValue * SUN_FLUXES_DELTA_WIDTH}
        height={120}
        text={cloudToSkyRadiationValue.toFixed(0)}
        show={cloudRadiation}
        angle={cloudToSkyRadiation.angle}
        onEnd={startEarthRadiations}
        progress={cloudToSkyRadiationProgress}
        setProgress={setCloudToSkyRadiationProgress}
        enableBlinking
      />
      <Flux
        x={iceToSkyRadiation.x}
        y={sunToCloudRadiation.y}
        color={SUN_LIGHT_COLOR}
        width={iceToSkyRadiationValue * SUN_FLUXES_DELTA_WIDTH}
        height={470}
        text={iceToSkyRadiationValue}
        angle={iceToSkyRadiation.angle}
        show={iceRadiation}
        progress={iceToSkyRadiationProgress}
        setProgress={setIceToSkyRadiationProgress}
        enableBlinking
      />
    </>
  );
};

SunFluxes.propTypes = {
  sunToCloudRadiation: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  cloudToGroundRadiation: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,
  cloudToSkyRadiation: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    angle: PropTypes.number.isRequired,
  }).isRequired,
  iceToSkyRadiation: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    angle: PropTypes.number.isRequired,
  }).isRequired,
  startEarthRadiations: PropTypes.func.isRequired,
  sunRadiation: PropTypes.bool.isRequired,
};

export default SunFluxes;
