import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class SignUp extends Component {
  renderField(field) {
    return (
      <div>
        <label>{field.label}</label>
        <input
          type={field.type}
          {...field.input}
        />
      </div>
    );
  }

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

  onSubmit(values) {
    console.log(values);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
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
          <Field
            name="password2"
            label="Repeat password"
            type="password"
            component={this.renderField}
          />
          <button type="submit">Sign up</button>
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

  if (!values.password2) {
    errors.password2 = "Enter password again";
  }

  if (values.password2) {
    let regex = /^[^\s]*[0-9a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$/;
    if (!values.password2.match(regex)) {
      errors.password2 = "Password can't contain white characters";
    }
  }

  if (values.password !== values.password2) {
    errors.password2 = "Passwords are not identical";
  }

  return errors;
}

export default reduxForm({
  validate,
  form: 'SignUpForm'
})(SignUp);