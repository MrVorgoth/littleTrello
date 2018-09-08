import React, { Component } from 'react';

export default class SignInSocial extends Component {
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
  }

  googleLogin() {
    let error = {};
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .catch(err => {
        error = err;
      }).then(result => {
        console.log(result);
        console.log(error);
        if (_.isEmpty(error)) {
          this.updateFirebaseList(result.user.email);
        } else {
          console.log('(GOOGLE+) I can append something or add new div to the from with error inside');
        }
      });
  }

  signIn(e) {
    console.log(this.props);
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