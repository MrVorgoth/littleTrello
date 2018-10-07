import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { signUserIn } from '../../../actions';
import Modal from '../../../components/Modal/modal';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalText: '',
      showModal: false
    };
  }

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

  updateFirebaseList(email) {
    const db = firebase.firestore();
    db.settings({timestampsInSnapshots: true});
    db.collection('todo').doc(email).set({ todoTasks: [] });
    db.collection('doing').doc(email).set({ doingTasks: [] });
    db.collection('done').doc(email).set({ doneTasks: [] });
  }

  updateUser(data) {
    firebase.auth().currentUser.updateProfile({
      displayName: `${data.name} ${data.surname}`
    }).then(() => {
      const userData = ( ({ name, surname, email }) => ({ name, surname, email }) )(data);
      this.props.signUserIn(userData);
    }).catch((error) => {
      this.setState({ modalText: 'Something went wrong. Please try again', showModal: true });
    });
  }

  createAccount(values) {
    let error = {};
    firebase.auth().createUserWithEmailAndPassword(values.email, values.password).catch((err) => {
      error = err;
      this.setState({ modalText: 'Something went wrong. Please try again', showModal: true });
    }).then(() => {
      if (_.isEmpty(error)) {
        this.updateFirebaseList(values.email);
        this.updateUser(values);
      } else {
        this.setState({ modalText: 'Something went wrong. Please try again', showModal: true });
      }
    });
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  displayModal() {
    return (this.state.showModal)
      ? <Modal onCloseRequest={() => this.toggleModal()} text={this.state.modalText} />
      : null;
  }

  mouseDown(e) {
    if (this.state.showModal && !e.target.className.includes('modal__')) {
      this.toggleModal();
    }
  }

  keyDown(e) {
    if (this.state.showModal && e.keyCode === 27) {
      this.toggleModal();
    }
  }

  render() {
    let modal = this.displayModal();

    return (
      <div>
        <form className="authentication__form" onSubmit={this.props.handleSubmit(this.createAccount.bind(this))}>
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
          <button className="authentication__form-button" type="submit">Sign up</button>
        </form>
        {modal}
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
    if (values.password.length < 6) {
      errors.password = "Password needs to be at least 6 character long";
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
    if (values.password.length < 6) {
      errors.password = "Password needs to be at least 6 character long";
    }
  }

  if (values.password !== values.password2) {
    errors.password2 = "Passwords are not identical";
  }

  return errors;
}

function mapStateToProps({ authenticationData }) {
  return { authenticationData };
}

export default reduxForm({
  validate,
  form: 'SignUpForm'
})(
  connect(mapStateToProps, { signUserIn })(SignUp)
);