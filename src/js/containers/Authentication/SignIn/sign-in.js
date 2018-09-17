import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { signUserIn } from '../../../actions';

class SignIn extends Component {
  renderField(field) {
    const textError = `${field.meta.touched && field.meta.error ? field.meta.error : ''}`;

    return (
      <div>
        <div>
          <label>{field.label}</label>
          <p>{textError}</p>
        </div>
        <input
          type={field.type}
          {...field.input}
        />
      </div>
    );
  }

  signInToAccount(values) {
    let error = {};
    firebase.auth().signInWithEmailAndPassword(values.email, values.password).catch(function(err) {
      error = err;
      console.log(`Error code: ${err.code}, error msg: ${err.message} `);
      console.log('Add modal here');
    }).then(result => {
      if (_.isEmpty(error)) {
        const [name, surname] = result.user.displayName.split(' ');
        const userData = { email: values.email, name, surname };
        this.props.signUserIn(userData);
      } else {
        console.log('Add modal here');
      }
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.signInToAccount.bind(this))}>
          <Field
            name="email"
            label="E-mail"
            type="text"
            component={this.renderField}
          />
          <Field
            name="password"
            label="Password"
            type="password"
            component={this.renderField}
          />
          <button type="submit">Sign in</button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.email) {
    errors.email = "Enter an e-mail";
  }

  if (values.email) {
    let regex = /^[^\s]*[0-9a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+@{1}[0-9a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+\.[0-9a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]{1}[.0-9a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+[^\s]*$/;
    if (!values.email.match(regex)) {
      errors.email = "Enter correct e-mail";
    }
  }

  if (!values.password) {
    errors.password = "Enter password";
  }

  if (values.password) {
    let regex = /^[^\s]*[0-9a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$/;
    if (!values.password.match(regex)) {
      errors.password = "Password can't contain white characters";
    }
  }

  return errors;
}

function mapStateToProps({ signInData }) {
  return { signInData };
}

export default reduxForm({
  validate,
  form: 'SignInForm'
})(
  connect(mapStateToProps, { signUserIn })(SignIn)
);