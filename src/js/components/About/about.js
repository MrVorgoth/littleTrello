import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';

export default class About extends Component {
  render() {
    return (
      <section className="about">
        <div className="about__text-container">
          <h2 className="about__header">Features</h2>
          <p className="about__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel aliquam lectus, vel molestie velit. Praesent consectetur, ipsum sit amet porttitor semper, mi nibh tempus risus, a euismod risus tellus et nisl. Mauris ac tellus in lorem sollicitudin euismod.</p>
        </div>
        <div className="about__tiles">
          <Fade bottom fraction={0.5} delay={300}>
            <div className="about__tile">
              <img className="about__tile-icon" src={require('../../../assets/img/tasks.svg')} />
              <div className="about__tile-header">Manage tasks</div>
              <div className="about__tile-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
            </div>
          </Fade>
          <Fade bottom fraction={0.5} delay={500}>
            <div className="about__tile">
              <img className="about__tile-icon" src={require('../../../assets/img/hourglass-start.svg')} />
              <div className="about__tile-header">Save time</div>
              <div className="about__tile-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
            </div>
          </Fade>
          <Fade bottom fraction={0.5} delay={700}>
            <div className="about__tile">
              <img className="about__tile-icon" src={require('../../../assets/img/wrench.svg')} />
              <div className="about__tile-header">Maintance</div>
              <div className="about__tile-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
            </div>
          </Fade>
        </div>
      </section>
    );
  }
}