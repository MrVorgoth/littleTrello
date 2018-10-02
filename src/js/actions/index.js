import { SIGN_IN, SIGN_OUT } from '../constants';

export function signUserIn(data) {
  return {
    type: SIGN_IN,
    payload: data
  }
}

export function signUserOut() {
  return {
    type: SIGN_OUT
  }
}