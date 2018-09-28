import React, { Component } from 'react';
import Zoom from 'react-reveal/Zoom';

export default class Plan extends Component {
  render () {
    return (
      <Zoom delay={this.props.delay}>
        <div className={`pricing__list-item ${this.props.big ? 'pricing__list-item--big' : ''}`}>
          <div className={`pricing__list-header ${this.props.big ? 'pricing__list-header--big' : ''}`}>{this.props.header} - {this.props.price}</div>
          <ul className="pricing__list-features">
            <li className="pricing__list-feature">
              <img className="pricing__list-img" alt="Pros" src={require('../../../assets/img/check.svg')} />
              <p className="pricing__list-feature-text">Option 1</p>
            </li>
            <li className="pricing__list-feature">
              <img className="pricing__list-img" alt="Pros" src={require('../../../assets/img/check.svg')} />
              <p className="pricing__list-feature-text">Option 2</p>
            </li>
            <li className="pricing__list-feature">
              <img className="pricing__list-img" alt="Pros" src={require('../../../assets/img/times.svg')} />
              <p className="pricing__list-feature-text">Option 3</p>
            </li>
            <li className="pricing__list-feature">
              <img className="pricing__list-img" alt="Pros" src={require('../../../assets/img/times.svg')} />
              <p className="pricing__list-feature-text">Option 4</p>
            </li>
          </ul>
          <div className={`pricing__purchase ${this.props.big ? 'pricing__purchase-big' : ''}`} >
            <button className="pricing__purchase-button">Purchase</button>
          </div>
        </div>
      </Zoom>
    );
  }
}