import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signUserIn } from '../../../actions';

class SignInSocial extends Component {
  constructor(props) {
    super(props);
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

  googleLogin() {
    let error = {};
    const provider = new firebase.auth.GoogleAuthProvider();
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
          console.log('(GOOGLE+) Add modal here');
        }
      });
  }

  signIn(e) {
    if (this.props.text == 'Google+') {
      this.googleLogin();
    }
  }

  render() {
    return (
      <div className="sign-in-social">
        <div className="sign-in-social__box" onClick={this.signIn.bind(this)}>
          <div style={{backgroundColor: this.props.bgIcon}} className="sign-in-social__icon">{this.props.icon}</div>
          <div style={{backgroundColor: this.props.bgText}} className="sign-in-social__text">Sign in with <strong>{this.props.text}</strong></div>
        </div>
      </div>
    );
  }
}

export default connect(null, { signUserIn })(SignInSocial);