import React, { Component } from 'react';
import { Link as ScrollLink, Element, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';
import Hero from '../Hero/hero';
import About from '../About/about';
import Parallax from '../Parallax/parallax';
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
        <Nav displayHomeItems transparent={this.state.transparent} />
        <Element name="hero">
          <Hero />
        </Element>
        <Element name="about">
          <About />
        </Element>
        <Parallax />
        <Element name="about">
          <About />
        </Element>
      </div>
    );
  }
}