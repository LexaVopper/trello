/* eslint-disable no-unused-vars */
import * as _ from 'lodash';
/* eslint-disable no-extend-native */

export const sortByAcs = (list) => {
  return _.orderBy(list, ['position'], ['asc']);
};

export const getTasksAndCut = (column, listTasks) => {
  let taskslist = [];

  if (column.tasksId && listTasks.length !== 0) {
    taskslist = column.tasksId;

    Object.keys(taskslist).forEach((taskId) => {
      taskslist[taskId] = listTasks[taskId];
    });
    taskslist = sortByAcs(taskslist);
  }

  return taskslist;
};

export const createNewListOfTasks = (listOfColumnTasks, listTasks) => {
  const newTasksList = {};
  const reduxTasksList = {};
  listOfColumnTasks.forEach((oneTask, index) => {
    newTasksList[oneTask.id] = {
      id: oneTask.id,
      position: index,
    };
    reduxTasksList[oneTask.id] = {
      ...listTasks[oneTask.id],
      position: index,
    };
  });

  return { newTasksList, reduxTasksList };
};

export const tasksBetweenColomns = (
  fColumnId,
  sColumnId,
  InColumn,
  outColumn,
  listTasks
) => {
  const firstColumn = {};
  const secondColumn = {};
  const newTasksList = {};
  // first column
  InColumn.forEach((oneTask, index) => {
    firstColumn[fColumnId] = {
      ...firstColumn[fColumnId],
      tasksId: {
        ...firstColumn[fColumnId]?.tasksId,
        [oneTask.id]: {
          id: oneTask.id,
          position: index,
        },
      },
    };
    newTasksList[oneTask.id] = {
      ...listTasks[oneTask.id],
      position: index,
    };
  });
  // second column
  outColumn.forEach((oneTask, index) => {
    secondColumn[sColumnId] = {
      ...secondColumn[sColumnId],
      tasksId: {
        ...secondColumn[sColumnId]?.tasksId,
        [oneTask.id]: {
          id: oneTask.id,
          position: index,
        },
      },
    };
    newTasksList[oneTask.id] = {
      ...listTasks[oneTask.id],
      position: index,
    };
  });
  return { firstColumn, secondColumn, newTasksList };
};

export const createNewListOfColumns = (listOfColumns) => {
  const newColumnsList = {};

  listOfColumns.forEach((oneTask, index) => {
    newColumnsList[oneTask.id] = {
      id: oneTask.id,
      position: index,
    };
  });

  return { newColumnsList };
};
