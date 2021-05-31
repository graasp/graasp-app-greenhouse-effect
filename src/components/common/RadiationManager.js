import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ATMOSPHERE,
  SUN_CENTER_X,
  CLOUD_CENTRAL_CIRCLE_X,
  SUN_LIGHT_COLOR,
  EARTH_RADIATION_COLOR,
  ULTRAVIOLET_AMPLITUDE,
  RADIATION_STATES,
  ULTRAVIOLET_WAVELENGTH,
  INFRARED_WAVELENGTH,
  RADIATION_MODES,
  CLOUD_CENTRAL_CIRCLE_Y,
  SKY,
  CLOUD_CENTRAL_CIRCLE_RADIUS,
  SEA,
  ICE_CAP_HEIGHT,
  ICE_CAP_ROWS_BEGIN,
  X_DISTANCE_BETWEEN_ICE_CAPS,
} from '../../config/constants';
import EmittedLine from './EmittedLine';
import { setNextState } from '../../actions/lab';
import Flux from './Flux';

const Radiations = () => {
  const sunRadiation = useSelector(({ lab }) => lab.radiations.sun);
  const cloudRadiation = useSelector(({ lab }) => lab.radiations.cloud);
  const earthRadiation = useSelector(({ lab }) => lab.radiations.earth);
  const gasesRadiation = useSelector(({ lab }) => lab.radiations.gases);
  const iceRadiation = useSelector(({ lab }) => lab.radiations.ice);
  const radiationMode = useSelector(({ lab }) => lab.radiationMode);
  const { width, height } = useSelector(
    ({ layout }) => layout.lab.stageDimensions,
  );
  const dispatch = useDispatch();

  const onEnd = (state) => {
    dispatch(setNextState(state));
  };

  const sunToCloudRadiation = {
    x: SUN_CENTER_X * width * ATMOSPHERE.width,
    y: ATMOSPHERE.height * height - 20,
  };

  const cloudToGroundRadiation = {
    x: CLOUD_CENTRAL_CIRCLE_X * width * ATMOSPHERE.width,
    y:
      (ATMOSPHERE.height +
        (CLOUD_CENTRAL_CIRCLE_Y + CLOUD_CENTRAL_CIRCLE_RADIUS) * SKY.height) *
      height,
  };

  const cloudToSkyRadiation = {
    x: width * CLOUD_CENTRAL_CIRCLE_X - 100,
    y:
      (ATMOSPHERE.height +
        (CLOUD_CENTRAL_CIRCLE_Y - CLOUD_CENTRAL_CIRCLE_RADIUS) * SKY.height) *
      height,
  };

  const iceToSkyRadiation = {
    x: width * (ICE_CAP_ROWS_BEGIN[0].x - X_DISTANCE_BETWEEN_ICE_CAPS * 3),
    y: height * (1 - SEA.height * (1 + ICE_CAP_HEIGHT)),
  };

  if (radiationMode === RADIATION_MODES.WAVES) {
    return (
      <>
        <EmittedLine
          color={SUN_LIGHT_COLOR}
          show={sunRadiation}
          angle={0}
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
          angle={0}
          origin={cloudToGroundRadiation}
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
          angle={150}
          origin={cloudToSkyRadiation}
          amplitude={ULTRAVIOLET_AMPLITUDE}
          wavelength={ULTRAVIOLET_WAVELENGTH}
        />
        <EmittedLine
          color={SUN_LIGHT_COLOR}
          show={iceRadiation}
          maxPointsForLine={220}
          angle={170}
          origin={iceToSkyRadiation}
          amplitude={ULTRAVIOLET_AMPLITUDE}
          wavelength={ULTRAVIOLET_WAVELENGTH}
        />
        <EmittedLine
          color={EARTH_RADIATION_COLOR}
          show={earthRadiation}
          maxPointsForLine={80}
          angle={180}
          origin={{
            x: width * 0.6,
            y: height * 0.8,
          }}
          amplitude={100}
          wavelength={INFRARED_WAVELENGTH}
          onEnd={() => onEnd(RADIATION_STATES.GASES_RADIATION)}
        />
        <EmittedLine
          color={EARTH_RADIATION_COLOR}
          show={gasesRadiation}
          maxPointsForLine={100}
          angle={-20}
          origin={{
            x: width * 0.8,
            y: height * 0.55,
          }}
          amplitude={30}
          wavelength={INFRARED_WAVELENGTH}
        />
        <EmittedLine
          color={EARTH_RADIATION_COLOR}
          show={gasesRadiation}
          maxPointsForLine={120}
          angle={180}
          origin={{
            x: width * 0.8,
            y: height * 0.45,
          }}
          amplitude={60}
          wavelength={INFRARED_WAVELENGTH}
        />
      </>
    );
  }

  return (
    <>
      <Flux
        x={sunToCloudRadiation.x}
        y={sunToCloudRadiation.y}
        color={SUN_LIGHT_COLOR}
        width={80}
        height={80}
        scaleX={0.8}
        scaleY={0.4}
        text="340"
        angle={Math.PI / 2}
      />
      <Flux
        x={cloudToGroundRadiation.x}
        y={cloudToGroundRadiation.y + 20}
        color={SUN_LIGHT_COLOR}
        width={50}
        height={200}
        text="290"
        angle={Math.PI / 2}
      />
      <Flux
        x={iceToSkyRadiation.x}
        y={iceToSkyRadiation.y}
        color={SUN_LIGHT_COLOR}
        width={20}
        height={700}
        text="50"
        angle={(Math.PI * 5) / 4}
      />
      <Flux
        x={cloudToSkyRadiation.x}
        y={cloudToSkyRadiation.y}
        color={SUN_LIGHT_COLOR}
        width={20}
        height={230}
        text="50"
        angle={(Math.PI * 5) / 4}
      />
      <Flux
        x={width * 0.75}
        y={height * 0.8}
        color={EARTH_RADIATION_COLOR}
        width={80}
        height={140}
        text="390"
        angle={(3 * Math.PI) / 2}
      />
      <Flux
        x={width * 0.75}
        y={height * 0.45}
        color={EARTH_RADIATION_COLOR}
        width={60}
        height={200}
        text="240"
        angle={(3 * Math.PI) / 2}
      />
      <Flux
        x={width * 0.85}
        y={height * 0.55}
        color={EARTH_RADIATION_COLOR}
        width={30}
        height={500}
        text="150"
        angle={Math.PI / 2 - 1}
      />
    </>
  );
};

export default Radiations;
