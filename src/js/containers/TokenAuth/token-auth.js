import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signUserIn } from '../../actions';
import { config } from '../../firebase.config';

class TokenAuth extends Component {
  constructor(props) {
    super(props);
  }

  setLocalStorage(data) {
    console.log('set localStorage data here ...');
  }

  signInWithToken() {
    firebase.auth().signInWithCustomToken(localStorage.getItem("accessToken"))
      .catch(err => {
        console.log(err);
        return;
      })
      .then(result => {
        console.log('logged in with token :)');
        console.log(result);
      });
  }

  refreshToken() {
    console.log('tutaj sprawdzac tez expires (na kazdej akcji i tak to sie bedzie resetowalo, ale jak ktos zostawi przegladarke na >3600 sekund to wtedy go wylogujemy i expires in sie nie bedzie zgadzac :)');
    if (!localStorage.getItem("refreshToken")) {
      console.log('not in localStorage');
      return;
    }
    axios.post(`https://securetoken.googleapis.com/v1/token?key=${config.apiKey}`, {
      grant_type: 'refresh_token',
      refresh_token: localStorage.getItem("refreshToken")
    })
    .then(response => {
      if (response.status === 200) {
        console.log(response);
        localStorage.setItem('accessToken', response.data.access_token);
        localStorage.setItem('tokenExpiresIn', response.data.expires_in);
        localStorage.setItem('refreshToken', response.data.refresh_token);
        this.signInWithToken();
      }
    })
    .catch(error => {
      console.log(error);
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