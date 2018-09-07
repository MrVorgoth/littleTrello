import { SIGN_IN, SIGN_OUT } from '../constants';

export default function(state = {}, action) {
  switch (action.type) {
    case SIGN_IN:
      return action.payload;
    case SIGN_OUT:
      return action.payload;
    default:
      return state;
  }
}