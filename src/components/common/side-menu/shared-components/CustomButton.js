import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

const CustomButton = ({
  title,
  tooltipPlacement,
  icon,
  onClick,
  disabled,
  color,
}) => {
  return (
    <Tooltip title={title} placement={tooltipPlacement}>
      <span>
        <IconButton disabled={disabled} onClick={onClick} style={{ color }}>
          {icon}
        </IconButton>
      </span>
    </Tooltip>
  );
};

CustomButton.propTypes = {
  title: PropTypes.string.isRequired,
  tooltipPlacement: PropTypes.string,
  icon: PropTypes.element.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  color: PropTypes.string.isRequired,
};

CustomButton.defaultProps = {
  tooltipPlacement: 'left',
  disabled: false,
};

export default CustomButton;
