/* eslint-disable */
/* eslint-disable react/no-find-dom-node, react/sort-comp */

import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom'; // eslint-disable-line camelcase
import { getDragContext } from './DragContext';
import DragPreview from './DragPreview';
import dragManager from './dragManager';
import { actionCreators as dragActions } from './dragStore';

const dragSource = WrappedComponent =>
  getDragContext()(
    class DragSource extends PureComponent {
      static propTypes = {
      };

      static defaultProps = {
        canDrag: true,
      };

      constructor(props) {
        super(props);

        this.state = {};

        this.dragManager = null;
        this.preview = null;
      }

      componentDidMount() {
        if (!this.props.canDrag) { return; }

        this.dragManager = new dragManager({
          el: this.node,
          onDragStart: this.onDragStart,
          onDragMove: this.onDragMove,
          onDragEnd: this.onDragEnd,
        });
      }

      componentWillUnmount() {
        this.cleanupPreview();
        this.cleanupDragManager();
      }

      cleanupDragManager = () => {
        this.dragManager.unmount();
        this.dragManager = null;
      };

      cleanupPreview = () => {
        if (this.preview) {
          this.preview.cleanup();
          this.preview = null;
        }
      }

      createPreview = () => {
        const draggablePreview = new DragPreview(this.node);

        this.preview = draggablePreview;
      }

      updatePreview = ({ x, y }) => {
        this.preview.position({ x, y });
      }

      onDragStart = (movement) => {
        this.createPreview();
        this.props.DragContext.dispatch(
          dragActions.dragStart(movement)
        );
        this.setState({ isDragging: true }); // TODO: Should this be handled in a manager?
      }

      onDragMove = ({ x,  y, ...rest }) => {
        this.updatePreview({ x,  y });
        this.props.DragContext.dispatch(
          dragActions.dragMove({
            x, y, ...rest,
          })
        );
      }

      onDragEnd = (movement) => {
        this.cleanupPreview();
        this.setState({ isDragging: false });
        this.props.DragContext.dispatch(
          dragActions.dragEnd(movement)
        );
      }

      styles = () =>  (this.state.isDragging ? { visibility: 'hidden' } : {});

      render() {
        const {
          canDrag,
          DragContext,
          ...rest
        } = this.props;

        return (
          <div style={this.styles()}>
            <div ref={(node) => { this.node = node; }}>
              <WrappedComponent {...rest} ref={(component) => { this.component = component; }} />
            </div>
          </div>
        );
      }
    }
  );

export default dragSource;
