export function firebaseGetData() {
  const db = firebase.firestore();
  db.settings({timestampsInSnapshots: true});
  const collection = db.collection(this.state.board).doc(this.props.signInData.email);
  const boardArr = this.state.board + 'Arr';
  const boardTasks = this.state.board + 'Tasks';

  collection.onSnapshot(doc => {
    this.setState({ [boardArr]: doc.data()[boardTasks] });
  });
}

export function firebaseSendData(task) {
  const db = firebase.firestore();
  const collection = db.collection(this.state.board).doc(this.props.signInData.email);
  let boardArr = this.state.board + 'Arr';
  let boardTasks = this.state.board + 'Tasks';
  let arr = this.state[boardArr];
  (arr.indexOf(task) == -1) ? arr.push(task) : console.log('Task already exists');

  collection.update({ [boardTasks]: arr });
}

export function firebaseDeleteData(task, board, boardTasks) {
  const db = firebase.firestore();
  const collection = db.collection(board).doc(this.props.signInData.email);
  let boardTasksName = board + 'Tasks';
  let arr = boardTasks.split(',');
  (arr.indexOf(task) > -1) ? arr.splice(arr.indexOf(task), 1) : console.log('Task doesnt exist');

  collection.update({ [boardTasksName]: arr });
}