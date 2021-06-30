/* eslint-disable prefer-const */
import firebase from '../../FirebaseApi/fireApi';
import { getEachColomn } from './utils';

export const getBoardColumns = (columns, columnOrders) => ({
  type: 'GET_BOARD_COLUMNS',
  payload: { columns, columnOrders },
});
export const setBoardLoading = () => ({
  type: 'SET_BOARD_LOADING',
});

export const clearBoardColumns = () => ({
  type: 'CLEAR_BOARD_COLUMNS',
});
export const getRerender = (status) => ({
  type: 'GET_RERENDER',
  payload: status,
});

export const changeColomnsPosition = (
  firstColomn,
  secondColomn,
  fPos,
  sPos
) => ({
  type: 'CHANGE_COLOMNS_POSITION',
  payload: { firstColomn, secondColomn, fPos, sPos },
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
    const { objectColumns, columnOrder } = getEachColomn(columns);

    dispatch(getBoardColumns(objectColumns, columnOrder));
  }
};

export const changeColomns =
  (firstColomn, secondColomn, fPos, sPos) => async (dispatch) => {
    firebase.changeColomns(firstColomn, secondColomn, fPos, sPos);
    dispatch(changeColomnsPosition(+firstColomn, +secondColomn, +fPos, +sPos));
  };
