import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
  SUN_LIGHT_COLOR,
  RADIATION_STATES,
  SKY,
  FLUX_HEAD_HEIGHT,
  SOLAR_FLUX,
} from '../../config/constants';
import Flux from './Flux';
import { computerCloudEllipseRadiuses } from '../../utils/canvas';

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

  const { cloudEllipseRadiusX: cloudHeight } = computerCloudEllipseRadiuses({
    skyHeight: height * SKY.height,
    skyWidth: width * SKY.width,
  });

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
      />
      <Flux
        x={sunToCloudRadiation.x}
        y={cloudToGroundRadiation.y + cloudHeight * 2}
        color={SUN_LIGHT_COLOR}
        width={70}
        height={200}
        text="290"
        show={cloudRadiation}
        onEnd={() => {
          onEnd(RADIATION_STATES.ICE_RADIATION);
        }}
      />
      <Flux
        x={cloudToSkyRadiation.x}
        y={sunToCloudRadiation.y}
        color={SUN_LIGHT_COLOR}
        width={30}
        height={120}
        text="50"
        show={cloudRadiation}
        angle={160}
        onEnd={startEarthRadiations}
      />
      <Flux
        x={iceToSkyRadiation.x - 50}
        y={sunToCloudRadiation.y}
        color={SUN_LIGHT_COLOR}
        width={30}
        height={470}
        text="50"
        angle={170}
        show={iceRadiation}
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
