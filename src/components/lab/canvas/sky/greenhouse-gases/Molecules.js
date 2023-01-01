import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import CarbonDioxide from './molecules/CarbonDioxide';
import Water from './molecules/Water';
import Methane from './molecules/Methane';
import {
  chunkMolecules,
  determineMoleculeRowsCenterYs,
  distributeMolecules,
} from '../../../../../utils/canvas';
import {
  carbonDioxideString,
  CARBON_DIOXIDE_CONCENTRATION_MAX_VALUE_DEFAULT,
  methaneString,
  METHANE_CONCENTRATION_MAX_VALUE,
  waterString,
  WATER_CONCENTRATION_MAX_VALUE,
} from '../../../../../config/constants';

const Molecules = ({
  stageHeight,
  stageWidth,
  cursorBecomesDefault,
  cursorBecomesZoomOut,
  maxDistribution,
}) => {
  const { sliderCarbonDioxide, sliderMethane, waterVapor } = useSelector(
    ({ lab }) => lab,
  );

  const moleculeDistribution = distributeMolecules(maxDistribution, [
    {
      name: carbonDioxideString,
      count: Math.min(
        sliderCarbonDioxide,
        CARBON_DIOXIDE_CONCENTRATION_MAX_VALUE_DEFAULT,
      ),
    },
    {
      name: methaneString,
      count: Math.min(sliderMethane, METHANE_CONCENTRATION_MAX_VALUE),
    },
    {
      name: waterString,
      count: Math.min(waterVapor, WATER_CONCENTRATION_MAX_VALUE),
    },
  ]);
  const chunkedDistribution = chunkMolecules(moleculeDistribution);
  const yPoints = determineMoleculeRowsCenterYs();

  // map each molecule id to the corresponding React component
  const moleculeMap = {};
  moleculeMap[carbonDioxideString] = CarbonDioxide;
  moleculeMap[waterString] = Water;
  moleculeMap[methaneString] = Methane;

  const molecules = chunkedDistribution.map((moleculeRow, rowIndex) =>
    moleculeRow.map(({ name, switchedOn, centerX, rotation }, index) => {
      const MoleculeToDisplay = moleculeMap[name];
      return (
        switchedOn && (
          <MoleculeToDisplay
            moleculeCenter={{
              x: centerX * stageWidth,
              y: yPoints[rowIndex] * stageHeight,
            }}
            stageHeight={stageHeight}
            cursorBecomesDefault={cursorBecomesDefault}
            cursorBecomesZoomOut={cursorBecomesZoomOut}
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            rotation={rotation}
          />
        )
      );
    }),
  );

  return molecules;
};

Molecules.propTypes = {
  stageHeight: PropTypes.number.isRequired,
  stageWidth: PropTypes.number.isRequired,
  cursorBecomesDefault: PropTypes.func.isRequired,
  cursorBecomesZoomOut: PropTypes.func.isRequired,
  maxDistribution: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Molecules;
