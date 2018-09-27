import React, { Component } from 'react';
import { connect } from 'react-redux';

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
        <ul className="nav__list">
          <Link to ='/board'>
            <li className={`nav__list-item ${this.props.transparent === false ? 'nav__list-item--color' : ''}`}>Board</li>
          </Link>
          <Link to ='/' onClick={this.signOut.bind(this)}>
            <li className={`nav__list-item ${this.props.transparent === false ? 'nav__list-item--color' : ''}`}>Sign out</li>
          </Link>
        </ul>
      );
    } else {
      return (
        <ul className="nav__list">
          <Link to={{ pathname: '/sign', state: { tab: signIn } }}>
            <li className={`nav__list-item ${this.props.transparent === false ? 'nav__list-item--color' : ''}`}>Sign in</li>
          </Link>
          <Link to={{ pathname: '/sign', state: { tab: signUp } }}>
            <li className={`nav__list-item ${this.props.transparent === false ? 'nav__list-item--color' : ''}`}>Sign up</li>
          </Link>
        </ul>
      );
    }
  }

  render() {
    let component = this.renderNavItems();

    return (
      <nav className={`nav ${this.props.transparent === false ? 'nav--background' : ''}`}>
        <div className="nav__logo">
          <Link to="/">
            <img src={require('../../../assets/img/logo.png')} />
          </Link>
        </div>
        {component}
      </nav>
    );
  }
}

function mapStateToProps({ signInData }) {
  return { signInData };
}

export default connect(mapStateToProps, { signUserOut })(Nav);