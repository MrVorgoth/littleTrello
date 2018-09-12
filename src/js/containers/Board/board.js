import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Todo from './Todo/todo';
import Doing from './Doing/doing';
import Done from './Done/done';

class Board extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (_.isEmpty(this.props.signInData)) {
      this.props.history.push('/');
    }
  }

  render() {
    if (_.isEmpty(this.props.signInData)) {
      return '';
    }

    return (
      <section className="trello">
        <Todo />
        <Doing />
        <Done />
      </section>
    );
  }
}

function mapStateToProps({ signInData }) {
  return { signInData };
}

export default connect(mapStateToProps)(Board);