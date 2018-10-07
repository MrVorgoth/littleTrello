export function firebaseSendData(task, board, boardTasks, email) {
  const db = firebase.firestore();
  const collection = db.collection(board).doc(email);

  let arr = boardTasks;
  if (arr.indexOf(task) == -1) {
    arr.push(task);
    collection.update({ [board + 'Tasks']: arr });
  }
}

export function firebaseDeleteData(task, board, boardTasks, email) {
  const db = firebase.firestore();
  const collection = db.collection(board).doc(email);
  
  let arr = boardTasks;
  if (arr.indexOf(task) > -1) {
    arr.splice(arr.indexOf(task), 1)
    collection.update({ [board + 'Tasks']: arr });
  }
}