import firebase from '../../FirebaseApi/fireApi';

export const getBoardColumns = (columns) => ({
  type: 'GET_BOARD_COLUMNS',
  payload: columns,
});

export const getColumnsId = (id) => (dispatch) => {
  firebase.db.ref(`db/boards/${id}/columns`).on('value', (data) => {
    if (data.val()) {
      Object.keys(data.val()).map((columnId) =>
        firebase.db.ref(`db/columns/${columnId}`).on('value', (column) => {
          dispatch(getBoardColumns(column.val()));
        })
      );
    }
  });
};

export const clearBoardColumns = () => ({
  type: 'CLEAR_BOARD_COLUMNS',
  payload: [],
});
