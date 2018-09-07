// import axios from 'axios';
// import Firebase from 'firebase';
// const firebase = new Firebase('https://littletrello-3a909.firebaseio.com');
import { SIGN_IN, SIGN_OUT } from '../constants';

export function signUserIn(data) {
  return {
    type: SIGN_IN,
    payload: data
  }
}

export function signUserOut() {
  return {
    type: SIGN_OUT,
    payload: {}
  }
}

// export function signInWithGoogle() {
//   return dispatch => {
//     firebase.on('value', snapshot => {
//       dispatch({
//         type: SIGN_IN_GOOGLE,
//         payload: snapshot.val()
//       });
//     });
//   }
// }

// export function signInWithGoogle() {
//   const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);
//   firebase.auth().signInWithEmailAndPassword(values.email, values.password).catch(function(error) {
//     console.log(`Error code: ${error.code}, error msg: ${error.message} `);
//   }).then(function() {
//     console.log()
//   });

//   return {
//     type: FETCH_POSTS,
//     payload: request
//   };
// }