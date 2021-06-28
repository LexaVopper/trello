/* eslint-disable prefer-const */
import firebase from '../../FirebaseApi/fireApi';
import { getEcheColomn } from './utils';

export const getBoardColumns = (columns, columnOrders) => ({
  type: 'GET_BOARD_COLUMNS',
  payload: { columns, columnOrders },
});
export const setBoardLoading = () => ({
  type: 'SET_BOARD_LOADING',
});

const createFetch = (id) => firebase.db.ref(`db/columns/${id}`).once('value');

export const getColumnsId = (id) => async (dispatch) => {
  dispatch(setBoardLoading());
  const data = await firebase.db.ref(`db/boards/${id}/columns`).once('value');
  if (data.val()) {
    const fetches = Object.keys(data.val()).map((columnId) =>
      createFetch(columnId)
    );
    const columns = await Promise.all(fetches);
    const { objectColumns, columnOrder } = getEcheColomn(columns);

    dispatch(getBoardColumns(objectColumns, columnOrder));
  }
};

export const clearBoardColumns = () => ({
  type: 'CLEAR_BOARD_COLUMNS',
  payload: [],
});
