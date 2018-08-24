import _ from 'lodash';
import React, { Component } from 'react';

export default class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      todo: []
    };
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then(result => {
        this.setState({email: result.user.email});

        const db = firebase.firestore();
        db.settings({timestampsInSnapshots: true});
        const todo = db.collection('todo').doc(this.state.email);
        todo.onSnapshot(doc => {
          if (_.isEmpty(doc.data())) {
            todo.set( { todoTasks: [] });
          }
          this.firebaseGetData();
        });
      }).catch(error => {
        console.log(error);
      });
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
        <button onClick={this.googleLogin.bind(this)}>Log in</button>
        <button onClick={this.firebaseSendData.bind(this)}>Send data to FireBase</button>
        <div>{this.state.email}</div>
        <div>{this.state.todo}</div>
      </div>
    );
  }
}