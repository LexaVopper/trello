/* eslint-disable no-unused-vars */
import firebase from '../../FirebaseApi/fireApi';
import { getEachColomn } from './utils';

export const getBoardInfo = (page, id, columnOrder) => ({
  type: 'GET_BOARD',
  payload: {
    page,
    id,
    columnOrder,
  },
});

export const setError = () => ({
  type: 'SET_ERROR',
});
export const setLoading = () => ({
  type: 'SET_LOADING',
});

export const clearBoardColumns = () => ({
  type: 'CLEAR_BOARD_COLUMNS',
});
export const changeColomnsPosition = (newColumnsList) => ({
  type: 'CHANGE_COLOMNS_POSITION',
  payload: newColumnsList,
});

export const changeTasksPosition = (colomnId, tasksList, reduxTasksList) => ({
  type: 'CHANGE_TASKS_POSITION',
  payload: { colomnId, tasksList, reduxTasksList },
});

export const changeTasksPositionBetweenCol = (
  fColumnId,
  sColumnId,
  fromColumn,
  toColumn,
  allTasksList
) => ({
  type: 'CHANGE_TASKS_POSITION_BETWEEN',
  payload: { fColumnId, sColumnId, fromColumn, toColumn, allTasksList },
});

export const getBoard = (id) => async (dispatch) => {
  dispatch(setLoading());
  const data = await firebase.db.ref(`db/boards/${id}/`).once('value');

  if (data.val()) {
    const { columnOrder } = getEachColomn(data.val());

    dispatch(getBoardInfo(data.val(), id, columnOrder));
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
    firebase.changeTaskInBoard(boardId, tasksList);
    dispatch(changeTasksPosition(colomnId, tasksList, reduxTasksList));
  };

export const changeTasksBetweenColumns =
  (boardId, fColumnId, sColumnId, fromColumn, toColumn, allTasksList) =>
  async (dispatch) => {
    firebase.changeTaksBetweenBoards(
      boardId,
      allTasksList,
      fColumnId,
      sColumnId,
      fromColumn[fColumnId],
      toColumn[sColumnId]
    );
    dispatch(
      changeTasksPositionBetweenCol(
        fColumnId,
        sColumnId,
        fromColumn,
        toColumn,
        allTasksList
      )
    );
  };

export const addColumn = (newColumn, newColumnOrder) => ({
  type: 'ADD_NEW_COLUMN',
  payload: { newColumn, newColumnOrder },
});

export const addTask = (newTask, newColumnTask, colomnId) => ({
  type: 'ADD_NEW_TASK',
  payload: { newTask, newColumnTask, colomnId },
});

export const addTaskDescription = (taskId, newDescription) => ({
  type: 'ADD_DESCRIPTION',
  payload: { taskId, newDescription },
});

export const addCheck = (checkId, checkTitle, taskId) => ({
  type: 'ADD_CHECK',
  payload: { checkId, checkTitle, taskId },
});
export const copyCheck = (checkId, check, taskId) => ({
  type: 'COPY_CHECK',
  payload: { checkId, check, taskId },
});

export const changeTaskTitle = (taskId, newTitle) => ({
  type: 'CHANGE_TASK',
  payload: { taskId, newTitle },
});

export const createTagRedux = (colorTag, titleTag, tagId) => ({
  type: 'CREATE_TAG',
  payload: { colorTag, titleTag, tagId },
});

export const createTags =
  (boardId, colorTag, titleTag, tagId) => async (dispatch) => {
    firebase.createTag(boardId, colorTag, titleTag, tagId);
    dispatch(createTagRedux(colorTag, titleTag, tagId));
  };

export const tieTagWithTask = (taskId, tagId) => ({
  type: 'TIE_TAG_WITH_TASK',
  payload: { taskId, tagId },
});
