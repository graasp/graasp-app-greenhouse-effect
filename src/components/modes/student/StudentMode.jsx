import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import StudentView from './StudentView';
import { DEFAULT_VIEW, FEEDBACK_VIEW } from '../../../config/views';
import { getActions, getAppInstanceResources } from '../../../actions';
import Loader from '../../common/Loader';

const StudentMode = ({ view, activity }) => {
  if (activity) {
    return <Loader />;
  }
  switch (view) {
    case FEEDBACK_VIEW:
    case DEFAULT_VIEW:
    default:
      return <StudentView />;
  }
};

const mapStateToProps = ({ context, appInstanceResources }) => {
  const { userId, appInstanceId } = context;
  return {
    userId,
    appInstanceId,
    activity: Boolean(appInstanceResources.activity.length),
  };
};

const mapDispatchToProps = {
  dispatchGetAppInstanceResources: getAppInstanceResources,
  dispatchGetActions: getActions,
};

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(StudentMode);

StudentMode.propTypes = {
  view: PropTypes.string,
  activity: PropTypes.bool,
};

StudentMode.defaultProps = {
  view: DEFAULT_VIEW,
  activity: false,
};

export default ConnectedComponent;
