import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';
import reducers from './reducers';

import HomePage from './components/HomePage/home-page';
import Footer from './components/Footer/footer';
import Authentication from './containers/Authentication/authentication';
import BoardList from './containers/BoardList/board-list';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/board" component={BoardList} />
          <Route path="/sign" component={Authentication} />
          <Route path="" component={HomePage} />
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  </Provider>
  , document.getElementById('react-root'));