import React, { Component } from 'react';
import Social from '../SignInSocial/sign-in-social';

export default class SignInSocialList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Social icon='fb' bgIcon='#2C5A90' text='FaceBook' bgText='#2F64A0' />
        <Social icon='g+' bgIcon='#B04847' text='Google+' bgText='#C84A4B' />
      </div>
    );
  }
}