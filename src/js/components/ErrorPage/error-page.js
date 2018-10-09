import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ErrorPage extends Component {
  render() {
    return (
      <section className="error-page">
        <img src={require('../../../assets/img/dizzy.svg')} />
        <h1 className="error-page__header">404 Error</h1>
        <p className="error-page__text">Page not found</p>
        <p className="error-page__text">Would you like to return to
          <Link to ='/'>
            <span className="error-page__link">HomePage</span>
          </Link>
        </p>
      </section>
    );
  }
}