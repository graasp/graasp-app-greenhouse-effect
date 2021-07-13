import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Layer, Rect } from 'react-konva';
import { BACKGROUND_COLOR } from '../../../config/constants';
import Molecules from './sky/greenhouse-gases/Molecules';
import { toggleZoom } from '../../../actions';

const MoleculesView = ({ stageHeight, stageWidth }) => {
  const dispatch = useDispatch();
  return (
    <Layer>
      <Rect
        x={0}
        y={0}
        height={stageHeight}
        width={stageWidth}
        fill={BACKGROUND_COLOR}
        onClick={() => {
          dispatch(toggleZoom(false));
        }}
      />
      <Molecules stageHeight={stageHeight} stageWidth={stageWidth} />
    </Layer>
  );
};

MoleculesView.propTypes = {
  stageHeight: PropTypes.number.isRequired,
  stageWidth: PropTypes.number.isRequired,
};

export default MoleculesView;
