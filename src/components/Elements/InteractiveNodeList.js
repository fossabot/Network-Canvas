import React, { Component } from 'react';
import Draggable from 'react-draggable';
import Touch from 'react-hammerjs';
import _ from 'lodash';

import { Node } from '../../components/Elements';

class InteractiveNodeList extends Component {

  draggableNode = (node, index) => {
    return (
      <Draggable key={ index } position={ { x: 0, y: 0 } } onStop={ () => this.props.handleDragNode(node) }>
        <div>
          <Node { ...node } label={ `${node.nickname}` } />
        </div>
      </Draggable>
    );
  }

  selectableNode = (node, index) => {
    const isActive = _.isMatch(node, this.props.activeNodeAttributes);

    return (
      <Touch key={ index } onTap={ () => this.props.handleSelectNode(node) } >
        <Node { ...node } label={ `${node.nickname}` } isActive={ isActive } />
      </Touch>
    );
  }

  render() {
    const {
      network,
      interaction,
    } = this.props;

    const mapNodes = (nodes, interaction) => {
      switch (interaction) {
        case 'selectable':
          return nodes.map(this.selectableNode);
        case 'draggable':
          return nodes.map(this.draggableNode);
        default:
          return nodes.map((node, index) => {
            <Node key={ index } { ...node } />
          });
      }
    }

    let nodes = mapNodes(network.nodes, interaction);

    return (
      <div class='node-list node-list--interactive'>
        { nodes }
      </div>
    );
  }
}

export default InteractiveNodeList;