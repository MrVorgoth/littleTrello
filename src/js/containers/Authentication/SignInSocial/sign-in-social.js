import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signUserIn } from '../../../actions';
import Modal from '../../../components/Modal/modal';

class SignInSocial extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalText: '',
      showModal: false
    };
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

    const doing = db.collection('doing').doc(email);
    doing.onSnapshot(doc => {
      if (_.isEmpty(doc.data())) {
        doing.set({ doingTasks: [] });
      }
    });

    const done = db.collection('done').doc(email);
    done.onSnapshot(doc => {
      if (_.isEmpty(doc.data())) {
        done.set({ doneTasks: [] });
      }
    });
  }

  authenticatePopup(socialProvider) {
    let error = {};
    const provider = new firebase.auth[`${socialProvider}AuthProvider`]();
    firebase.auth().signInWithPopup(provider)
      .catch(err => {
        error = err;
      }).then(result => {
        if (_.isEmpty(error)) {
          if (result.additionalUserInfo.isNewUser) {
            this.updateFirebaseList(result.user.email);
          }
          const [name, surname] = result.user.displayName.split(' ');
          const userData = { email: result.user.email, name, surname };
          this.props.signUserIn(userData);
        } else {
          this.setState({ modalText: 'Something went wrong. Please try again', showModal: true });
        }
      });
  }

  signIn() {
    switch(this.props.social) {
      case 'google-plus':
        this.authenticatePopup('Google');
        break;
      case 'facebook':
        this.authenticatePopup('Facebook');
        break;
    }
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
      <div className="authentication__social">
        <div
          className={`authentication__social-item authentication__social-item-${this.props.social}`}
          onClick={this.signIn.bind(this)}>
          <div className={`authentication__social-text`}>Sign in with</div>
          <img
            className={`authentication__social-icon`}
            src={require(`../../../../assets/img/${this.props.social}.svg`)}
          />
        </div>
        {modal}
      </div>
    );
  }
}

export default connect(null, { signUserIn })(SignInSocial);