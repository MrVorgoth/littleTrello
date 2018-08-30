import React, { Component } from 'react';

export default class SignUp extends Component {
  render() {
    if (this.props.isSigningIn) {
      return null;
    }

    return (
      <div>Hello from SignUp</div>
    );
  }
}