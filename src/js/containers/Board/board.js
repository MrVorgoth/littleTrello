import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ToDo from './ToDo/to-do';
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
      <div>
        <ToDo />
        <Doing />
        <Done />
      </div>
    );
  }
}

function mapStateToProps({ signInData }) {
  return { signInData };
}

export default connect(mapStateToProps)(Board);