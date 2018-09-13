import React, { Component } from 'react';

export default class Modal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='modal'>
        <div className="modal__content">
          <span className="modal__close" onClick={this.props.onCloseRequest}>&times;</span>
          <p className="modal__text">{this.props.text}</p>
        </div>
      </div>
    );
  }
}