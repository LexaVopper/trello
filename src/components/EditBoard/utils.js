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
export const createNewListOfTasks = (listOfColomnTasks, listTasks) => {
  const newTasksList = {};
  const reduxTasksList = {};
  listOfColomnTasks.forEach((oneTask, index) => {
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
