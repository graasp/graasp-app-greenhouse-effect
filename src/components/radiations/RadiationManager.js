/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  ATMOSPHERE,
  SUN_CENTER_X,
  CLOUD_CENTRAL_CIRCLE_X,
  RADIATION_MODES,
  CLOUD_CENTRAL_CIRCLE_Y,
  SKY,
  CLOUD_CENTRAL_CIRCLE_RADIUS,
  SEA,
  ICE_CAP_HEIGHT,
  ICE_CAP_ROWS_BEGIN,
  X_DISTANCE_BETWEEN_ICE_CAPS,
} from '../../config/constants';
import EarthWaves from './EarthWaves';
import SunWaves from './SunWaves';
import SunFluxes from './SunFluxes';
import EarthFluxes from './EarthFluxes';

class Radiations extends Component {
  state = {
    sunRadiation: true,
    earthRadiation: false,
  };

  componentDidUpdate({
    isPaused: prevIsPaused,
    radiationMode: prevRadiationMode,
  }) {
    const { isPaused, radiationMode } = this.props;

    if (radiationMode !== prevRadiationMode) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ earthRadiation: false });
    }
  }

  startEarthRadiations = () => {
    this.setState({ earthRadiation: true });
  };

  render() {
    const {
      stageDimensions: { width, height },
      radiationMode,
    } = this.props;
    const { sunRadiation, earthRadiation } = this.state;

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
          <SunWaves
            sunToCloudRadiation={sunToCloudRadiation}
            cloudToGroundRadiation={cloudToGroundRadiation}
            cloudToSkyRadiation={cloudToSkyRadiation}
            iceToSkyRadiation={iceToSkyRadiation}
            sunRadiation={sunRadiation}
            startEarthRadiations={this.startEarthRadiations}
          />
          <EarthWaves
            sunToCloudRadiation={sunToCloudRadiation}
            earthRadiation={earthRadiation}
          />
        </>
      );
    }

    return (
      <>
        <SunFluxes
          sunToCloudRadiation={sunToCloudRadiation}
          cloudToGroundRadiation={cloudToGroundRadiation}
          cloudToSkyRadiation={cloudToSkyRadiation}
          iceToSkyRadiation={iceToSkyRadiation}
          sunRadiation={sunRadiation}
          startEarthRadiations={this.startEarthRadiations}
        />
        <EarthFluxes
          sunToCloudRadiation={sunToCloudRadiation}
          earthRadiation={earthRadiation}
        />
      </>
    );
  }
}

const mapStateToProps = ({ lab, layout }) => ({
  radiationMode: lab.radiationMode,
  isPaused: lab.isPaused,
  stageDimensions: layout.lab.stageDimensions,
});

export default connect(mapStateToProps)(Radiations);
