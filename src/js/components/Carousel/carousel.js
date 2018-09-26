import React, { Component } from 'react';

export default class Carousel extends Component {
  render() {
    return (
      <section className="carousel">
        <div className="carousel__description">
          <h2 className="carousel__header">"Little Trello is awesome"</h2>
          <p className="carousel__author">John Doe, Facebook</p>
        </div>
        <div className="carousel__description">
          <h2 className="carousel__header">"Little Trello is great"</h2>
          <p className="carousel__author">John Doe, Twitter</p>
        </div>
        <div className="carousel__description">
          <h2 className="carousel__header">"Little Trello is superb"</h2>
          <p className="carousel__author">John Doe, Facebook</p>
        </div>
        <div className="carousel__indicators">
          <div className="carousel__indicator">1</div>
          <div className="carousel__indicator">2</div>
          <div className="carousel__indicator">3</div>
        </div>
      </section>
    );
  }
}