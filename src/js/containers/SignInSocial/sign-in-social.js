import React, { Component } from 'react';

export default class SignInSocial extends Component {
  constructor(props) {
    super(props);
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then(result => {
        console.log(result.user.email);
      }).catch(error => {
        console.log(error);
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