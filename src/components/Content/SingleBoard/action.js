import firebase from 'firebase';

export const getBoardInfo = (page, id) => ({
  type: 'GET_BOARD',
  payload: {
    page,
    id,
  },
});

export const getBoard = (id) => (dispatch) => {
  firebase
    .database()
    .ref(`db/boards/${id}/`)
    .on('value', (data) => {
      dispatch(getBoardInfo(data.val(), id));
    });
};
