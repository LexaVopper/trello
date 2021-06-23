import firebase from 'firebase';

export const getBoard = (id) => (dispatch) => {
  firebase
    .database()
    .ref(`db/boards/${id}/`)
    .on('value', function (data) {
      dispatch(getBoardInfo(data.val(), id));
    });
};

export const getBoardInfo = (page, id) => ({
  type: 'GET_BOARD',
  payload: {
    page: page,
    id: id,
  },
});
