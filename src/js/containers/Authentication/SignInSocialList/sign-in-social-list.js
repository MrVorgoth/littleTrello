import React, { Component } from 'react';
import Social from '../SignInSocial/sign-in-social';

export default class SignInSocialList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Social social='facebook' />
        <Social social='google-plus' />
      </div>
    );
  }
}