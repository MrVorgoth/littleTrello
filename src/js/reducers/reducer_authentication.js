import { SIGN_IN, SIGN_OUT } from '../constants';

const initialState = {
  email: '',
  name: '',
  surname: '',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN:
      const { email, name, surname } = action.payload;
      return { ...state, name, surname, email };
    case SIGN_OUT:
      return initialState;
    default:
      return state;
  }
}