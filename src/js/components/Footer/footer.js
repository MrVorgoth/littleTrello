import React, { Component } from 'react';

export default class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="footer__social-list">
          <div className="footer__social-item">
            <img className="about__tile-icon" alt="Twitter" src={require('../../../assets/img/twitter.svg')} />
          </div>
          <div className="footer__social-item">
          <img className="about__tile-icon" alt="Instagram" src={require('../../../assets/img/instagram.svg')} />
          </div>
          <div className="footer__social-item">
          <img className="about__tile-icon" alt="Facebook" src={require('../../../assets/img/facebook.svg')} />
          </div>
          <div className="footer__social-item">
          <img className="about__tile-icon" alt="Google+" src={require('../../../assets/img/google-plus.svg')} />
          </div>
        </div>
        <p className="footer__text">&copy; Little Trello made by <span className="footer__author">Łukasz Królak</span></p>
      </footer>
    );
  }
}