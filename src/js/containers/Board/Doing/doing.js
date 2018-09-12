import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseGetData, firebaseSendData, firebaseDeleteData } from '../firebase';

class Doing extends Component {
  constructor(props) {
    super(props);

    this.counter = 0;

    this.state = {
      doingArr: [],
      board: 'doing'
    };
  }

  componentDidMount() {
    this.firebaseGetData();
  }

  firebaseGetData() {
    const db = firebase.firestore();
    db.settings({timestampsInSnapshots: true});
    const collection = db.collection(this.state.board).doc(this.props.signInData.email);
    const boardArr = this.state.board + 'Arr';
    const boardTasks = this.state.board + 'Tasks';

    collection.onSnapshot(doc => {
      this.setState({ [boardArr]: doc.data()[boardTasks] });
    });
  }

  firebaseSendData(task) {
    const db = firebase.firestore();
    const collection = db.collection(this.state.board).doc(this.props.signInData.email);
    let boardArr = this.state.board + 'Arr';
    let boardTasks = this.state.board + 'Tasks';
    let arr = this.state[boardArr];
    (arr.indexOf(task) == -1) ? arr.push(task) : console.log('Task already exists');

    collection.update({ [boardTasks]: arr });
  }

  firebaseDeleteData(task, board, boardTasks) {
    const db = firebase.firestore();
    const collection = db.collection(board).doc(this.props.signInData.email);
    let boardTasksName = board + 'Tasks';
    let arr = boardTasks.split(',');
    (arr.indexOf(task) > -1) ? arr.splice(arr.indexOf(task), 1) : console.log('Task doesnt exist');

    collection.update({ [boardTasksName]: arr });
  }

  renderDoing() {
    if (_.isEmpty(this.state.doingArr)) {
      return;
    }

    let doingTasks = this.state.doingArr.map((element, index) => {
      return <p className="trello__item" key={index} item={element} draggable onDragStart={this.drag.bind(this)}>{element}</p>;
    });

    return doingTasks;
  }

  drag(e) {
    e.dataTransfer.setData('target', e.target.getAttribute('item'));
    e.dataTransfer.setData('board', this.state.board);
    e.dataTransfer.setData('boardTasks', this.state.doingArr);
  }

  allowDrop(e) {
    e.preventDefault();
  }

  drop(e) {
    e.preventDefault();
    const task = e.dataTransfer.getData('target');
    const board = e.dataTransfer.getData('board');
    const boardTasks = e.dataTransfer.getData('boardTasks');
    this.firebaseSendData(task);
    this.firebaseDeleteData(task, board, boardTasks);
  }

  render() {
    let component = this.renderDoing();

    return (
      <div className='trello__board'>
        <h1 className='trello__header'><span className='trello__header--border'>Doing</span></h1>
        <div className='trello__list' onDrop={this.drop.bind(this)} onDragOver={this.allowDrop.bind(this)}>
          {component}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ signInData }) {
  return { signInData };
}

export default connect(mapStateToProps)(Doing);