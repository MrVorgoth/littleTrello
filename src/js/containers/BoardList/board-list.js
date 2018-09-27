import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/nav';
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
      <div>
        <Nav transparent={false} />
        <section className="trello">
          <Board board='todo' name="Todo" input />
          <Board board='doing' name="Doing" />
          <Board board='done' name="Done" />
        </section>
      </div>
    );
  }
}

function mapStateToProps({ signInData }) {
  return { signInData };
}

export default connect(mapStateToProps)(BoardList);