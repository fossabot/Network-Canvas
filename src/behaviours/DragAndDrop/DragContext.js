import PropTypes from 'prop-types';
import { createStore } from 'redux';
import { withContext, getContext } from 'recompose';
import { reducer as dragReducer } from './dragStore';

const dragStore = createStore(dragReducer);
dragStore.subscribe(() => {
  console.log(dragStore.getState());
});

const provideDragContext = () => withContext(
  { DragContext: PropTypes.object },
  () => ({ DragContext: dragStore }),
);

const getDragContext = () => getContext(
  { DragContext: PropTypes.object },
);

export {
  provideDragContext,
  getDragContext,
};
