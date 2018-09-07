import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import SignInReducer from './reducer_signIn';

const rootReducer = combineReducers({
  form: formReducer,
  signInData: SignInReducer
});

export default rootReducer;