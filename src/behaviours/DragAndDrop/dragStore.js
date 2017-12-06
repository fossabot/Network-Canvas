import { filter, omit, uniqBy } from 'lodash';
import { compose } from 'redux';

const UPDATE_TARGET = Symbol('DRAG_AND_DROP/UPDATE_TARGET');
const UPDATE_SOURCE = Symbol('DRAG_AND_DROP/UPDATE_SOURCE');
const DRAG_START = Symbol('DRAG_AND_DROP/DRAG_START');
const DRAG_MOVE = Symbol('DRAG_AND_DROP/DRAG_MOVE');
const DRAG_END = Symbol('DRAG_AND_DROP/DRAG_END');

const initialState = {
  targets: [],
  source: {},
};

const markTargetHits = ({ targets, source, ...rest }) => ({
  targets: targets.map((target) => {
    if (
      source.x > target.x &&
      source.x < target.x + target.width &&
      source.y > target.y &&
      source.y < target.y + target.height
    ) {
      return { ...target, isOver: true };
    }

    return { ...target, isOver: false };
  }),
  source,
  ...rest,
});

const markSourceHit = ({ targets, source, ...rest }) => ({
  targets,
  source: {
    ...source,
    isOver: filter(targets, 'isOver').length > 0,
  },
  ...rest,
});

const resetHits = ({ targets, source, ...rest }) => ({
  targets: targets.map(target => omit(target, ['isOver'])),
  source: omit(source, ['isOver']),
  ...rest,
});

const markHits = state => compose(markSourceHit, markTargetHits)(state);

const reducer = (state = initialState, { type, ...action }) => {
  switch (type) {
    case UPDATE_TARGET:
      return markHits({
        ...state,
        targets: uniqBy([action, ...state.targets], 'id'),
      });
    case DRAG_START:
      return markHits({
        ...state,
        source: action,
      });
    case DRAG_MOVE:
      return markHits({
        ...state,
        source: action,
      });
    case DRAG_END: {
      const hits = markHits({
        ...state,
        source: action,
      });

      filter(hits.targets, 'isOver')
        .forEach((target) => {
          target.onDrop(target, hits.source);
        });

      return resetHits({
        ...state,
        source: action,
      });
    }
    default:
      return state;
  }
};

function updateTarget(data) {
  console.log('update target', data);
  return {
    type: UPDATE_TARGET,
    ...data,
  };
}

function dragStart(data) {
  return {
    type: DRAG_START,
    ...data,
  };
}

function dragMove(data) {
  return {
    type: DRAG_MOVE,
    ...data,
  };
}

function dragEnd(data) {
  return {
    type: DRAG_END,
    ...data,
  };
}

const actionCreators = {
  updateTarget,
  dragStart,
  dragMove,
  dragEnd,
};

const actionTypes = {
};

export {
  actionCreators,
  actionTypes,
  reducer,
};

export default reducer;
