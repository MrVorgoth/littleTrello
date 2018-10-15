import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { signUserIn } from '../../../actions';
import Modal from '../../../components/Modal/modal';
import Loading from '../../../components/Loading/loading';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalText: '',
      showModal: false,
      showLoading: false,
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

  signInToAccount(values) {
    this.toggleLoading();
    let error = {};
    firebase.auth().signInWithEmailAndPassword(values.email, values.password).catch((err) => {
      error = err;
      this.setState({ modalText: 'Something went wrong. Please try again', showModal: true, showLoading: false });
    }).then(result => {
      if (_.isEmpty(error)) {
        const [name, surname] = result.user.displayName.split(' ');
        const userData = { email: values.email, name, surname };
        this.props.signUserIn(userData);
      } else {
        this.setState({ modalText: 'Something went wrong. Please try again', showModal: true });
      }
    });
  }

  toggleLoading() {
    this.setState({ showLoading: !this.state.showLoading });
  }

  displayLoading() {
    return (this.state.showLoading)
      ? <Loading />
      : null;
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
    let loading = this.displayLoading();

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
        {modal}
        {loading}
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