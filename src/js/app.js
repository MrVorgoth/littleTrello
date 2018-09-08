import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';
import reducers from './reducers';

import HomePage from './containers/HomePage/home-page';
import Nav from './containers/Nav/nav';
import Footer from './components/Footer/footer';
import Authentication from './containers/Authentication/authentication';
import Board from './containers/Board/board';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Nav />
          <Switch>
            <Route path="/board" component={Board} />
            <Route path="/sign" component={Authentication} />
            <Route path="" component={HomePage} />
          </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  </Provider>
  , document.getElementById('react-root'));