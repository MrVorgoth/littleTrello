import React, { Component } from 'react';
import Nav from '../../containers/Nav/nav';
import Hero from '../Hero/hero';
import About from '../About/about';
import Parallax from '../Parallax/parallax';
import Pricing from '../Pricing/pricing';
import Footer from '../Footer/footer';

export default class HomePage extends Component {
  constructor(props) {
    super(props);

    this.unmounted = true;

    this.state = {
      transparent: true
    };
  }

  componentDidMount() {
    this.unmounted = false;
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  componentWillUnmount() {
    this.unmounted = true;
    window.removeEventListener('scroll', this.handleScroll.bind(this));
  }

  handleScroll() {
    if (this.unmounted) {
      return;
    }

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
        <Footer />
      </div>
    );
  }
}