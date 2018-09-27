import React, { Component } from 'react';
import Hero from '../Hero/hero';
import About from '../About/about';
import Parallax from '../Parallax/parallax';
import Pricing from '../Pricing/pricing';
import Nav from '../../containers/Nav/nav';

export default class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      transparent: true
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll.bind(this));
  }

  handleScroll(e) {
    if (window.scrollY > 100) {
      if (this.state.transparent == true) {
        this.setState({ transparent: false });
      }
    } else {
      if (this.state.transparent == false) {
        this.setState({ transparent: true });
      }
    }
  }

  render() {
    return (
      <div>
        <Nav transparent={this.state.transparent} />
        <Hero />
        <About />
        <Parallax header='"Little Trello is awesome"' text="John Doe, Facebook" quote />
        <Pricing />
        <Parallax header="Start using Little Trello today!" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel aliquam lectus, vel molestie velit. Praesent consectetur, ipsum sit amet porttitor semper, mi nibh tempus risus, a euismod risus tellus et nisl. Mauris ac tellus in lorem sollicitudin euismod." />
      </div>
    );
  }
}