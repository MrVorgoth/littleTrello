import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';

export default class Parallax extends Component {
  render() {
    return (
      <section className={`parallax ${this.props.quote ? 'parallax-quote' : ''}`}>
        <Fade right fraction={0.4} delay={300}>
          <div className="parallax__description">
            <h2 className="parallax__header">{this.props.header}</h2>
            <p className={`parallax__text ${this.props.quote ? 'parallax__text--italic' : ''}`}>{this.props.text}</p>
          </div>
        </Fade>
      </section>
    );
  }
}