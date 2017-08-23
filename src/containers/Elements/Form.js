/* eslint-disable */
import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reduxForm, actions, getFormValues, getFormMeta } from 'redux-form';
import { autoInitialisedForm } from '../../behaviours';
import { Field } from '../../containers/Elements';

/**
  * Renders a redux form that contains fields according to a `fields` config.
  *
  * @param {array} fields Contains an array of field definitions see Field for detailed format of definitions:
  * {
  *   label: 'Name',
  *   name: 'name',
  *   type: 'Alphanumeric',
  *   placeholder: 'Name',
  *   validation: {
  *     required: true,
  *   }
  * }
  * @param {func} handleSubmit(data) Recieves data as jsonfrom a sucessful form submission
  * @param {func} autoPopulate(fields, values, autofill) Enables prepopulation of fields
  * based on field value changes. Called on change with current field values and meta,
  * and a callback to allow the setting of otherfields
  *
  */
class Form extends Component {

  handleFieldBlur = () => {
    if(!this.props.autoPopulate) { return; }

    const {
      meta: {
        fields,
        values,
      },
      autofill,
    } = this.props;

    this.props.autoPopulate(fields, values, autofill);
  }

  render() {
    const { fields, handleSubmit, ...rest } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        { fields.map((field, index) => {
          const isFirst = index === 0
          return (
            <Field
              key={field.name}
              {...field}
              onBlur={() => { this.handleFieldBlur() }}
              autoFocus={isFirst}
            />
          );
        }) }
        <br />
        <button type="submit">Submit</button>
      </form>
    );
  }
};

Form.propTypes = {
  fields: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    meta: {
      fields: getFormMeta(ownProps.form)(state),
      values: getFormValues(ownProps.form)(state),
    },
  };
}

export default compose(
  connect(mapStateToProps),
  autoInitialisedForm,
  reduxForm({
    destroyOnUnmount: true,
    forceUnregisterOnUnmount: true,
  }),
)(Form)
