import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ATMOSPHERE,
  SUN_CENTER_X,
  CLOUD_CENTRAL_CIRCLE_X,
  SUN_LIGHT_COLOR,
  EARTH_RADIATION_COLOR,
} from '../../config/constants';
import EmittedLine from './EmittedLine';
import { setNextState } from '../../actions/radiation';

const Radiations = () => {
  const sunRadiation = useSelector(({ lab }) => lab.sunRadiation);
  const cloudRadiation = useSelector(({ lab }) => lab.cloudRadiation);
  const earthRadiation = useSelector(({ lab }) => lab.earthRadiation);
  const gasesRadiation = useSelector(({ lab }) => lab.gasesRadiation);
  const { width, height } = useSelector(
    ({ layout }) => layout.lab.stageDimensions,
  );
  const dispatch = useDispatch();

  const dispatchSetNextState = () => dispatch(setNextState());

  return (
    <>
      <EmittedLine
        color={SUN_LIGHT_COLOR}
        show={sunRadiation}
        angle={0}
        origin={{
          x: SUN_CENTER_X * width * ATMOSPHERE.width,
          y: ATMOSPHERE.height * height,
        }}
        maxPointsForLine={50}
        onEnd={dispatchSetNextState}
      />
      <EmittedLine
        color={SUN_LIGHT_COLOR}
        show={cloudRadiation}
        maxPointsForLine={100}
        angle={0}
        origin={{
          x: CLOUD_CENTRAL_CIRCLE_X * width * ATMOSPHERE.width,
          y: height * 0.45,
        }}
        onEnd={dispatchSetNextState}
      />
      <EmittedLine
        color={SUN_LIGHT_COLOR}
        show={cloudRadiation}
        maxPointsForLine={80}
        angle={150}
        origin={{
          x: width * 0.2,
          y: height * 0.35,
        }}
      />
      <EmittedLine
        color={SUN_LIGHT_COLOR}
        show={earthRadiation}
        maxPointsForLine={120}
        angle={150}
        origin={{
          x: width * 0.2,
          y: height * 0.8,
        }}
      />
      <EmittedLine
        color={EARTH_RADIATION_COLOR}
        show={earthRadiation}
        maxPointsForLine={100}
        angle={180}
        origin={{
          x: width * 0.6,
          y: height * 0.8,
        }}
      />
      <EmittedLine
        color={EARTH_RADIATION_COLOR}
        show={earthRadiation}
        maxPointsForLine={100}
        angle={180}
        origin={{
          x: width * 0.8,
          y: height * 0.8,
        }}
        onEnd={dispatchSetNextState}
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
      />
    </>
  );
};

export default Radiations;
