/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import modal from '../../behaviours/modal';

/**
  * Renders a modal window.
  */
class Modal extends Component {
  constructor(props) {
    super(props);
    this.close = () => {};
  }

  componentDidMount() {
    this.enableCloseButton();
  }

  componentDidUpdate() {
    this.enableCloseButton();
  }

  // This is a work around for a bubbling touch event (something to do with our redux form)
  enableCloseButton() {
    if (this.props.show) {
      setTimeout(() => {
        this.close = this.props.close;
      }, 50);
    } else {
      this.close = () => {};
    }
  }

  render() {
    const {
      show,
      children,
      title,
    } = this.props;

    return (
      <div>
        { show &&
          <div key="modal" className="modal" onClick={() => { this.close(); }}>
            <div className="modal__window" onClick={e => e.stopPropagation()}>
              <div className="modal__layout">
                <div className="modal__layout-title">
                  <h1>{title}</h1>
                </div>
                <div className="modal__layout-content">
                  {children}
                </div>
              </div>
              <button className="modal__close" onClick={() => { this.close(); }}>
                Cancel
              </button>
            </div>
          </div>
        }
      </div>
    );
  }
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
