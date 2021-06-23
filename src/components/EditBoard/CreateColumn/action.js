import firebase from '../../FirebaseApi/fireApi';

export const getColumnsId = (id) => (dispatch) => {
  firebase.db.ref(`db/boards/${id}/columns`).on('value', function (data) {
    //dispatch(getUserInfo(data.val()));
    Object.keys(data.val()).map((id) => {
      firebase.db.ref(`db/columns/${id}`).on('value', function (data) {
        dispatch(getBoardColumns(data.val()));
      });
    });
  });
};

const getBoardColumns = (columns) => ({
  type: 'GET_BOARD_COLUMNS',
  payload: columns,
});
