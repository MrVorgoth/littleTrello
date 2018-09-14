import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from '../../../components/Modal/modal';

class Board extends Component {
  constructor(props) {
    super(props);

    this.counter = 0;
    this.currentBoard = '';

    this.state = {
      board: this.props.board,
      boardArr: [],
      modalText: '',
      showModal: false
    };
  }

  componentDidMount() {
    this.firebaseGetData();
  }

  componentDidUpdate() {
    this.currentBoard = '';
  }

  firebaseGetData() {
    const db = firebase.firestore();
    db.settings({timestampsInSnapshots: true});
    const collection = db.collection(this.state.board).doc(this.props.signInData.email);
    let boardTasks = this.state.board + 'Tasks';

    collection.onSnapshot(doc => {
      this.setState({ boardArr: doc.data()[boardTasks] });
    });
  }

  firebaseSendData(task) {
    const db = firebase.firestore();
    const collection = db.collection(this.state.board).doc(this.props.signInData.email);
    let boardTasks = this.state.board + 'Tasks';
    let arr = this.state.boardArr;
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

  renderBoard() {
    if (_.isEmpty(this.state.boardArr)) {
      return;
    }

    let boardTasks = this.state.boardArr.map((element, index) => {
      return <p className="trello__item" key={index} item={element} draggable onDragStart={this.dragStart.bind(this)}>{element}</p>;
    });

    return boardTasks;
  }

  togglePlaceholder(displayPlaceholder) {
    if (displayPlaceholder && (this.currentBoard !== this.state.board)) {
      this.refs.placeholder.classList.add('trello__placeholder--active');
      this.refs.placeholder.classList.remove('trello__placeholder--hidden');
    } else {
      this.refs.placeholder.classList.add('trello__placeholder--hidden');
      this.refs.placeholder.classList.remove('trello__placeholder--active');
    }
  }

  dragStart(e) {
    e.dataTransfer.setData('target', e.target.getAttribute('item'));
    e.dataTransfer.setData('board', this.state.board);
    e.dataTransfer.setData('boardTasks', this.state.boardArr);
    this.currentBoard = this.state.board;
  }

  dragOver(e) {
    e.preventDefault();
  }

  dragEnter() {
    this.counter++;
    this.togglePlaceholder(true);
  }

  dragLeave() {
    this.counter--;

    if (this.counter === 0) {
      this.togglePlaceholder(false);
    }
  }

  drop(e) {
    e.preventDefault();
    this.counter = 0;
    this.togglePlaceholder(false);

    const task = e.dataTransfer.getData('target');
    const board = e.dataTransfer.getData('board');
    const boardTasks = e.dataTransfer.getData('boardTasks');
    if (board === this.state.board) {
      this.setState({ modalText: 'You can\'t put task to the same board', showModal: true });
    } else {
      this.firebaseSendData(task);
      this.firebaseDeleteData(task, board, boardTasks);
    }
  }

  handleToggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  displayModal() {
    return (this.state.showModal)
      ? <Modal onCloseRequest={() => this.handleToggleModal()} text={this.state.modalText} />
      : null;
  }

  render() {
    let component = this.renderBoard();
    let modal = this.displayModal();

    return (
      <div className='trello__board' onDrop={this.drop.bind(this)} onDragOver={this.dragOver.bind(this)} onDragEnter={this.dragEnter.bind(this)} onDragLeave={this.dragLeave.bind(this)}>
        <h1 className='trello__header'><span className='trello__header--border'>{this.props.name}</span></h1>
        <div className='trello__list'>
          {component}
          <p ref="placeholder" className='trello__item trello__placeholder trello__placeholder--hidden'>Place task here</p>
        </div>
        {modal}
      </div>
    );
  }
}

function mapStateToProps({ signInData }) {
  return { signInData };
}

export default connect(mapStateToProps)(Board);