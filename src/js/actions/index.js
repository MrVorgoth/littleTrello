import Firebase from 'firebase';

const Boards = new Firebase('https://fbredux.firebaseio.com');

export function fetchPosts() {
  return dispatch => {
    Boards.on('value', snapshot => {
      dispatch({
        type: FETCH_POSTS,
        payload: snapshot.val()
      });
    });
  };
}