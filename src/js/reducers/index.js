import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import AuthenticationReducer from './reducer_authentication';

const rootReducer = combineReducers({
  form: formReducer,
  authenticationData: AuthenticationReducer
});

export default rootReducer;