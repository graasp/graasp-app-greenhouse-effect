import React from 'react';
import PropTypes from 'prop-types';
import Albedo from './greenhouse-effect-settings/Albedo';
import GreenhouseEffect from './greenhouse-effect-settings/GreenhouseEffect';

const GreenhouseEffectSettings = ({ settingsUnchanged }) => {
  return (
    <>
      <Albedo settingsUnchanged={settingsUnchanged} />
      <GreenhouseEffect settingsUnchanged={settingsUnchanged} />
    </>
  );
};

GreenhouseEffectSettings.propTypes = {
  settingsUnchanged: PropTypes.bool.isRequired,
};

export default GreenhouseEffectSettings;
