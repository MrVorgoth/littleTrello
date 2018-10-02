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
      term: '',
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
    const collection = db.collection(this.state.board).doc(this.props.authenticationData.email);
    let boardTasks = this.state.board + 'Tasks';

    collection.onSnapshot(doc => {
      this.setState({ boardArr: doc.data()[boardTasks] });
    });
  }

  firebaseSendData(task) {
    const db = firebase.firestore();
    const collection = db.collection(this.state.board).doc(this.props.authenticationData.email);
    let boardTasks = this.state.board + 'Tasks';
    let arr = this.state.boardArr;
    (arr.indexOf(task) == -1) ? arr.push(task) : console.log('Task already exists');

    collection.update({ [boardTasks]: arr });
  }

  firebaseDeleteData(task, board, boardTasks) {
    const db = firebase.firestore();
    const collection = db.collection(board).doc(this.props.authenticationData.email);
    let boardTasksName = board + 'Tasks';
    let arr = (typeof(boardTasks) == 'string') ? boardTasks.split(',') : boardTasks;
    (arr.indexOf(task) > -1) ? arr.splice(arr.indexOf(task), 1) : console.log('Task doesnt exist');

    collection.update({ [boardTasksName]: arr });
  }

  deleteData(e) {
    this.firebaseDeleteData(e.target.getAttribute('item'), this.state.board, this.state.boardArr);
  }

  renderBoard() {
    if (_.isEmpty(this.state.boardArr)) {
      return;
    }

    let boardTasks = this.state.boardArr.map((element, index) => {
      return (
        <p
          className="trello__item"
          key={index}
          item={element}
          draggable
          onDragStart={this.dragStart.bind(this)}
        >{element}
          <span
            item={element}
            onClick={this.deleteData.bind(this)}
            className="trello__item-delete"
          >x
          </span>
        </p>
      );
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
    if (board !== this.state.board) {
      this.firebaseSendData(task);
      this.firebaseDeleteData(task, board, boardTasks);
    } else {
      // this.setState({ modalText: 'You can\'t put task to the same board', showModal: true });
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

  mouseDown(e) {
    if (this.state.showModal && !e.target.className.includes('modal__')) {
      this.handleToggleModal();
    }
  }

  keyDown(e) {
    if (this.state.showModal && e.keyCode === 27) {
      this.handleToggleModal();
    }
  }

  renderInput() {
    return (this.props.input)
      ? <div className='trello__input-container'>
          <input
            className='trello__input'
            type="text"
            value={this.state.term}
            onChange={this.updateInput.bind(this)}
          />
          <button
            className='trello__button'
            onClick={() => this.firebaseSendData(this.state.term)}
          >Add task
          </button>
        </div>
      : null;
  }

  updateInput(e) {
    this.setState({ term: e.target.value });
  }

  render() {
    let component = this.renderBoard();
    let input = this.renderInput();
    let modal = this.displayModal();

    return (
      <div
        tabIndex='0'
        onKeyDown={this.keyDown.bind(this)}
        onMouseDown={this.mouseDown.bind(this)}
        className='trello__board'
        onDrop={this.drop.bind(this)}
        onDragOver={this.dragOver.bind(this)}
        onDragEnter={this.dragEnter.bind(this)}
        onDragLeave={this.dragLeave.bind(this)}
      >
        <h1 className='trello__header'>
          <span className='trello__header--border'>{this.props.name}</span>
        </h1>
        <div className='trello__list'>
          {component}
          <p
            ref='placeholder'
            className='trello__item trello__placeholder trello__placeholder--hidden'
          >Place task here
          </p>
        </div>
        {modal}
        {input}
      </div>
    );
  }
}

function mapStateToProps({ authenticationData }) {
  return { authenticationData };
}

export default connect(mapStateToProps)(Board);