import firebase from '../../FirebaseApi/fireApi';

export const getColumnsId = (id) => (dispatch, state) => {
  firebase.db.ref(`db/boards/${id}/columns`).on('value', function (data) {
    data.val() &&
      Object.keys(data.val()).map((id) => {
        firebase.db.ref(`db/columns/${id}`).on('value', function (data) {
          dispatch(getBoardColumns(data.val()));
        });
      });
  });
};

export const getBoardColumns = (columns) => ({
  type: 'GET_BOARD_COLUMNS',
  payload: columns,
});

export const clearBoardColumns = (columns) => ({
  type: 'CLEAR_BOARD_COLUMNS',
  payload: [],
});
