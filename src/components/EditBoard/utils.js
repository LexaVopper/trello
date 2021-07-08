/* eslint-disable no-unused-vars */
import * as _ from 'lodash';
/* eslint-disable no-extend-native */

export const sortByAcs = (list) => {
  return _.orderBy(list, ['position'], ['asc']);
};

export const getTasksAndSort = (column, listTasks) => {
  let tasks = [];

  if (column.tasksId && listTasks.length !== 0) {
    tasks = column.tasksId;

    Object.keys(tasks).forEach((taskId) => {
      tasks[taskId] = listTasks[taskId];
    });
    tasks = sortByAcs(tasks);
  }

  return tasks;
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
