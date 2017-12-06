/* eslint-disable */
import React from 'react';
import { find, contains, pick, uniqueId } from 'lodash';
import { compose } from 'redux';
import { mapProps } from 'recompose';
import { getDragContext } from './DragContext';

const defaultMonitorProps = {
  isOver: false,
  isSourceCompatable: false,
};

const getMonitorProps = (props) => {
  console.log(props, 'getMonitorProps');
  const state = props.DragContext.getState();
  const target = find(state.targets, ['id', props.id]);
  if (!target) { return { ...defaultMonitorProps } };
  return {
    isOver: target.isOver,
     isSourceCompatable: target.accepts.indexOf(state.source.type) !== -1,
  }
};

const MonitorDropTarget = types =>
  WrappedComponent =>
    compose(
      mapProps(props => ({
        id: uniqueId(),
        ...props,
      })),
      getDragContext(),
    )(
      (props) => {
        const monitorProps = pick(getMonitorProps(props), types);
        return <WrappedComponent {...props} {...monitorProps }/>;
      }
    );

export default MonitorDropTarget;
