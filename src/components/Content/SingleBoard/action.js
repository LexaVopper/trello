import firebase from 'firebase';

export const getBoard = (id) => (dispatch) => {
  firebase
    .database()
    .ref(`db/boards/${id}/`)
    .on('value', function (data) {
      dispatch(getBoardInfo(data.val()));
    });
};

export const getBoardInfo = (page) => ({
  type: 'GET_BOARD',
  payload: page,
});
