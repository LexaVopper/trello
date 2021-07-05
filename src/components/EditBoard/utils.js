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
