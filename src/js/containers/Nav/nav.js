import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import { signInTab, signUpTab } from '../../constants';
import { signUserOut } from '../../actions';

class Nav extends Component {
  constructor(props) {
    super(props);
  }

  signOut() {
    firebase.auth().signOut().then(() => {
      this.props.signUserOut();
    });
  }

  renderNavItems() {
    if (_.isEmpty(this.props.authenticationData)) {
      return;
    }

    if (!_.isEmpty(this.props.authenticationData.email)) {
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
          <Link to={{ pathname: '/sign', state: { tab: signInTab } }}>
            <li className={`nav__list-item ${this.props.transparent === false ? 'nav__list-item--color' : ''}`}>Sign in</li>
          </Link>
          <Link to={{ pathname: '/sign', state: { tab: signUpTab } }}>
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
            <img className="nav__logo-img" src={require('../../../assets/img/cubes.svg')} />
          </Link>
        </div>
        {component}
      </nav>
    );
  }
}

function mapStateToProps({ authenticationData }) {
  return { authenticationData };
}

export default connect(mapStateToProps, { signUserOut })(Nav);