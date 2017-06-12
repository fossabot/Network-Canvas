import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import { Node } from '../Elements';
import { scrollable, droppable, draggable, selectable } from '../../behaviors';
import styles from '../../ui/styles';

const EnhancedNode = draggable(selectable(Node));

/**
  * Renders a list of Node.
  */
const NodeList = (props) => {
  const {
    network,
    label,
    isActive,
    handleSelectNode,
    handleDropNode,
    draggableType,
  } = props;

  return (
    <div className="node-list">
      <CSSTransitionGroup
        transitionName="node-list"
        transitionAppearTimeout={styles.animation.duration.fast}
        transitionAppear
        transitionLeave={false}
        transitionEnter={false}
      >
        {
          network.nodes.map(node => (
            <EnhancedNode
              key={node.uid}
              label={label(node)}
              isActive={isActive(node)}
              onSelected={() => handleSelectNode(node)}
              onDropped={hits => handleDropNode(hits, node)}
              draggableType={draggableType}
              {...node}
            />
          ))
        }
      </CSSTransitionGroup>
    </div>
  );
};

NodeList.propTypes = {
  network: PropTypes.any.isRequired,
  handleSelectNode: PropTypes.func,
  handleDropNode: PropTypes.func,
  label: PropTypes.func,
  isActive: PropTypes.func,
  draggableType: PropTypes.string,
};

NodeList.defaultProps = {
  label: () => (''),
  isActive: () => false,
  handleSelectNode: () => {},
  handleDropNode: () => {},
  draggableType: '',
};

export default droppable(scrollable(NodeList));
