import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';
import Tile from './about-tile';

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
            <Tile
              img = 'tasks'
              header ='Manage tasks'
              text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            />
          </Fade>
          <Fade bottom fraction={0.5} delay={500}>
            <Tile
              img = 'hourglass-start'
              header ='Save time'
              text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            />
          </Fade>
          <Fade bottom fraction={0.5} delay={700}>
            <Tile
              img = 'wrench'
              header ='Maintance'
              text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            />
          </Fade>
        </div>
      </section>
    );
  }
}