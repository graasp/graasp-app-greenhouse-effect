import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride';
import {
  BACK_BUTTON_MARGIN_RIGHT,
  BUTTON_COLOR,
  BUTTON_FONT_SIZE,
  TEXT_ALIGN,
  TEXT_FONT_SIZE,
  TOUR_TAKEN,
  Z_INDEX,
} from '../../../constants';

const styles = {
  tooltipContainer: {
    textAlign: TEXT_ALIGN,
  },
  options: {
    zIndex: Z_INDEX,
  },
  buttonBack: {
    marginRight: BACK_BUTTON_MARGIN_RIGHT,
    color: BUTTON_COLOR,
    fontSize: BUTTON_FONT_SIZE,
  },
  tooltip: {
    fontSize: TEXT_FONT_SIZE,
  },
  buttonNext: {
    backgroundColor: BUTTON_COLOR,
    fontSize: BUTTON_FONT_SIZE,
  },
};

const Tour = ({ tourState, setTourState }) => {
  const { t } = useTranslation();
  const { run, continuous, loading, stepIndex, steps } = tourState;

  useEffect(() => {
    if (!localStorage.getItem(TOUR_TAKEN)) {
      setTourState((prevState) => ({ ...prevState, run: true }));
    }
  }, []);

  const handleTourNavigation = (joyrideData) => {
    const { action, index, type, status } = joyrideData;
    if (
      action === ACTIONS.CLOSE ||
      (status === STATUS.SKIPPED && tourState.run) ||
      status === STATUS.FINISHED
    ) {
      setTourState((prevState) => ({ ...prevState, run: false }));
      localStorage.setItem(TOUR_TAKEN, true);
    } else if (type === EVENTS.STEP_AFTER || type === EVENTS.TARGET_NOT_FOUND) {
      setTourState((prevState) => ({
        ...prevState,
        stepIndex: index + (action === ACTIONS.PREV ? -1 : 1),
      }));
    }
  };

  return (
    <Joyride
      run={run}
      continuous={continuous}
      loading={loading}
      stepIndex={stepIndex}
      steps={steps}
      callback={handleTourNavigation}
      showSkipButton
      styles={styles}
      locale={{
        next: t('Next'),
        back: t('Back'),
        skip: t('Skip'),
        last: t('End tour'),
      }}
    />
  );
};

Tour.propTypes = {
  tourState: PropTypes.objectOf().isRequired,
  setTourState: PropTypes.func.isRequired,
};

export default Tour;
