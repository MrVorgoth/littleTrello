import React, { Component } from 'react';
import Plan from './plan';

export default class Pricing extends Component {
  render() {
    return (
      <section className="pricing">
        <div className="pricing__header">Business plans</div>
        <div className="pricing__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel aliquam lectus, vel molestie velit. Praesent consectetur, ipsum sit amet porttitor semper, mi nibh tempus risus, a euismod risus tellus et nisl. Mauris ac tellus in lorem sollicitudin euismod.</div>
        <div className="pricing__list">
          <Plan header="Basic" price="Free" delay={500} />
          <Plan header="Standard" price="15$" big delay={300} />
          <Plan header="Advanced" price="30$" delay={500} />
        </div>
      </section>
    );
  }
}