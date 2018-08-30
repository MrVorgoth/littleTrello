import React, { Component } from 'react';

export default class SignIn extends Component {
  render() {
    if (!this.props.isSigningIn) {
      return null;
    }

    return (
      <div>Hello from SignIn</div>
    );
  }
}