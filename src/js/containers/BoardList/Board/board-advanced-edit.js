import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class AdvancedEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      destinationBoard: 'todo',
    }
  }

  moveItem() {
    if (_.isEmpty(this.props.editTask.task) || this.props.editTask.board === this.state.destinationBoard) {
      return;
    }

    const db = firebase.firestore();
    db.settings({timestampsInSnapshots: true});
    const collection = db.collection(this.state.destinationBoard).doc(this.props.authenticationData.email);
    let boardTasks = this.state.destinationBoard + 'Tasks';
    let tasksData;

    collection.get().then(doc => {
      // console.log('UNDEFINED check with lodash isEmpty or smth');
      if (doc.data() !== undefined) {
        tasksData = doc.data()[boardTasks];
        this.firebaseDeleteData(this.props.editTask.task, this.props.editTask.board, this.props.editTask.tasks);
      }
    }).then(() => {
      this.firebaseSendData(this.props.editTask.task, this.state.destinationBoard, tasksData);
    });
  }

  firebaseSendData(task, board, boardTasks) {
    const db = firebase.firestore();
    const collection = db.collection(board).doc(this.props.authenticationData.email);
    let boardTasksName = board + 'Tasks';
    let arr = boardTasks;
    (arr.indexOf(task) == -1) ? arr.push(task) : console.log('Task already exists');

    collection.update({ [boardTasksName]: arr });
  }

  firebaseDeleteData(task, board, boardTasks) {
    const db = firebase.firestore();
    const collection = db.collection(board).doc(this.props.authenticationData.email);
    let boardTasksName = board + 'Tasks';
    let arr = boardTasks;
    (arr.indexOf(task) > -1) ? arr.splice(arr.indexOf(task), 1) : console.log('Task doesnt exist');

    collection.update({ [boardTasksName]: arr });
  }

  renderEditOptions() {
    // console.log('dobrac selected od aktualnej tablicy');
    return (
      <React.Fragment>
        <option value="todo">todo</option>
        <option value="doing">doing</option>
        <option value="done">done</option>
      </React.Fragment>
    );
  }

  render() {
    const editOptions = this.renderEditOptions();

    return (
      <div className="trello__item-advanced-container">
        <div className="trello__item-advanced-option">Move to
          <select className="trello__item-advanced-select" onChange={(e) => this.setState({ destinationBoard: e.target.value })}>
            {editOptions}
          </select>
          <button className="trello__item-advanced-option" onClick={this.moveItem.bind(this)}>Move</button>
        </div>
        <button className="trello__item-advanced-option">Delete item</button>
      </div>
    );
  }
}

function mapStateToProps({ authenticationData }) {
  return { authenticationData };
}

export default connect(mapStateToProps)(AdvancedEdit);