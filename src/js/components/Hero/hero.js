import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Fade from 'react-reveal/Fade';

export default class Hero extends Component {
  render() {
    return (
      <section className="hero">
        <div className="hero__text-container">
          <h2 className="hero__header">Little Trello</h2>
          <p className="hero__text">Built to help you organise your tasks</p>
          <Link to ='/sign'>
            <Fade bottom delay={200}>
              <button className="hero__button hero__button-start"><span className="hero__button-text">Get started</span></button>
            </Fade>
          </Link>
          <Fade bottom delay={400}>
            <button className="hero__button hero__button-learn">Learn more</button>
          </Fade>
        </div>
      </section>
    );
  }
}