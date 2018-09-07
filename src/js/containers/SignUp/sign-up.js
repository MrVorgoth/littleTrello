import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { signUserIn } from '../../actions';

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

  createAccount(values) {
    console.log(values);
    let error = {};
    let userData = {};
    firebase.auth().createUserWithEmailAndPassword(values.email, values.password).catch(function(err) {
      error = err;
      console.log(`Error code: ${err.code}, error msg: ${err.message} `);
    }).then(result => {
      console.log(result);
      userData.email = values.email;
      userData.name = 'Janek';
      userData.surname = 'Kowalski';
      result.name = userData.name;
      result.surname = userData.surname;
      if (_.isEmpty(error)) {
        this.updateFirebaseList(values.email);
        this.updateUser(userData);
        // this.props.signUserIn(values.email);
        this.props.signUserIn(userData);
      } else {
        console.log('I can append something or add new div to the from with error inside');
      }
    });
  }

  updateUser(data) {
    firebase.auth().currentUser.updateProfile({
      displayName: `${data.name} ${data.surname}`
    }).then(function() {
      console.log('updated user data');
    }).catch(function(error) {
      console.log('NOT updated user data');
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit(this.createAccount.bind(this))}>
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

function mapStateToProps({ signInData }) {
  return { signInData };
}

export default reduxForm({
  validate,
  form: 'SignUpForm'
})(
  connect(mapStateToProps, { signUserIn })(SignUp)
);