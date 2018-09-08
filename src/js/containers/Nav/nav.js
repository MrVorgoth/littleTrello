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
      // this.props.history.push('/');
    }).catch((error) => {
      console.log(`Error code: ${error.code}, error msg: ${error.message} `);
      console.log('I can append something or add new div to the from with error inside');
    });
  }

  renderNavItems() {
    if (!this.props.signInData) {
      return;
    }

    if (this.props.signInData.hasOwnProperty('email')) {
      return(
        <div>
          <Link to ='/board'>
            <button>Board</button>
          </Link>
          <Link to ='/' onClick={this.signOut.bind(this)}>
            <button>Sign out</button>
          </Link>
        </div>
      );
    } else {
      return (
        <div>
          <Link to={{ pathname: '/sign', state: { tab: signIn } }}>
            <button>Sign in</button>
          </Link>
          <Link to={{ pathname: '/sign', state: { tab: signUp } }}>
            <button>Sign up</button>
          </Link>
        </div>
      );
    }
  }

  render() {
    let component = this.renderNavItems();
    console.log(this.props.signInData);

    return (
      <div>
        <nav>
          <Link to="/">
            <button>Logo</button>
          </Link>
          {component}
        </nav>
      </div>
    );
  }
}

function mapStateToProps({ signInData }) {
  return { signInData };
}

export default connect(mapStateToProps, { signUserOut })(Nav);