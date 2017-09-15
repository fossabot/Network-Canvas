import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { TransitionGroup } from 'react-transition-group';

/**
  * Renders a pane container.
  */
const Panels = ({ children, minimise }) => {
  const panelsClasses = cx(
    'panels',
    { 'panels--minimise': minimise },
  );
  return (
    <TransitionGroup
      component="div"
      className={panelsClasses}
    >
      { children }
    </TransitionGroup>
  );
};

Panels.propTypes = {
  children: PropTypes.any,
  minimise: PropTypes.bool,
};

Panels.defaultProps = {
  children: null,
  minimise: false,
};

export default Panels;
