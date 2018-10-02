import React from 'react';

export default (props) => {
  return (
    <div className="about__tile">
      <img className="about__tile-icon" src={require(`../../../assets/img/${props.img}.svg`)} />
      <div className="about__tile-header">{props.header}</div>
      <div className="about__tile-text">{props.text}</div>
    </div>
  );
}