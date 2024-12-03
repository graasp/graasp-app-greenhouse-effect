import React from 'react';
import PropTypes from 'prop-types';
import Albedo from './greenhouse-effect-settings/Albedo';
import GreenhouseEffect from './greenhouse-effect-settings/GreenhouseEffect';

const GreenhouseEffectSettings = ({ slidersUnchanged }) => {
  return (
    <>
      <Albedo slidersUnchanged={slidersUnchanged} />
      <GreenhouseEffect slidersUnchanged={slidersUnchanged} />
    </>
  );
};

GreenhouseEffectSettings.propTypes = {
  slidersUnchanged: PropTypes.bool.isRequired,
};

export default GreenhouseEffectSettings;
