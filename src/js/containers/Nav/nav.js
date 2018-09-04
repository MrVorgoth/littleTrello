import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { signIn, signUp } from '../../constants';

export default class Nav extends Component {
  render() {
    return (
      <div>
        <nav>
          <Link to="/">
            <button>Logo</button>
          </Link>
          <Link to={{ pathname: '/sign', state: { tab: signIn } }}>
            <button>Sign in</button>
          </Link>
          <Link to={{ pathname: '/sign', state: { tab: signUp } }}>
            <button>Sign up</button>
          </Link>
        </nav>
      </div>
    );
  }
}