import React from 'react';
import PropTypes from 'prop-types';
import { Group } from 'react-konva';
import { ATMOSPHERE, SKY, SEA } from '../../../config/constants';
import IceCaps from './sea/ice-caps/IceCaps';
import SeaBackground from './sea/SeaBackground';

const Sea = ({ stageHeight, stageWidth, cursorBecomesDefault }) => {
  // sea dimensions in /constants.js are stated as a percentage of canvas dimensions
  const {
    height: seaHeightPercentage,
    width: seaWidthPercentage,
    indent: seaIndentPercentage,
  } = SEA;

  // pixel dimensions of sea
  const seaWidth = stageWidth * seaWidthPercentage;
  const seaHeight = stageHeight * seaHeightPercentage;
  // 'seaIndent' = to make the see slanted
  const seaIndent = stageWidth * seaIndentPercentage;

  // dimensions of atmosphere and sky required to position sea
  const { height: atmosphereHeightPercentage } = ATMOSPHERE;
  const { height: skyHeightPercentage } = SKY;
  const atmosphereHeight = stageHeight * atmosphereHeightPercentage;
  const skyHeight = stageHeight * skyHeightPercentage;
  const atmosphereAndSkyHeight = atmosphereHeight + skyHeight;
  const seaBeginsX = 0;
  const seaBeginsY = atmosphereAndSkyHeight;

  return (
    <Group onMouseEnter={cursorBecomesDefault}>
      <SeaBackground
        seaHeight={seaHeight}
        seaWidth={seaWidth}
        seaIndent={seaIndent}
        seaBeginsX={seaBeginsX}
        seaBeginsY={seaBeginsY}
      />
      <IceCaps
        seaHeight={seaHeight}
        seaWidth={seaWidth}
        seaBeginsY={seaBeginsY}
      />
    </Group>
  );
};

Sea.propTypes = {
  stageHeight: PropTypes.number.isRequired,
  stageWidth: PropTypes.number.isRequired,
  cursorBecomesDefault: PropTypes.func.isRequired,
};

export default Sea;
