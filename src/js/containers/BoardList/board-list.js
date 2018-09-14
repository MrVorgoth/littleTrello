import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Board from './Board/board';

class BoardList extends Component {
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
        <Board board='todo' name="Todo" />
        <Board board='doing' name="Doing" />
        <Board board='done' name="Done" />
      </section>
    );
  }
}

function mapStateToProps({ signInData }) {
  return { signInData };
}

export default connect(mapStateToProps)(BoardList);