/* eslint-disable */

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionCreators as networkActions } from '../../ducks/modules/network';
import {
  actionCreators as modalActions,
  modalNames as modals,
} from '../../ducks/modules/modals';
import { newNodeAttributes } from '../../selectors/session';
import { activeOriginNetwork } from '../../selectors/network';
import { PromptSwiper, NodeProviderPanels, Modal } from '../../containers/Elements';
import { NodeList, Form, NodeBin, FormEditNode } from '../../components/Elements';

const MODAL_NEW_NODE = 'MODAL_NEW_NODE';

/**
  * This would/could be specified in the protocol, and draws upon ready made components
  */
class NameGenerator extends Component {

  constructor(props) {
    super(props);

    this.state = {
      nodeToEdit: null,
    };
  }

  handleAddNode = (node, _, form) => {
    const {
      addNode,
      closeModal,
    } = this.props;

    if (node) {
      addNode({ ...node, ...this.props.newNodeAttributes });
      closeModal(MODAL_NEW_NODE);
    }
  }

  handleEditNode = (node, _, form) => {
    const {
      updateNode,
      closeModal,
    } = this.props;

    if (node) {
      updateNode({ ...this.state.nodeToEdit, ...node });
      closeModal(modals.EDIT_NODE);
    }
  }

  handleSelectNode = (node) => {
    this.setState({ nodeToEdit: node }, () => {
      this.props.openModal(modals.EDIT_NODE);
    });
  }

  handleDropNode = (hits, node) => {
    hits.forEach((hit) => {
      switch (hit.name) {
        case 'NODE_BIN':
          this.props.removeNode(node.uid);
          break;
        default:
      }
    });
  }

  render() {
    const {
      config: {
        params: {
          form,
          prompts,
          panels,
        },
      },
      openModal,
    } = this.props;

    const label = node => `${node.nickname}`;

    return (
      <div className="name-generator">
        <div className="name-generator__prompt">
          <PromptSwiper prompts={prompts} />
        </div>
        <div className="name-generator__main">
          <div className="name-generator__panels">
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <NodeProviderPanels config={panels} />
            </div>
          </div>
          <div className="name-generator__nodes">
            <NodeList
              network={this.props.activeOriginNetwork}
              label={label}
              droppableName="MAIN_NODE_LIST"
              acceptsDraggableType="NEW_NODE"
              draggableType="EXISTING_NODE"
              handleDropNode={this.handleDropNode}
              handleSelectNode={this.handleSelectNode}
            />
          </div>
        </div>

        <FormEditNode node={this.state.nodeToEdit} form={form} handleEditNode={this.handleEditNode} />

        <Modal name={MODAL_NEW_NODE} title={form.title} >
          <Form {...form} form={form.formName} onSubmit={this.handleAddNode} />
        </Modal>

        <button className="name-generator__add-person" onClick={() => openModal(MODAL_NEW_NODE)}>
          Add a person
        </button>

        <NodeBin />
      </div>
    );
  }
}

NameGenerator.propTypes = {
  config: PropTypes.object.isRequired,
  addNode: PropTypes.func.isRequired,
  updateNode: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  newNodeAttributes: PropTypes.any.isRequired,
  activeOriginNetwork: PropTypes.any.isRequired,
  removeNode: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    newNodeAttributes: newNodeAttributes(state),
    activeOriginNetwork: activeOriginNetwork(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addNode: bindActionCreators(networkActions.addNode, dispatch),
    updateNode: bindActionCreators(networkActions.updateNode, dispatch),
    removeNode: bindActionCreators(networkActions.removeNode, dispatch),
    closeModal: bindActionCreators(modalActions.closeModal, dispatch),
    openModal: bindActionCreators(modalActions.openModal, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NameGenerator);
