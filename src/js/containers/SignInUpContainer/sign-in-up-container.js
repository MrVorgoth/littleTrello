import React, { Component } from 'react';
import SignIn from '../SignIn/sign-in';
import SignInSocialList from '../SignInSocialList/sign-in-social-list';
import SignUp from '../SignUp/sign-up';
import { signIn, signUp } from '../../constants';

export default class SignInUpContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tab: signIn
    };
  }

  componentWillReceiveProps() {
    this.setTab(this.getTab());
  }

  componentDidMount() {
    this.setTab(this.getTab());
  }

  getTab() {
    const tab = (this.props.history.location.state)
    ? this.props.history.location.state.tab
    : signIn;

    return tab;
  }

  setTab(tab) {
    this.setState({ tab });
  }

  render() {
    let component = (this.state.tab === signIn)
      ? <div><SignIn /><SignInSocialList /></div>
      : <SignUp />;

      return (
      <section className="sign-in-up">
        <div className="sign-in-up__container">
          <div data-tab={signIn} className={`sign-in-up__button ${this.state.tab === signIn ? 'sign-in-up__active' : ''}`} onClick={(e) => { this.setTab(e.currentTarget.dataset.tab) }}>Sign In</div>
          <div data-tab={signUp} className={`sign-in-up__button ${this.state.tab === signUp ? 'sign-in-up__active' : ''}`} onClick={(e) => { this.setTab(e.currentTarget.dataset.tab) }}>Sign Up</div>
          {component}
        </div>
      </section>
    );
  }
}