import React, { useContext } from 'react';
import { Group } from 'react-konva';
import { FULL_MOUNTAIN, HALF_MOUNTAIN } from '../../../../../constants';
import MountainWithIceCover from './MountainWithIceCover';
import { GroundDimensionsContext } from '../../../../contexts/canvas-dimensions/GroundDimensionsProvider';

const MountainRange = () => {
  const {
    fullMountainWidth,
    fullMountainHeight,
    halfMountainWidth,
    halfMountainHeight,
    fullMountainBeginsX,
    halfMountainBeginsX,
    mountainsBeginY,
  } = useContext(GroundDimensionsContext);

  return (
    <Group>
      <MountainWithIceCover
        mountainType={FULL_MOUNTAIN}
        mountainWidth={fullMountainWidth}
        mountainHeight={fullMountainHeight}
        mountainBeginsX={fullMountainBeginsX}
        mountainBeginsY={mountainsBeginY}
      />
      <MountainWithIceCover
        mountainType={HALF_MOUNTAIN}
        mountainWidth={halfMountainWidth}
        mountainHeight={halfMountainHeight}
        mountainBeginsX={halfMountainBeginsX}
        mountainBeginsY={mountainsBeginY}
      />
    </Group>
  );
};

export default MountainRange;
