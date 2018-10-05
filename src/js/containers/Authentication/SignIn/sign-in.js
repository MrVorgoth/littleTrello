import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { signUserIn } from '../../../actions';

class SignIn extends Component {
  renderField(field) {
    const textError = `${field.meta.touched && field.meta.error ? field.meta.error : ''}`;

    return (
      <div className="authentication__form-item">
        <label className="authentication__form-label">{field.label}</label>
        <p className="authentication__form-error">{textError}</p>
        <input
          className="authentication__form-input"
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
      console.log(result);
      if (_.isEmpty(error)) {
        const [name, surname] = result.user.displayName.split(' ');
        const userData = { email: values.email, name, surname };
        localStorage.setItem('refreshToken', result.user.refreshToken);
        this.props.signUserIn(userData);
      } else {
        console.log('Add modal here');
      }
    });
  }

  render() {
    return (
      <div>
        <form
          className="authentication__form"
          onSubmit={this.props.handleSubmit(this.signInToAccount.bind(this))}
        >
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
          <button className="authentication__form-button" type="submit">Sign in</button>
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
    if (values.password.length < 6) {
      errors.password = "Password needs to be at least 6 character long";
    }
  }

  return errors;
}

function mapStateToProps({ authenticationData }) {
  return { authenticationData };
}

export default reduxForm({
  validate,
  form: 'SignInForm'
})(
  connect(mapStateToProps, { signUserIn })(SignIn)
);