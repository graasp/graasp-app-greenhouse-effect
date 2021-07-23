import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  SUN_LIGHT_COLOR,
  ULTRAVIOLET_AMPLITUDE,
  RADIATION_STATES,
  ULTRAVIOLET_WAVELENGTH,
} from '../../config/constants';
import EmittedLine from './EmittedLine';

const SunWaves = ({
  sunToCloudRadiation,
  cloudToGroundRadiation,
  cloudToSkyRadiation,
  iceToSkyRadiation,
  sunRadiation,
  startEarthRadiations,
}) => {
  const [cloudRadiation, setCloudRadiation] = useState(false);
  const [iceRadiation, setIceRadiation] = useState();

  const onEnd = (state) => {
    switch (state) {
      // update local animations
      case RADIATION_STATES.CLOUD_RADIATION:
        setCloudRadiation(true);
        break;
      case RADIATION_STATES.ICE_RADIATION:
        setIceRadiation(true);
        break;
      default:
    }
  };

  return (
    <>
      <EmittedLine
        color={SUN_LIGHT_COLOR}
        show={sunRadiation}
        origin={sunToCloudRadiation}
        maxPointsForLine={50}
        amplitude={100}
        onEnd={() => onEnd(RADIATION_STATES.CLOUD_RADIATION)}
        wavelength={ULTRAVIOLET_WAVELENGTH}
      />
      <EmittedLine
        color={SUN_LIGHT_COLOR}
        show={cloudRadiation}
        maxPointsForLine={110}
        origin={{ y: cloudToGroundRadiation.y, x: sunToCloudRadiation.x }}
        amplitude={70}
        onEnd={() => {
          onEnd(RADIATION_STATES.ICE_RADIATION);
          onEnd(RADIATION_STATES.EARTH_RADIATION);
        }}
        wavelength={ULTRAVIOLET_WAVELENGTH}
      />
      <EmittedLine
        color={SUN_LIGHT_COLOR}
        show={cloudRadiation}
        maxPointsForLine={80}
        angle={cloudToSkyRadiation.angle}
        origin={cloudToSkyRadiation}
        amplitude={ULTRAVIOLET_AMPLITUDE}
        wavelength={ULTRAVIOLET_WAVELENGTH}
        onEnd={startEarthRadiations}
      />
      <EmittedLine
        color={SUN_LIGHT_COLOR}
        show={iceRadiation}
        maxPointsForLine={220}
        angle={iceToSkyRadiation.angle}
        origin={iceToSkyRadiation}
        amplitude={ULTRAVIOLET_AMPLITUDE}
        wavelength={ULTRAVIOLET_WAVELENGTH}
      />
    </>
  );
};

SunWaves.propTypes = {
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
    angle: PropTypes.number.isRequired,
  }).isRequired,
  iceToSkyRadiation: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    angle: PropTypes.number.isRequired,
  }).isRequired,
  sunRadiation: PropTypes.bool.isRequired,
  startEarthRadiations: PropTypes.func.isRequired,
};

export default SunWaves;
