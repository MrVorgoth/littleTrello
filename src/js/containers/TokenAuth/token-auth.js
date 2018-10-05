import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signUserIn } from '../../actions';

class TokenAuth extends Component {
  constructor(props) {
    super(props);
  }

  refreshToken() {
    if (!_.isEmpty(this.props.authenticationData.email)) {
      return;
    }

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('TEST !!! 111', user);
        const [name, surname] = user.displayName.split(' ');
        const userData = { email: user.email, name, surname };
        this.props.signUserIn(userData);
      }
    });
  }

  render() {
    this.refreshToken();
    console.log('Token Auth Container');
    return null;
  }
}

function mapStateToProps({ authenticationData }) {
  return { authenticationData };
}

export default connect(mapStateToProps, { signUserIn })(TokenAuth);