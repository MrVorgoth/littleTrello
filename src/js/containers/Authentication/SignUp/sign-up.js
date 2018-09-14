import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { signUserIn } from '../../../actions';

class SignUp extends Component {
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

  updateFirebaseList(email) {
    const db = firebase.firestore();
    db.settings({timestampsInSnapshots: true});
    const todo = db.collection('todo').doc(email);
    todo.onSnapshot(doc => {
      if (_.isEmpty(doc.data())) {
        todo.set({ todoTasks: [] });
      }
    });
  }

  updateUser(data) {
    firebase.auth().currentUser.updateProfile({
      displayName: `${data.name} ${data.surname}`
    }).then(() => {
      const userData = ( ({ name, surname, email }) => ({ name, surname, email }) )(data);
      console.log('Add modal here (succesfully updated)');
      this.props.signUserIn(userData);
    }).catch((error) => {
      console.log('Add modal here (unsuccessful update)');
    });
  }

  createAccount(values) {
    let error = {};
    firebase.auth().createUserWithEmailAndPassword(values.email, values.password).catch((err) => {
      error = err;
      console.log('Add modal here');
    }).then(() => {
      if (_.isEmpty(error)) {
        this.updateFirebaseList(values.email);
        this.updateUser(values);
      } else {
        console.log('Add modal here');
      }
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.createAccount.bind(this))}>
        <Field
            name="name"
            label="Name"
            type="text"
            component={this.renderField}
          />
          <Field
            name="surname"
            label="Surname"
            type="text"
            component={this.renderField}
          />
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

  if (!values.name) {
    errors.name = "Enter name";
  }

  if (values.name) {
    let regex = /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$/;
    if (!values.name.match(regex)) {
      errors.name = "Name must contain only alphanumeric characters";
    }
  }

  if (!values.surname) {
    errors.surname = "Enter surname";
  }

  if (values.surname) {
    let regex = /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$/;
    if (!values.surname.match(regex)) {
      errors.surname = "Surname must contain only alphanumeric characters";
    }
  }

  if (!values.email) {
    errors.email = "Enter e-mail";
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

function mapStateToProps({ signInData }) {
  return { signInData };
}

export default reduxForm({
  validate,
  form: 'SignUpForm'
})(
  connect(mapStateToProps, { signUserIn })(SignUp)
);