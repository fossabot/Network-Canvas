import { find, contains, pick } from 'lodash';
import { compose } from 'redux';
import React from 'react';
import { getDragContext } from './DragContext';

const defaultMonitorProps = {
  isOver: false,
  isSourceCompatable: false,
};

const getMonitorProps = (state, props) => {
  const target = find(state.targets, ['id', props.id]);
  if (!target) { return { ...defaultMonitorProps } };
  return {
    isOver: target.isOver,
    isSourceCompatable: contains(target.accepts, state.source.type),
  }
};

const MonitorDropTarget = types =>
  WrappedComponent =>
    compose(
      getDragContext(),
    )(
      ({ DragContext, ...rest }) => {
        const state = DragContext.getState();

        const props = {
          ...rest,
          ...pick(getMonitorProps(state, rest), types),
        };

        return (<WrappedComponent foo="bar" {...props} />);
      },
    );

export default MonitorDropTarget;
