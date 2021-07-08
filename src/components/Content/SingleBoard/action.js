/* eslint-disable no-unused-vars */
import firebase from '../../FirebaseApi/fireApi';
import { getEachColomn } from './utils';

export const getBoardInfo = (page, id, columnOrder, colomnTasks) => ({
  type: 'GET_BOARD',
  payload: {
    page,
    id,
    columnOrder,
    colomnTasks,
  },
});

export const setError = () => ({
  type: 'SET_ERROR',
});
export const setLoading = () => ({
  type: 'SET_LOADING',
});
export const getBoardColumns = (columns, columnOrders) => ({
  type: 'GET_BOARD_COLUMNS',
  payload: { columns, columnOrders },
});
export const clearBoardColumns = () => ({
  type: 'CLEAR_BOARD_COLUMNS',
});
export const changeColomnsPosition = (newColumnsList) => ({
  type: 'CHANGE_COLOMNS_POSITION',
  payload: newColumnsList,
});
export const getRerender = (status) => ({
  type: 'GET_RERENDER',
  payload: status,
});
export const changeTasksPosition = (colomnId, tasksList, reduxTasksList) => ({
  type: 'CHANGE_TASKS_POSITION',
  payload: { colomnId, tasksList, reduxTasksList },
});

export const getBoard = (id) => async (dispatch) => {
  dispatch(setLoading());
  const data = await firebase.db.ref(`db/boards/${id}/`).once('value');

  if (data.val()) {
    const { columnOrder, colomnTasks } = getEachColomn(data.val());

    dispatch(getBoardInfo(data.val(), id, columnOrder, colomnTasks));
  } else {
    dispatch(setError());
  }
};

export const changeColomns = (boardId, newColumnsList) => async (dispatch) => {
  firebase.changeColomns(boardId, newColumnsList);
  dispatch(changeColomnsPosition(newColumnsList));
};

export const changeTasks =
  (boardId, colomnId, tasksList, reduxTasksList) => async (dispatch) => {
    firebase.changeTaksInColomn(boardId, tasksList);
    dispatch(changeTasksPosition(colomnId, tasksList, reduxTasksList));
  };
