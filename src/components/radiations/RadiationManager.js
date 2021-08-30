/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
  SOLAR_FLUX,
} from '../../config/constants';
import EarthWaves from './EarthWaves';
import SunWaves from './SunWaves';
import SunFluxes from './SunFluxes';
import EarthFluxes from './EarthFluxes';
import { computeCloudEllipseRadiuses } from '../../utils/canvas';

class RadiationManager extends Component {
  static propTypes = {
    radiationMode: PropTypes.oneOf(Object.values(RADIATION_MODES)).isRequired,
    stageDimensions: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    }).isRequired,
    cloudCover: PropTypes.number.isRequired,
  };

  state = {
    sunRadiation: true,
    earthRadiation: false,
  };

  componentDidUpdate({ radiationMode: prevRadiationMode }) {
    const { radiationMode } = this.props;

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
      cloudCover,
    } = this.props;
    const { sunRadiation, earthRadiation } = this.state;

    const skyHeight = height * SKY.height;
    const { cloudEllipseRadiusX: cloudHeight } = computeCloudEllipseRadiuses({
      skyHeight,
      skyWidth: width * SKY.width,
      cloudCover,
    });

    const sunToCloudRadiation = {
      x: SUN_CENTER_X * width * ATMOSPHERE.width,
      y: ATMOSPHERE.height * height - 20,
    };

    const cloudToGroundRadiation = {
      x: CLOUD_CENTRAL_CIRCLE_X * width * ATMOSPHERE.width,
      y:
        ATMOSPHERE.height * height +
        SOLAR_FLUX.height +
        Math.min(cloudHeight, skyHeight / 2.5),
      height: 250 - cloudCover,
    };

    const cloudToSkyRadiation = {
      x: width * CLOUD_CENTRAL_CIRCLE_X - 100,
      y:
        (ATMOSPHERE.height +
          (CLOUD_CENTRAL_CIRCLE_Y - CLOUD_CENTRAL_CIRCLE_RADIUS) * SKY.height) *
        height,
      angle: 155,
    };

    const iceToSkyRadiation = {
      x:
        width * (ICE_CAP_ROWS_BEGIN[0].x - X_DISTANCE_BETWEEN_ICE_CAPS * 3) -
        40,
      y: height * (1 - SEA.height * (1 + ICE_CAP_HEIGHT)),
      angle: 170,
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
  stageDimensions: layout.lab.stageDimensions,
  cloudCover: lab.albedo.cloudCover,
});

export default connect(mapStateToProps)(RadiationManager);
