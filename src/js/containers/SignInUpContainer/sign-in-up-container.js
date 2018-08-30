import React, { Component } from 'react';
import SignIn from '../SignIn/sign-in';
import SignInSocialList from '../SignInSocialList/sign-in-social-list';
import SignUp from '../SignUp/sign-up';

export default class SignInUpContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSigningIn: true,
      active: 'sign-in'
    };
  }

  onSignInUpClick(e) {
    if (e.currentTarget.textContent == 'Sign In') {
      this.setState({ active: 'sign-in' });
      this.setState({ isSigningIn: true })
    } else {
      this.setState({ active: 'sign-up' });
      this.setState({ isSigningIn: false })
    }
  }

  render() {
    let component = (this.state.isSigningIn)
      ? <div><SignIn isSigningIn={this.state.isSigningIn} /><SignInSocialList isSigningIn={this.state.isSigningIn} /></div>
      : <SignUp isSigningIn={this.state.isSigningIn} />;
    return (
      <section className="sign-in-up">
        <div className="sign-in-up__container">
          <div className={`sign-in-up__button ${this.state.active === 'sign-in' ? 'sign-in-up__active' : ''}`} onClick={this.onSignInUpClick.bind(this)}>Sign In</div>
          <div className={`sign-in-up__button ${this.state.active === 'sign-up' ? 'sign-in-up__active' : ''}`} onClick={this.onSignInUpClick.bind(this)}>Sign Up</div>
          {component}
        </div>
      </section>
    );
  }
}