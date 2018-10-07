import React, { Component } from 'react';
import { connect } from 'react-redux';
import Zoom from 'react-reveal/Zoom';
import { signInTab, signUpTab } from '../../constants';
import Nav from '../Nav/nav';
import SignIn from './SignIn/sign-in';
import SignInSocialList from './SignInSocialList/sign-in-social-list';
import SignUp from './SignUp/sign-up';
import Footer from '../../components/Footer/footer';

class Authentication extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tab: signInTab
    };
  }

  componentDidMount() {
    this.setTab(this.getTab());
  }

  componentDidUpdate() {
    if (!_.isEmpty(this.props.authenticationData.email)) {
      this.props.history.push('/board');
    }
  }

  componentWillReceiveProps() {
    this.setTab(this.getTab());
  }

  getTab() {
    const tab = (this.props.history.location.state)
    ? this.props.history.location.state.tab
    : signInTab;

    return tab;
  }

  setTab(tab) {
    this.setState({ tab });
  }

  render() {
    let component = (this.state.tab === signInTab)
      ? <div><SignIn /><SignInSocialList /></div>
      : <SignUp />;

    return (
      <div>
        <Nav transparent={false} />
          <section className="authentication">
            <Zoom>
              <div className="authentication__container">
                <div
                  data-tab={signInTab}
                  className={`authentication__button ${this.state.tab === signInTab ? 'authentication__active' : ''}`}
                  onClick={(e) => { this.setTab(e.currentTarget.dataset.tab) }}
                >Sign In
                </div>
                <div
                  data-tab={signUpTab}
                  className={`authentication__button ${this.state.tab === signUpTab ? 'authentication__active' : ''}`}
                  onClick={(e) => { this.setTab(e.currentTarget.dataset.tab) }}
                >Sign Up
                </div>
                {component}
              </div>
            </Zoom>
          </section>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps({ authenticationData }) {
  return { authenticationData };
}

export default connect(mapStateToProps)(Authentication);