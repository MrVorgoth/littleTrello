import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link as ScrollLink} from 'react-scroll';

import { Link } from 'react-router-dom';
import { signIn, signUp } from '../../constants';
import { signUserOut } from '../../actions';

class Nav extends Component {
  constructor(props) {
    super(props);
  }

  signOut() {
    firebase.auth().signOut().then(() => {
      this.props.signUserOut();
    }).catch((error) => {
      console.log('Add modal here');
    });
  }

  renderNavItems() {
    if (!this.props.signInData) {
      return;
    }

    if (this.props.signInData.hasOwnProperty('email')) {
      return (
        <div className="nav__list--inline">
          <Link to ='/board'>
            <li className={`nav__list-item ${this.props.transparent === false ? 'nav__list-item--color' : ''}`}>Board</li>
          </Link>
          <Link to ='/' onClick={this.signOut.bind(this)}>
            <li className={`nav__list-item ${this.props.transparent === false ? 'nav__list-item--color' : ''}`}>Sign out</li>
          </Link>
        </div>
      );
    } else {
      return (
        <div className="nav__list--inline">
          <Link to={{ pathname: '/sign', state: { tab: signIn } }}>
            <li className={`nav__list-item ${this.props.transparent === false ? 'nav__list-item--color' : ''}`}>Sign in</li>
          </Link>
          <Link to={{ pathname: '/sign', state: { tab: signUp } }}>
            <li className={`nav__list-item ${this.props.transparent === false ? 'nav__list-item--color' : ''}`}>Sign up</li>
          </Link>
        </div>
      );
    }
  }

  renderHomePageItems() {
    let offset = -50;
    if (this.props.displayHomeItems) {
      return (
        <div className="nav__list--inline">
          <li className={`nav__list-item ${this.props.transparent === false ? 'nav__list-item--color' : ''}`}><ScrollLink to="hero" smooth={true} offset={offset} duration={500}>Hero</ScrollLink></li>
          <li className={`nav__list-item ${this.props.transparent === false ? 'nav__list-item--color' : ''}`}><ScrollLink to="about" smooth={true} offset={offset} duration={500}>About</ScrollLink></li>
        </div>
      );
    }
    return null;
  }

  render() {
    let component = this.renderNavItems();
    let homePage = this.renderHomePageItems();

    return (
      <nav className={`nav ${this.props.transparent === false ? 'nav--background' : ''}`}>
        <div className="nav__logo">
          <Link to="/">
            <img src={require('../../../assets/img/logo.png')} />
          </Link>
        </div>
        <ul className="nav__list">
          {homePage}
          {component}
        </ul>
      </nav>
    );
  }
}

function mapStateToProps({ signInData }) {
  return { signInData };
}

export default connect(mapStateToProps, { signUserOut })(Nav);