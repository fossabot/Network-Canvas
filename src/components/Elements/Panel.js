import React from 'react';
import PropTypes from 'prop-types';

/**
  * Renders a side panel, with a title and `props.children`.
  */
const Panel = (props) => {
  const {
    title,
    children,
    show,
  } = props;

  return (
    show &&
    <div className="panel">
      <div className="panel__heading"><h3>{title}</h3></div>
      <div className="panel__content">
        {children}
      </div>
    </div>
  );
};

Panel.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any,
  show: PropTypes.bool,
};

Panel.defaultProps = {
  title: '',
  children: null,
  show: true,
};

export default Panel;
