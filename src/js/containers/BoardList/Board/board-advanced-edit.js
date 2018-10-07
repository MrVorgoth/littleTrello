import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseSendData, firebaseDeleteData } from '../../../firebase';

class AdvancedEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      destinationBoard: this.props.editTask.board,
      shouldHide: true
    }
  }

  componentDidMount() {
    if (this.state.shouldHide) {
      this.setState({ shouldHide: false });
    }
  }

  moveItem() {
    if (_.isEmpty(this.props.editTask.task) || this.props.editTask.board === this.state.destinationBoard) {
      return;
    }

    const db = firebase.firestore();
    db.settings({timestampsInSnapshots: true});
    const collection = db.collection(this.state.destinationBoard).doc(this.props.authenticationData.email);

    let tasksData;

    collection.get().then(doc => {
      if (!_.isEmpty(doc.data())) {
        tasksData = doc.data()[this.state.destinationBoard + 'Tasks'];
        firebaseDeleteData(this.props.editTask.task, this.props.editTask.board, this.props.editTask.tasks, this.props.authenticationData.email);
      }
    }).then(() => {
      firebaseSendData(this.props.editTask.task, this.state.destinationBoard, tasksData, this.props.authenticationData.email);
    });

    this.setState({ shouldHide: true });
  }

  renderEditOptions() {
    const editOptions = this.props.boards.map((element, index) => {
      return (
        <option
          key={index}
          value={element.toLowerCase()}
        >{element}
        </option>
      );
    });

    return editOptions;
  }

  render() {
    const editOptions = this.renderEditOptions();

    return (
      <div
        className={`trello__item-advanced-container ${this.state.shouldHide ? 'trello__item-advanced-container--hidden' : ''}`}
        style={{top: this.props.position.y, right: this.props.position.x}}
      >
        <div className="trello__item-advanced-option">Move task to
          <select
            defaultValue={this.props.editTask.board}
            className="trello__item-advanced-select"
            onChange={(e) => this.setState({ destinationBoard: e.target.value })}
          >{editOptions}
          </select>
          <button
            className="trello__button trello__item-advanced-option"
            onClick={this.moveItem.bind(this)}
          >Move
          </button>
        </div>
        <div className="trello__item-advanced-option">Delete task
          <button
            className="trello__button trello__item-advanced-option"
            onClick={() => { firebaseDeleteData(this.props.editTask.task, this.props.editTask.board, this.props.editTask.tasks, this.props.authenticationData.email); this.setState({ shouldHide: true }); }}
          >Delete
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authenticationData }) {
  return { authenticationData };
}

export default connect(mapStateToProps)(AdvancedEdit);