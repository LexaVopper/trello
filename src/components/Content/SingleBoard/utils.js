/* eslint-disable no-unused-vars */
import * as _ from 'lodash';

export const sortByAcs = (list) => {
  return _.orderBy(list, ['position'], ['asc']);
};

export const getTasksAndSort = (columnId, columnTasks, tasksList, page) => {
  let tasks = {};
  const tasksKeys = Object.keys(columnTasks);

  tasksKeys.forEach((key) => {
    tasks = {
      ...page.columns[columnId],
      tasksId: {
        ...tasks?.tasksId,
        [tasksList[key].id]: {
          id: tasksList[key].id,
          position: tasksList[key].position,
        },
      },
    };
  });
  return tasks;
};

export const getEachColomn = (page) => {
  const columnOrder = {};
  const colomnTasks = {};
  const { columns } = page;
  const { task } = page;

  if (columns) {
    Object.values(columns).forEach((column) => {
      const a = column;

      if (column.tasksId) {
        colomnTasks[column.id] = getTasksAndSort(
          column.id,
          column.tasksId,
          task,
          page
        );
      }
      let pos = {};
      pos = { position: a.position, id: a.id };

      columnOrder[a.id] = pos;
    });
  }

  return { columnOrder, colomnTasks };
};
