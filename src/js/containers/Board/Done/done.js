import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Done extends Component {
  constructor(props) {
    super(props);

    this.counter = 0;

    this.state = {
      doneArr: [],
      board: 'done'
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

  renderDone() {
    if (_.isEmpty(this.state.doneArr)) {
      return;
    }

    let doneTasks = this.state.doneArr.map((element, index) => {
      return <p className="trello__item" key={index} item={element} draggable onDragStart={this.dragStart.bind(this)}>{element}</p>;
    });

    return doneTasks;
  }

  dragStart(e) {
    e.dataTransfer.setData('target', e.target.getAttribute('item'));
    e.dataTransfer.setData('board', this.state.board);
    e.dataTransfer.setData('boardTasks', this.state.doneArr);
  }

  dragOver(e) {
    e.preventDefault();
    this.refs.test.classList.add('trello__item--active');
    this.refs.test.classList.remove('trello__item--hidden');
  }

  dragEnter() {
    this.counter++;
  }

  dragLeave() {
    this.counter--;

    if (this.counter === 0) {
      this.refs.test.classList.add('trello__item--hidden');
      this.refs.test.classList.remove('trello__item--active');
    }
  }

  drop(e) {
    e.preventDefault();
    this.counter = 0;
    this.refs.test.classList.add('trello__item--hidden');
    this.refs.test.classList.remove('trello__item--active');
    const task = e.dataTransfer.getData('target');
    const board = e.dataTransfer.getData('board');
    const boardTasks = e.dataTransfer.getData('boardTasks');
    if (board === this.state.board) {
      console.log('Add error modal');
    } else {
      this.firebaseSendData(task);
      this.firebaseDeleteData(task, board, boardTasks);
    }
  }

  render() {
    let component = this.renderDone();

    return (
      <div className='trello__board' onDrop={this.drop.bind(this)} onDragOver={this.dragOver.bind(this)} onDragEnter={this.dragEnter.bind(this)} onDragLeave={this.dragLeave.bind(this)}>
        <h1 className='trello__header'><span className='trello__header--border'>Done</span></h1>
        <div className='trello__list'>
          {component}
          <p ref="test" className='trello__item trello__item--hidden'>Place task here</p>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ signInData }) {
  return { signInData };
}

export default connect(mapStateToProps)(Done);