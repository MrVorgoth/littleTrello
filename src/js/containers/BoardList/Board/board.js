import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseSendData, firebaseDeleteData } from '../../../firebase';
import Modal from '../../../components/Modal/modal';
import AdvancedEdit from './board-advanced-edit';
import Loading from '../../../components/Loading/loading';

class Board extends Component {
  constructor(props) {
    super(props);

    this.counter = 0;
    this.currentBoard = '';

    this.state = {
      board: this.props.board,
      boardArr: [],
      editTask: { task: '', board: '', tasks: '' },
      modalText: '',
      showAdvancedEdit: false,
      showAdvancedEditPos: { x: 0, y: 0 },
      showModal: false,
      term: '',
      showLoading: true,
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
      if (doc.data() !== undefined) {
        this.setState({ boardArr: doc.data()[boardTasks], showLoading: false });
        // this.setState({ boardArr: doc.data()[boardTasks] });
      }
    });
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
          className="trello__item-advanced-button"
          onClick={(event) => this.createAdvancedEdit(element, this.state.board, this.state.boardArr, event)}
        ></span>
        </p>
      );
    });

    return boardTasks;
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
            onClick={() => { if (this.state.term !== '') {
              firebaseSendData(this.state.term, this.state.board, this.state.boardArr, this.props.authenticationData.email)
            }}}
          >Add task
          </button>
        </div>
      : null;
  }

  updateInput(e) {
    this.setState({ term: e.target.value });
  }

  dragStart(e) {
    e.dataTransfer.setData('target', e.target.getAttribute('item'));
    e.dataTransfer.setData('board', this.state.board);
    e.dataTransfer.setData('boardTasks', this.state.boardArr.join('|'));
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

    if (e.dataTransfer.getData('board') !== this.state.board) {
      firebaseSendData(e.dataTransfer.getData('target'), this.state.board, this.state.boardArr, this.props.authenticationData.email);
      firebaseDeleteData(e.dataTransfer.getData('target'), e.dataTransfer.getData('board'), e.dataTransfer.getData('boardTasks').split('|'), this.props.authenticationData.email);
    }
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

  toggleLoading() {
    this.setState({ showLoading: !this.state.showLoading });
  }

  displayLoading() {
    return (this.state.showLoading)
      ? <Loading />
      : null;
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  displayModal() {
    return (this.state.showModal)
      ? <Modal onCloseRequest={() => this.toggleModal()} text={this.state.modalText} />
      : null;
  }

  mouseLeave() {
    this.setState({ showAdvancedEdit: false });
  }

  mouseDown(e) {
    if (this.state.showModal && !e.target.className.includes('modal__')) {
      this.toggleModal();
    }
    if (this.state.showAdvancedEdit && !e.target.className.includes('trello__item-advanced')) {
      this.toggleAdvancedEdit();
    }
  }

  keyDown(e) {
    if (this.state.showModal && e.keyCode === 27) {
      this.toggleModal();
    }
    if (this.state.showAdvancedEdit && e.keyCode === 27) {
      this.toggleAdvancedEdit();
    }
  }

  createAdvancedEdit(task, board, tasks, event) {
    this.setState({ editTask: { task, board, tasks } });
    this.toggleAdvancedEdit(event);
  }

  toggleAdvancedEdit(event) {
    if (event) {
      let rect = event.target.getBoundingClientRect();
      this.setState({
        showAdvancedEdit: !this.state.showAdvancedEdit,
        showAdvancedEditPos: { x: window.innerWidth - rect.left, y: window.pageYOffset + rect.top - 30 }
      });
    } else {
      this.setState({
        showAdvancedEdit: !this.state.showAdvancedEdit,
        showAdvancedEditPos: { x: 0, y: 0 }
      });
    }
  }

  displayAdvancedEdit() {
    return (this.state.showAdvancedEdit)
      ? <AdvancedEdit editTask={this.state.editTask} boards={this.props.boards} position={this.state.showAdvancedEditPos} />
      : null;
  }

  render() {
    let component = this.renderBoard();
    let input = this.renderInput();
    let modal = this.displayModal();
    let loading = this.displayLoading();
    let advancedEdit = this.displayAdvancedEdit();

    return (
      <div
        tabIndex='0'
        className='trello__board'
        onKeyDown={this.keyDown.bind(this)}
        onMouseDown={this.mouseDown.bind(this)}
        onMouseLeave={this.mouseLeave.bind(this)}
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
        {loading}
        {input}
        {advancedEdit}
      </div>
    );
  }
}

function mapStateToProps({ authenticationData }) {
  return { authenticationData };
}

export default connect(mapStateToProps)(Board);