import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/nav';
import Board from './Board/board';

class BoardList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (_.isEmpty(this.props.authenticationData)) {
      return null;
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

function mapStateToProps({ authenticationData }) {
  return { authenticationData };
}

export default connect(mapStateToProps)(BoardList);