/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import { animation } from 'network-canvas-ui';
import PropTypes from 'prop-types';
import modal from '../../behaviours/modal';

/**
  * Renders a modal window.
  */
function Modal(props) {
  const {
    children,
    close,
    show,
    title,
  } = props;

  return (
    <CSSTransition
      classNames="modal--transition"
      timeout={animation.duration.standard}
      in={show}
      mountOnEnter
      unmountOnExit
    >
      <div key="modal" className="modal" onClick={() => close()}>
        <div className="modal__window" onClick={e => e.stopPropagation()}>
          <div className="modal__layout">
            <div className="modal__layout-title">
              <h1>{title}</h1>
            </div>
            <div className="modal__layout-content">
              {children}
            </div>
          </div>
          <button className="modal__close" onClick={() => close()}>
            Cancel
          </button>
        </div>
      </div>
    </CSSTransition>
  );
}

Modal.propTypes = {
  close: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  show: PropTypes.bool,
  children: PropTypes.any,
};

Modal.defaultProps = {
  show: false,
  children: null,
};

export default modal(Modal);
