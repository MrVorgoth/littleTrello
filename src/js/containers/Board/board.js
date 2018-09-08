import _ from 'lodash';
import React, { Component } from 'react';
import ToDo from './ToDo/to-do';
import Doing from './Doing/doing';
import Done from './Done/done';

export default class Board extends Component {
  constructor(props) {
    super(props);
  }

  firebaseGetData() {
    const db = firebase.firestore();
    db.settings({timestampsInSnapshots: true});
    const todo = db.collection('todo').doc(this.state.email);

    todo.onSnapshot(doc => {
      console.log(doc.data());
      this.setState({ todo: doc.data().todoTasks });
    });
  }

  firebaseSendData() {
    const db = firebase.firestore();
    const todo = db.collection('todo').doc(this.state.email);
    const task = 'make breakfast';
    let arr = this.state.todo;
    (arr.indexOf(task) == -1) ? arr.push(task) : console.log('Task already exists');

    todo.update({ todoTasks: arr });
  }

  render() {
    return (
      <div>
        <ToDo />
        <Doing />
        <Done />
      </div>
    );
  }
}