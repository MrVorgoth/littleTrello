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
    if (this.props.social == 'google-plus') {
      this.googleLogin();
    }
  }

  render() {
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
      </div>
    );
  }
}

export default connect(null, { signUserIn })(SignInSocial);