import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
  SUN_LIGHT_COLOR,
  RADIATION_STATES,
  SKY,
  FLUX_HEAD_HEIGHT,
  SOLAR_FLUX,
  SUN_FLUXES_DELTA_WIDTH,
} from '../../config/constants';
import Flux from './Flux';
import { computeCloudEllipseRadiuses } from '../../utils/canvas';
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

  const { width, height } = useSelector(
    ({ layout }) => layout.lab.stageDimensions,
  );

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

  const { cloudEllipseRadiusX: cloudHeight } = computeCloudEllipseRadiuses({
    skyHeight: height * SKY.height,
    skyWidth: width * SKY.width,
  });

  const cloudToSkyRadiationValue = cloudAlbedo * SOLAR_FLUX;
  const cloudToGroundRadiationValue = (
    SOLAR_FLUX - cloudToSkyRadiationValue
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
        width={110}
        height={80}
        scaleX={0.8}
        scaleY={0.4}
        text={`${SOLAR_FLUX}`}
        onEnd={() => onEnd(RADIATION_STATES.CLOUD_RADIATION)}
        show={sunRadiation}
        progress={sunToCloudRadiationProgress}
        setProgress={setSunToCloudRadiationProgress}
      />
      <Flux
        x={sunToCloudRadiation.x}
        y={cloudToGroundRadiation.y + cloudHeight * 2}
        color={SUN_LIGHT_COLOR}
        width={cloudToGroundRadiationValue * SUN_FLUXES_DELTA_WIDTH}
        height={200}
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
        angle={160}
        onEnd={startEarthRadiations}
        progress={cloudToSkyRadiationProgress}
        setProgress={setCloudToSkyRadiationProgress}
        enableBlinking
      />
      <Flux
        x={iceToSkyRadiation.x - 50}
        y={sunToCloudRadiation.y}
        color={SUN_LIGHT_COLOR}
        width={iceToSkyRadiationValue * SUN_FLUXES_DELTA_WIDTH}
        height={470}
        text={iceToSkyRadiationValue}
        angle={170}
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
  }).isRequired,
  cloudToSkyRadiation: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  iceToSkyRadiation: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  startEarthRadiations: PropTypes.func.isRequired,
  sunRadiation: PropTypes.bool.isRequired,
};

export default SunFluxes;
